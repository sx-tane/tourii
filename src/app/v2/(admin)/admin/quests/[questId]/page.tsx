/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";
import type { QuestResponseDto } from "@/api/generated";
import {
	QuestInfoDisplay,
	QuestTaskBulkActions,
	QuestTaskCreateEditModal,
	QuestTaskSearchFilters,
	QuestTaskStatsGrid,
	QuestTaskTable,
} from "@/components/admin/quests";
import {
	useCreateQuestTask,
	useDeleteQuestTask,
	useUpdateQuestTask,
} from "@/hooks/admin";
import { useQuestById } from "@/hooks/api";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

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
	groupActivityMembers?: any[];
	selectOptions?: any[];
	antiCheatRules: any;
	magatamaPointAwarded: number;
	delFlag: boolean;
};

interface Props {
	params: Promise<{ questId: string }>;
}

export default function QuestTaskManagement({ params }: Props) {
	const taskNameId = useId();
	const taskDescId = useId();
	const requiredActionId = useId();
	const taskThemeId = useId();
	const taskTypeId = useId();
	const magatamaPointsId = useId();

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
			case "LOCAL_INTERACTION":
				return "bg-indigo-100 text-indigo-800";
			case "SHARE_SOCIAL":
				return "bg-cyan-100 text-cyan-800";
			case "QR_SCAN":
				return "bg-pink-100 text-pink-800";
			case "GROUP_ACTIVITY":
				return "bg-orange-100 text-orange-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const { quest, isLoading, mutate } = useQuestById(questId);

	// Admin Mutation Hooks
	const { trigger: createTask, isMutating: isCreating } = useCreateQuestTask(
		questId,
		() => {
			mutate();
			resetForm();
			setShowCreateModal(false);
		},
	);

	const { trigger: updateTask, isMutating: isUpdating } = useUpdateQuestTask(
		() => {
			mutate();
			resetForm();
			setShowCreateModal(false);
		},
	);

	const { trigger: deleteTask, isMutating: isDeleting } = useDeleteQuestTask(
		() => {
			mutate();
			setDeletingTaskId(null);
		},
	);

	const [showCreateModal, setShowCreateModal] = useState(false);
	const [editingTask, setEditingTask] = useState<TaskData | null>(null);
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

		await createTask(form);
	};

	const handleUpdate = async () => {
		if (!editingTask || !form.taskName.trim()) {
			alert("Please fill in required field: Task Name");
			return;
		}

		const updateData = {
			...form,
			taskId: editingTask.taskId,
			updUserId: "admin",
		};
		await updateTask(updateData);
	};

	const handleEdit = (task: TaskData) => {
		setEditingTask(task);
		setForm({
			questId: questId,
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
		await deleteTask({ taskId });
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
			await Promise.all(selectedTasks.map((taskId) => deleteTask({ taskId })));
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
				<QuestTaskStatsGrid stats={stats} />

				{/* Search and Filters */}
				<QuestTaskSearchFilters
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					activeFilters={activeFilters}
					onToggleFilter={toggleFilter}
					onClearAll={clearAllFilters}
					quickFilters={quickFilters}
					totalTasks={stats.total}
					filteredCount={filteredTasks.length}
				/>

				{/* Bulk Actions Bar */}
				<QuestTaskBulkActions
					selectedCount={selectedTasks.length}
					onBulkDelete={handleBulkDelete}
					onClearSelection={() => setSelectedTasks([])}
				/>

				{/* Quest Info Card */}
				{quest && <QuestInfoDisplay quest={quest} />}

				{/* Tasks Table */}
				<QuestTaskTable
					tasks={filteredTasks}
					selectedTasks={selectedTasks}
					deletingTaskId={deletingTaskId}
					isSubmitting={isCreating || isUpdating || isDeleting}
					onToggleSelection={toggleTaskSelection}
					onToggleSelectAll={toggleSelectAll}
					onEdit={handleEdit}
					onDelete={handleDelete}
					getThemeColor={getThemeColor}
					getTaskTypeColor={getTaskTypeColor}
				/>

				{/* Create/Edit Modal */}
				<QuestTaskCreateEditModal
					isOpen={showCreateModal}
					onClose={() => setShowCreateModal(false)}
					editingTask={editingTask}
					form={form}
					onFormChange={(updates) => setForm({ ...form, ...updates })}
					onSubmit={editingTask ? handleUpdate : handleCreate}
					isSubmitting={isCreating || isUpdating}
					getThemeColor={getThemeColor}
					getTaskTypeColor={getTaskTypeColor}
					taskNameId={taskNameId}
					taskDescId={taskDescId}
					requiredActionId={requiredActionId}
					taskThemeId={taskThemeId}
					taskTypeId={taskTypeId}
					magatamaPointsId={magatamaPointsId}
					questId={questId}
				/>
			</div>
		</div>
	);
}
