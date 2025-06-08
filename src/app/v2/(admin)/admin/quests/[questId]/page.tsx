"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getQuestById } from "@/hooks/quests/getQuestById";
import { makeApiRequest } from "@/utils/api-helpers";
import type { QuestResponseDto } from "@/api/generated";
import {
	ArrowLeft,
	Edit,
	Plus,
	Clock,
	Award,
	Users,
	Target,
	Trash2,
} from "lucide-react";

interface Props {
	params: Promise<{ questId: string }>;
}

interface TaskFormData {
	taskTheme: "STORY" | "LOCAL_CULTURE" | "FOOD" | "URBAN_EXPLORE" | "NATURE";
	taskType:
		| "VISIT_LOCATION"
		| "PHOTO_UPLOAD"
		| "ANSWER_TEXT"
		| "SELECT_OPTION"
		| "SHARE_SOCIAL"
		| "CHECK_IN"
		| "GROUP_ACTIVITY"
		| "LOCAL_INTERACTION";
	taskName: string;
	taskDesc: string;
	isUnlocked: boolean;
	requiredAction: string;
	magatamaPointAwarded: number;
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

	const { quest, isLoadingQuest, mutateQuest } = getQuestById(questId);
	const [showCreateModal, setShowCreateModal] = useState(false);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [editingTask, setEditingTask] = useState<any | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

	const [form, setForm] = useState<TaskFormData>({
		taskTheme: "STORY",
		taskType: "VISIT_LOCATION",
		taskName: "",
		taskDesc: "",
		isUnlocked: true,
		requiredAction: "",
		magatamaPointAwarded: 0,
	});

	const resetForm = useCallback(() => {
		setForm({
			taskTheme: "STORY",
			taskType: "VISIT_LOCATION",
			taskName: "",
			taskDesc: "",
			isUnlocked: true,
			requiredAction: "",
			magatamaPointAwarded: 0,
		});
		setEditingTask(null);
	}, []);

	const handleCreate = async () => {
		if (
			!form.taskName.trim() ||
			!form.taskDesc.trim() ||
			!form.requiredAction.trim()
		) {
			alert(
				"Please fill in required fields: Task Name, Description, and Required Action",
			);
			return;
		}

		setIsSubmitting(true);
		try {
			await makeApiRequest(`/api/quests/create-task/${questId}`, form);
			resetForm();
			setShowCreateModal(false);
			await mutateQuest();
		} catch (error) {
			console.error("Failed to create task:", error);
			alert("Failed to create task. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleUpdate = async () => {
		if (!editingTask || !form.taskName.trim() || !form.taskDesc.trim()) {
			alert("Please fill in required fields");
			return;
		}

		setIsSubmitting(true);
		try {
			const updateData = {
				...form,
				taskId: editingTask.taskId,
			};
			await makeApiRequest("/api/quests/update-task", updateData, "POST");
			resetForm();
			setShowCreateModal(false);
			await mutateQuest();
		} catch (error) {
			console.error("Failed to update task:", error);
			alert("Failed to update task. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleEdit = (task: any) => {
		setEditingTask(task);
		setForm({
			taskTheme: task.taskTheme || "STORY",
			taskType: task.taskType || "VISIT_LOCATION",
			taskName: task.taskName || "",
			taskDesc: task.taskDesc || "",
			isUnlocked: task.isUnlocked || false,
			requiredAction: task.requiredAction || "",
			magatamaPointAwarded: task.magatamaPointAwarded || 0,
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
			await mutateQuest();
		} catch (error) {
			console.error("Failed to delete task:", error);
			alert(
				`Failed to delete task: ${error instanceof Error ? error.message : String(error)}`,
			);
		} finally {
			setDeletingTaskId(null);
		}
	};

	const getThemeColor = (theme: string) => {
		switch (theme) {
			case "STORY":
				return "bg-purple-100 text-purple-800";
			case "LOCAL_CULTURE":
				return "bg-blue-100 text-blue-800";
			case "FOOD":
				return "bg-orange-100 text-orange-800";
			case "URBAN_EXPLORE":
				return "bg-green-100 text-green-800";
			case "NATURE":
				return "bg-emerald-100 text-emerald-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case "VISIT_LOCATION":
				return "bg-blue-100 text-blue-800";
			case "PHOTO_UPLOAD":
				return "bg-pink-100 text-pink-800";
			case "ANSWER_TEXT":
				return "bg-yellow-100 text-yellow-800";
			case "SELECT_OPTION":
				return "bg-indigo-100 text-indigo-800";
			case "SHARE_SOCIAL":
				return "bg-purple-100 text-purple-800";
			case "CHECK_IN":
				return "bg-green-100 text-green-800";
			case "GROUP_ACTIVITY":
				return "bg-orange-100 text-orange-800";
			case "LOCAL_INTERACTION":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	if (!isParamsLoaded || isLoadingQuest) {
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
								Task Management
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
								{quest?.totalMagatamaPointAwarded || 0}
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
								{quest?.tasks?.map((task, index) => (
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
												className={`rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(task.taskType)}`}
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
											{task.isUnlocked ? (
												<span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
													<Target size={10} />
													Unlocked
												</span>
											) : (
												<span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
													<Clock size={10} />
													Locked
												</span>
											)}
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
								)) || (
									<tr>
										<td
											colSpan={7}
											className="px-6 py-8 text-center text-charcoal"
										>
											No tasks found. Add your first task to get started.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Create/Edit Modal */}
				{showCreateModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
						<div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
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
											rows={3}
											className="w-full rounded-lg border border-warmGrey2 px-4 py-2 focus:border-red focus:outline-none"
											placeholder="Describe what action the user needs to take"
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
														.value as TaskFormData["taskTheme"],
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
													taskType: e.target.value as TaskFormData["taskType"],
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
													setForm({ ...form, isUnlocked: e.target.checked })
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
