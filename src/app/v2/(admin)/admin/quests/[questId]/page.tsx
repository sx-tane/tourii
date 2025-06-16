"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { makeApiRequest } from "@/utils/api-helpers";
import type { QuestResponseDto, TaskResponseDto } from "@/api/generated";

// Create proper types for task management based on the API schema
type TaskData = NonNullable<QuestResponseDto["tasks"]>[0];
type TaskCreateRequestDto = {
	questId: string;
	taskTheme: TaskData["taskTheme"];
	taskType: TaskData["taskType"];
	taskName: string;
	taskDesc: string;
	isUnlocked: boolean;
	requiredAction: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	groupActivityMembers?: Array<any>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	selectOptions?: Array<any>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	antiCheatRules: any;
	magatamaPointAwarded: number;
	delFlag: boolean;
};
import {
	ArrowLeft,
	Edit,
	Plus,
	Clock,
	Award,
	Users,
	Target,
	Trash2,
	Search,
	X,
	BarChart3,
} from "lucide-react";
import { Task } from "vitest";
import { useQuestById } from "@/hooks/api";

interface Props {
	params: Promise<{ questId: string }>;
}

export default function QuestTaskManagement({ params }: Props) {
	const router = useRouter();
	const [questId, setQuestId] = useState<string>("");
	const [isParamsLoaded, setIsParamsLoaded] = useState(false);

	// Initialize params
	useEffect(() => {
		params.then((p) => {
			setQuestId(p.questId);
			setIsParamsLoaded(true);
		});
	}, [params]);

	// Helper functions for styling
	const getThemeColor = (theme: string) => {
		switch (theme) {
			case "STORY":
				return "bg-blue-100 text-blue-800";
			case "LOCAL_CULTURE":
				return "bg-green-100 text-green-800";
			case "FOOD":
				return "bg-orange-100 text-orange-800";
			case "URBAN_EXPLORE":
				return "bg-purple-100 text-purple-800";
			case "NATURE":
				return "bg-emerald-100 text-emerald-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getTaskTypeColor = (type: string) => {
		switch (type) {
			case "VISIT_LOCATION":
				return "bg-blue-100 text-blue-800";
			case "PHOTO_UPLOAD":
				return "bg-green-100 text-green-800";
			case "ANSWER_TEXT":
				return "bg-yellow-100 text-yellow-800";
			case "SELECT_OPTION":
				return "bg-purple-100 text-purple-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const { quest, isLoading, mutate } = useQuestById(questId);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingTask, setEditingTask] = useState<TaskData | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

	// Search and filtering states
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

	const [form, setForm] = useState<TaskCreateRequestDto>({
		questId: "",
		taskTheme: "STORY",
		taskType: "VISIT_LOCATION",
		taskName: "",
		taskDesc: "",
		isUnlocked: true,
		requiredAction: "",
		antiCheatRules: {},
		magatamaPointAwarded: 0,
		delFlag: false,
	});

	// Quick filters configuration
	const quickFilters = [
		{ id: "completed", label: "Completed", icon: "✅" },
		{ id: "incomplete", label: "Incomplete", icon: "⏳" },
		{ id: "no-content", label: "No Content", icon: "📝" },
		{ id: "no-description", label: "No Description", icon: "❓" },
		{ id: "long-name", label: "Long Names", icon: "📏" },
		{ id: "short-name", label: "Short Names", icon: "📐" },
	];

	// Filtered and searched tasks
	const filteredTasks = useMemo(() => {
		if (!quest?.tasks) return [];

		let filtered = [...quest.tasks];

		// Apply search query
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(task) =>
					task.taskName?.toLowerCase().includes(query) ||
					task.taskDesc?.toLowerCase().includes(query) ||
					task.requiredAction?.toLowerCase().includes(query),
			);
		}

		// Apply quick filters
		if (activeFilters.length > 0) {
			filtered = filtered.filter((task) => {
				return activeFilters.every((filter) => {
					switch (filter) {
						case "completed":
							return task.isUnlocked === true;
						case "incomplete":
							return task.isUnlocked === false;
						case "no-content":
							return !task.requiredAction;
						case "no-description":
							return !task.taskDesc;
						case "long-name":
							return task.taskName && task.taskName.length > 50;
						case "short-name":
							return task.taskName && task.taskName.length <= 10;
						default:
							return true;
					}
				});
			});
		}

		return filtered;
	}, [quest?.tasks, searchQuery, activeFilters]);

	// Summary statistics
	const stats = useMemo(() => {
		if (!quest?.tasks)
			return {
				total: 0,
				completed: 0,
				incomplete: 0,
				withContent: 0,
				noDescription: 0,
				noContent: 0,
			};

		const tasks = quest.tasks;

		return {
			total: tasks.length,
			completed: tasks.filter((t) => t.isUnlocked).length,
			incomplete: tasks.filter((t) => !t.isUnlocked).length,
			withContent: tasks.filter((t) => t.requiredAction).length,
			noDescription: tasks.filter((t) => !t.taskDesc).length,
			noContent: tasks.filter((t) => !t.requiredAction).length,
		};
	}, [quest?.tasks]);

	const resetForm = useCallback(() => {
		setForm({
			questId: questId,
			taskTheme: "STORY",
			taskType: "VISIT_LOCATION",
			taskName: "",
			taskDesc: "",
			isUnlocked: true,
			requiredAction: "",
			antiCheatRules: {},
			magatamaPointAwarded: 0,
			delFlag: false,
		});
		setEditingTask(null);
	}, [questId]);

	const handleCreate = async () => {
		if (!form.taskName.trim()) {
			alert("Please fill in required field: Task Name");
			return;
		}

		setIsSubmitting(true);
		try {
			await makeApiRequest(`/api/quests/create-task/${questId}`, {
				...form,
				questId,
			});
			resetForm();
			setShowCreateModal(false);
			await mutate();
		} catch (error) {
			console.error("Failed to create task:", error);
			alert("Failed to create task. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleUpdate = async () => {
		if (!editingTask || !form.taskName.trim()) {
			alert("Please fill in required field: Task Name");
			return;
		}

		setIsSubmitting(true);
		try {
			const updateData = {
				...form,
				taskId: editingTask.taskId,
				updUserId: "admin",
			};
			await makeApiRequest("/api/quests/update-task", updateData, "POST");
			resetForm();
			setShowCreateModal(false);
			await mutate();
		} catch (error) {
			console.error("Failed to update task:", error);
			alert("Failed to update task. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEdit = (task: TaskData) => {
		setEditingTask(task);
		setForm({
			questId: task.taskId || questId,
			taskTheme: task.taskTheme || "STORY",
			taskType: task.taskType || "VISIT_LOCATION",
			taskName: task.taskName || "",
			taskDesc: task.taskDesc || "",
			isUnlocked: task.isUnlocked || true,
			requiredAction: task.requiredAction || "",
			antiCheatRules: task.antiCheatRules || {},
			magatamaPointAwarded: task.magatamaPointAwarded || 0,
			delFlag: false,
		});
		setShowCreateModal(true);
	};

	const openCreateModal = () => {
		resetForm();
		setShowCreateModal(true);
	};

	const handleDelete = async (taskId: string, taskName: string) => {
		if (
			!confirm(
				`Are you sure you want to delete the task "${taskName}"? This action cannot be undone.`,
			)
		) {
			return;
		}

		setDeletingTaskId(taskId);
		try {
			await makeApiRequest(`/api/quests/delete-task/${taskId}`, {}, "DELETE");
			await mutate();
		} catch (error) {
			console.error("Failed to delete task:", error);
			alert(
				`Failed to delete task: ${error instanceof Error ? error.message : String(error)}`,
			);
		} finally {
			setDeletingTaskId(null);
		}
	};

	// Filter functions
	const toggleFilter = (filterId: string) => {
		setActiveFilters((prev) =>
			prev.includes(filterId)
				? prev.filter((f) => f !== filterId)
				: [...prev, filterId],
		);
	};

	const clearAllFilters = () => {
		setActiveFilters([]);
		setSearchQuery("");
	};

	// Bulk operations
	const toggleTaskSelection = (taskId: string) => {
		setSelectedTasks((prev) =>
			prev.includes(taskId)
				? prev.filter((id) => id !== taskId)
				: [...prev, taskId],
		);
	};

	const toggleSelectAll = () => {
		if (selectedTasks.length === filteredTasks.length) {
			setSelectedTasks([]);
		} else {
			setSelectedTasks(filteredTasks.map((t) => t.taskId));
		}
	};

	const handleBulkDelete = async () => {
		if (
			!confirm(
				`Are you sure you want to delete ${selectedTasks.length} selected tasks? This action cannot be undone.`,
			)
		) {
			return;
		}

		try {
			await Promise.all(
				selectedTasks.map((taskId) =>
					makeApiRequest(`/api/quests/delete-task/${taskId}`, {}, "DELETE"),
				),
			);
			setSelectedTasks([]);
			await mutate();
		} catch (error) {
			console.error("Failed to delete tasks:", error);
			alert("Failed to delete some tasks. Please try again.");
		}
	};

	if (!isParamsLoaded || isLoading) {
		return (
			<div className="min-h-screen bg-warmGrey p-6">
				<div className="mx-auto max-w-7xl">
					<div className="text-center text-charcoal">
						Loading quest tasks...
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-warmGrey p-6">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={() => router.back()}
							className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
						>
							<ArrowLeft size={20} />
						</button>
						<div>
							<h1 className="text-3xl font-bold text-charcoal">
								Quest Task Management
							</h1>
							<p className="text-warmGrey3 mt-1">
								Managing tasks for:{" "}
								<span className="font-medium text-charcoal">
									{quest?.questName}
								</span>
							</p>
						</div>
					</div>
					<button
						type="button"
						onClick={openCreateModal}
						className="flex items-center gap-2 rounded-lg bg-red px-4 py-2 text-white hover:bg-opacity-90 transition-all"
					>
						<Plus size={18} />
						Add Task
					</button>
				</div>

				{/* Summary Statistics Cards */}
				<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<BarChart3 size={16} className="text-blue-600" />
							<span className="text-sm font-medium text-warmGrey3">
								Total Tasks
							</span>
						</div>
						<div className="text-2xl font-bold text-charcoal">
							{stats.total}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">✅</span>
							<span className="text-sm font-medium text-warmGrey3">
								Completed
							</span>
						</div>
						<div className="text-2xl font-bold text-green-600">
							{stats.completed}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">⏳</span>
							<span className="text-sm font-medium text-warmGrey3">
								Incomplete
							</span>
						</div>
						<div className="text-2xl font-bold text-red-600">
							{stats.incomplete}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">📝</span>
							<span className="text-sm font-medium text-warmGrey3">
								w/ Content
							</span>
						</div>
						<div className="text-2xl font-bold text-purple-600">
							{stats.withContent}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">❓</span>
							<span className="text-sm font-medium text-warmGrey3">
								No Desc
							</span>
						</div>
						<div className="text-2xl font-bold text-orange-600">
							{stats.noDescription}
						</div>
					</div>
					<div className="rounded-lg bg-white p-4 shadow">
						<div className="flex items-center gap-2">
							<span className="text-sm">⚠️</span>
							<span className="text-sm font-medium text-warmGrey3">
								No Content
							</span>
						</div>
						<div className="text-2xl font-bold text-red-600">
							{stats.noContent}
						</div>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="mb-6 space-y-4">
					{/* Search Bar */}
					<div className="flex items-center gap-4">
						<div className="relative flex-1">
							<Search
								size={20}
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warmGrey3"
							/>
							<input
								type="text"
								placeholder="Search tasks by name, description, or content..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 py-2 rounded-lg border border-warmGrey2 focus:border-red focus:outline-none"
							/>
						</div>
						{(searchQuery || activeFilters.length > 0) && (
							<button
								type="button"
								onClick={clearAllFilters}
								className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
							>
								<X size={16} />
								Clear All
							</button>
						)}
					</div>

					{/* Quick Filters */}
					<div className="flex flex-wrap gap-2">
						{quickFilters.map((filter) => (
							<button
								type="button"
								key={filter.id}
								onClick={() => toggleFilter(filter.id)}
								className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all ${
									activeFilters.includes(filter.id)
										? "bg-red text-white"
										: "bg-white text-charcoal hover:bg-warmGrey2"
								}`}
							>
								<span>{filter.icon}</span>
								{filter.label}
							</button>
						))}
					</div>

					{/* Active Filters Display */}
					{activeFilters.length > 0 && (
						<div className="text-sm text-warmGrey3">
							Showing {filteredTasks.length} of {stats.total} tasks
						</div>
					)}
				</div>

				{/* Bulk Actions Bar */}
				{selectedTasks.length > 0 && (
					<div className="mb-4 flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
						<div className="flex items-center gap-4">
							<span className="text-sm font-medium text-blue-800">
								{selectedTasks.length} tasks selected
							</span>
						</div>
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={handleBulkDelete}
								className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
							>
								<Trash2 size={16} />
								Delete Selected
							</button>
							<button
								type="button"
								onClick={() => setSelectedTasks([])}
								className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-warmGrey2 text-charcoal hover:bg-warmGrey3"
							>
								<X size={16} />
								Cancel
							</button>
						</div>
					</div>
				)}

				{/* Quest Info Card */}
				<div className="mb-6 rounded-lg bg-white p-6 shadow-lg">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
						<div>
							<h3 className="text-sm font-medium text-warmGrey3">Quest Name</h3>
							<p className="text-lg font-semibold text-charcoal">
								{quest?.questName}
							</p>
						</div>
						<div>
							<h3 className="text-sm font-medium text-warmGrey3">
								Total Tasks
							</h3>
							<p className="text-lg font-semibold text-charcoal">
								{quest?.tasks?.length || 0}
							</p>
						</div>
						<div>
							<h3 className="text-sm font-medium text-warmGrey3">
								Total Points
							</h3>
							<p className="text-lg font-semibold text-charcoal">
								{quest?.tasks?.reduce(
									(acc, task) => acc + task.magatamaPointAwarded,
									0,
								) || 0}
							</p>
						</div>
						<div>
							<h3 className="text-sm font-medium text-warmGrey3">
								Tourist Spot
							</h3>
							<p className="text-lg font-semibold text-charcoal">
								{quest?.touristSpot?.touristSpotName || "Not assigned"}
							</p>
						</div>
					</div>
				</div>

				{/* Tasks Table */}
				<div className="overflow-hidden rounded-lg bg-white shadow-lg">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-charcoal text-white">
								<tr>
									<th className="px-6 py-4 text-left font-semibold">
										Task Name
									</th>
									<th className="px-6 py-4 text-left font-semibold">
										Description
									</th>
									<th className="px-6 py-4 text-left font-semibold">Theme</th>
									<th className="px-6 py-4 text-left font-semibold">Type</th>
									<th className="px-6 py-4 text-left font-semibold">Points</th>
									<th className="px-6 py-4 text-left font-semibold">Status</th>
									<th className="px-6 py-4 text-left font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-warmGrey2">
								{filteredTasks.map((task, index) => (
									<tr
										key={task.taskId}
										className={index % 2 === 0 ? "bg-white" : "bg-warmGrey"}
									>
										<td className="px-6 py-4">
											<div className="font-semibold text-charcoal">
												{task.taskName}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="max-w-xs truncate text-sm text-charcoal">
												{task.taskDesc || "No description"}
											</div>
										</td>
										<td className="px-6 py-4">
											<span
												className={`rounded-full px-2 py-1 text-xs font-medium ${getThemeColor(task.taskTheme)}`}
											>
												{task.taskTheme.replace(/_/g, " ")}
											</span>
										</td>
										<td className="px-6 py-4">
											<span
												className={`rounded-full px-2 py-1 text-xs font-medium ${getTaskTypeColor(task.taskType)}`}
											>
												{task.taskType.replace(/_/g, " ")}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-1 text-sm text-charcoal">
												<Award size={14} />
												<span className="font-medium">
													{task.magatamaPointAwarded || 0}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												{!task.isUnlocked ? (
													<span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
														🔒 Locked
													</span>
												) : (
													<span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
														<Clock size={10} />
														Available
													</span>
												)}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<button
													type="button"
													onClick={() => handleEdit(task)}
													className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
													title="Edit Task"
													disabled={isSubmitting || deletingTaskId !== null}
												>
													<Edit size={16} />
												</button>
												<button
													type="button"
													onClick={() =>
														handleDelete(task.taskId, task.taskName)
													}
													className={`rounded-lg p-2 transition-all ${
														deletingTaskId === task.taskId
															? "bg-red-200 text-red-600 cursor-not-allowed"
															: "bg-red-100 text-red-700 hover:bg-red-200"
													}`}
													title="Delete Task"
													disabled={deletingTaskId !== null}
												>
													<Trash2 size={16} />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Create/Edit Modal */}
				{showCreateModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
						<div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
							<div className="mb-6 flex items-center justify-between">
								<h2 className="text-2xl font-bold text-charcoal">
									{editingTask ? "Edit Task" : "Add New Task"}
								</h2>
								<button
									type="button"
									onClick={() => setShowCreateModal(false)}
									className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3"
								>
									✕
								</button>
							</div>

							{/* Show comprehensive data when editing */}
							{editingTask && (
								<div className="mb-6 rounded-lg bg-gray-50 p-4">
									<h3 className="text-lg font-semibold text-charcoal mb-4">
										📊 Complete Task Data
									</h3>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🆔 Identifiers & Status
											</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Task ID:</span>{" "}
													{editingTask.taskId}
												</div>
												<div>
													<span className="font-medium">Quest ID:</span>{" "}
													{editingTask.taskId}
												</div>
												<div>
													<span className="font-medium">Theme:</span>{" "}
													<span
														className={`px-2 py-1 rounded-full text-xs ${
															editingTask.taskTheme === "STORY"
																? "bg-blue-100 text-blue-800"
																: editingTask.taskTheme === "LOCAL_CULTURE"
																	? "bg-green-100 text-green-800"
																	: editingTask.taskTheme === "FOOD"
																		? "bg-orange-100 text-orange-800"
																		: editingTask.taskTheme === "URBAN_EXPLORE"
																			? "bg-purple-100 text-purple-800"
																			: editingTask.taskTheme === "NATURE"
																				? "bg-emerald-100 text-emerald-800"
																				: "bg-gray-100 text-gray-800"
														}`}
													>
														{editingTask.taskTheme}
													</span>
												</div>
												<div>
													<span className="font-medium">Type:</span>{" "}
													<span
														className={`px-2 py-1 rounded-full text-xs ${
															editingTask.taskType === "VISIT_LOCATION"
																? "bg-blue-100 text-blue-800"
																: editingTask.taskType === "PHOTO_UPLOAD"
																	? "bg-green-100 text-green-800"
																	: editingTask.taskType === "ANSWER_TEXT"
																		? "bg-yellow-100 text-yellow-800"
																		: editingTask.taskType === "SELECT_OPTION"
																			? "bg-purple-100 text-purple-800"
																			: "bg-gray-100 text-gray-800"
														}`}
													>
														{editingTask.taskType}
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="font-medium">Status:</span>
													{editingTask.isUnlocked ? (
														<span className="flex items-center gap-1 text-green-600">
															🔓 Unlocked
														</span>
													) : (
														<span className="flex items-center gap-1 text-red-600">
															🔒 Locked
														</span>
													)}
												</div>
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🎯 Actions & Rewards
											</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Required Action:</span>
													<div className="max-h-20 overflow-y-auto text-xs mt-1 p-2 bg-white rounded">
														{editingTask.requiredAction ||
															"No action specified"}
													</div>
												</div>
												<div>
													<span className="font-medium">Points:</span>{" "}
													<span className="font-bold text-green-600">
														{editingTask.magatamaPointAwarded || 0}
													</span>
												</div>
												<div>
													<span className="font-medium">Total Points:</span>{" "}
													<span className="font-bold text-blue-600">
														{editingTask.magatamaPointAwarded || 0}
													</span>
												</div>
												{editingTask.selectOptions &&
													editingTask.selectOptions.length > 0 && (
														<div>
															<span className="font-medium">
																Select Options:
															</span>{" "}
															<span className="text-xs text-purple-600">
																{editingTask.selectOptions.length} options
															</span>
														</div>
													)}
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												📅 Timestamps & Users
											</h4>
											<div className="text-sm space-y-1">
												{editingTask.insDateTime && (
													<div>
														<span className="font-medium">Created:</span>{" "}
														{editingTask.insDateTime &&
														!Number.isNaN(Date.parse(editingTask.insDateTime))
															? new Date(
																	editingTask.insDateTime,
																).toLocaleString()
															: editingTask.insDateTime || "N/A"}
													</div>
												)}
												{editingTask.updDateTime && (
													<div>
														<span className="font-medium">Updated:</span>{" "}
														{editingTask.updDateTime &&
														!Number.isNaN(Date.parse(editingTask.updDateTime))
															? new Date(
																	editingTask.updDateTime,
																).toLocaleString()
															: editingTask.updDateTime || "N/A"}
													</div>
												)}
												{editingTask.insUserId && (
													<div>
														<span className="font-medium">Created By:</span>{" "}
														{editingTask.insUserId}
													</div>
												)}
												{editingTask.updUserId && (
													<div>
														<span className="font-medium">Updated By:</span>{" "}
														{editingTask.updUserId}
													</div>
												)}
											</div>
										</div>
									</div>

									{/* Anti-Cheat Rules */}
									{editingTask.antiCheatRules && (
										<div className="mt-4 space-y-2">
											<h4 className="font-medium text-charcoal">
												🔒 Anti-Cheat Rules
											</h4>
											<div className="text-sm">
												<pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-20">
													{JSON.stringify(editingTask.antiCheatRules, null, 2)}
												</pre>
											</div>
										</div>
									)}

									{/* Group Activity Members */}
									{editingTask.groupActivityMembers &&
										editingTask.groupActivityMembers.length > 0 && (
											<div className="mt-4">
												<h4 className="font-medium text-charcoal mb-2">
													👥 Group Activity Members (
													{editingTask.groupActivityMembers.length})
												</h4>
												<div className="max-h-32 overflow-y-auto space-y-1">
													{editingTask.groupActivityMembers.map(
														(member, idx) => (
															<div
																key={`task-member-${editingTask.taskId}-${idx}`}
																className="bg-white p-2 rounded border text-xs"
															>
																Member {idx + 1}: {JSON.stringify(member)}
															</div>
														),
													)}
												</div>
											</div>
										)}

									{/* Raw JSON Data */}
									<details className="mt-4">
										<summary className="font-medium text-purple-600 cursor-pointer">
											🔍 Raw JSON Data
										</summary>
										<pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60 border">
											{JSON.stringify(editingTask, null, 2)}
										</pre>
									</details>
								</div>
							)}

							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								{/* Basic Information */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-charcoal">
										Basic Information
									</h3>

									<div>
										<label
											htmlFor="taskName"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Task Name *
										</label>
										<input
											id="taskName"
											type="text"
											value={form.taskName}
											onChange={(e) =>
												setForm({ ...form, taskName: e.target.value })
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter task name"
										/>
									</div>

									<div>
										<label
											htmlFor="taskDesc"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Description *
										</label>
										<textarea
											id="taskDesc"
											value={form.taskDesc}
											onChange={(e) =>
												setForm({ ...form, taskDesc: e.target.value })
											}
											rows={4}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter task description"
										/>
									</div>

									<div>
										<label
											htmlFor="requiredAction"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Required Action *
										</label>
										<textarea
											id="requiredAction"
											value={form.requiredAction}
											onChange={(e) =>
												setForm({ ...form, requiredAction: e.target.value })
											}
											rows={4}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter required action"
										/>
									</div>
								</div>

								{/* Task Settings */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-charcoal">
										Task Settings
									</h3>

									<div>
										<label
											htmlFor="taskTheme"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Task Theme *
										</label>
										<select
											id="taskTheme"
											value={form.taskTheme}
											onChange={(e) =>
												setForm({
													...form,
													taskTheme: e.target
														.value as TaskCreateRequestDto["taskTheme"],
												})
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
										>
											<option value="STORY">Story</option>
											<option value="LOCAL_CULTURE">Local Culture</option>
											<option value="FOOD">Food</option>
											<option value="URBAN_EXPLORE">Urban Explore</option>
											<option value="NATURE">Nature</option>
										</select>
									</div>

									<div>
										<label
											htmlFor="taskType"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Task Type *
										</label>
										<select
											id="taskType"
											value={form.taskType}
											onChange={(e) =>
												setForm({
													...form,
													taskType: e.target
														.value as TaskCreateRequestDto["taskType"],
												})
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
										>
											<option value="VISIT_LOCATION">Visit Location</option>
											<option value="PHOTO_UPLOAD">Photo Upload</option>
											<option value="ANSWER_TEXT">Answer Text</option>
											<option value="SELECT_OPTION">Select Option</option>
											<option value="SHARE_SOCIAL">Share Social</option>
											<option value="CHECK_IN">Check In</option>
											<option value="GROUP_ACTIVITY">Group Activity</option>
											<option value="LOCAL_INTERACTION">
												Local Interaction
											</option>
										</select>
									</div>

									<div>
										<label
											htmlFor="magatamaPoints"
											className="block text-sm font-medium text-charcoal mb-2"
										>
											Magatama Points Awarded
										</label>
										<input
											id="magatamaPoints"
											type="number"
											value={form.magatamaPointAwarded}
											onChange={(e) =>
												setForm({
													...form,
													magatamaPointAwarded:
														Number.parseInt(e.target.value) || 0,
												})
											}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Enter points awarded"
											min="0"
										/>
									</div>

									<div className="space-y-3">
										<h4 className="text-md font-semibold text-charcoal">
											Task Status
										</h4>
										<label className="flex items-center gap-2">
											<input
												type="checkbox"
												checked={form.isUnlocked}
												onChange={(e) =>
													setForm({
														...form,
														isUnlocked: e.target.checked,
													})
												}
												className="rounded border-warmGrey2 text-red focus:ring-red"
											/>
											<span className="text-sm font-medium text-charcoal">
												Is Unlocked
											</span>
										</label>
									</div>
								</div>
							</div>

							{/* Show comprehensive data when editing */}
							{editingTask && (
								<div className="mb-6 rounded-lg bg-gray-50 p-4">
									<h3 className="text-lg font-semibold text-charcoal mb-4">
										📊 Complete Task Data
									</h3>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🆔 Identifiers
											</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Task ID:</span>{" "}
													{editingTask.taskId}
												</div>
												<div>
													<span className="font-medium">Quest ID:</span>{" "}
													{editingTask.taskId || "N/A"}
												</div>
												<div>
													<span className="font-medium">Task Theme:</span>{" "}
													{editingTask.taskTheme}
												</div>
												<div>
													<span className="font-medium">Task Type:</span>{" "}
													{editingTask.taskType}
												</div>
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												🎯 Task Details
											</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Points Awarded:</span>{" "}
													{editingTask.magatamaPointAwarded || 0}
												</div>
												<div>
													<span className="font-medium">Completed:</span>{" "}
													{editingTask.isUnlocked ? "✅ Yes" : "❌ No"}
												</div>
												<div>
													<span className="font-medium">Task Content:</span>
													<div className="truncate text-green-600">
														{editingTask.requiredAction || "N/A"}
													</div>
												</div>
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">
												📋 Task Content
											</h4>
											<div className="text-sm space-y-1">
												<div>
													<span className="font-medium">Name:</span>{" "}
													{editingTask.taskName}
												</div>
												<div>
													<span className="font-medium">Description:</span>
													<div className="truncate text-green-600">
														{editingTask.taskDesc || "N/A"}
													</div>
												</div>
											</div>
										</div>
										<div className="space-y-2">
											<h4 className="font-medium text-charcoal">📅 Metadata</h4>
											<div className="text-sm space-y-1">
												{editingTask.insDateTime && (
													<div>
														<span className="font-medium">Created:</span>{" "}
														{editingTask.insDateTime &&
														!Number.isNaN(Date.parse(editingTask.insDateTime))
															? new Date(
																	editingTask.insDateTime,
																).toLocaleString()
															: editingTask.insDateTime || "N/A"}
													</div>
												)}
												{editingTask.updDateTime && (
													<div>
														<span className="font-medium">Updated:</span>{" "}
														{editingTask.updDateTime &&
														!Number.isNaN(Date.parse(editingTask.updDateTime))
															? new Date(
																	editingTask.updDateTime,
																).toLocaleString()
															: editingTask.updDateTime || "N/A"}
													</div>
												)}
												{editingTask.insUserId && (
													<div>
														<span className="font-medium">Created By:</span>{" "}
														{editingTask.insUserId}
													</div>
												)}
												{editingTask.updUserId && (
													<div>
														<span className="font-medium">Updated By:</span>{" "}
														{editingTask.updUserId}
													</div>
												)}
											</div>
										</div>
									</div>
									{/* Raw JSON Data */}
									<details className="mt-4">
										<summary className="font-medium text-purple-600 cursor-pointer">
											🔍 Raw JSON Data
										</summary>
										<pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60 border">
											{JSON.stringify(editingTask, null, 2)}
										</pre>
									</details>
								</div>
							)}

							{/* Action Buttons */}
							<div className="mt-8 flex justify-end gap-4">
								<button
									type="button"
									onClick={() => setShowCreateModal(false)}
									className="rounded-lg border border-warmGrey2 px-6 py-2 text-charcoal hover:bg-warmGrey2"
									disabled={isSubmitting}
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={editingTask ? handleUpdate : handleCreate}
									disabled={isSubmitting}
									className="rounded-lg bg-red px-6 py-2 text-white hover:bg-opacity-90 disabled:opacity-50"
								>
									{isSubmitting
										? "Saving..."
										: editingTask
											? "Update Task"
											: "Add Task"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
