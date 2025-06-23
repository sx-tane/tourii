import type { QuestResponseDto } from "@/api/generated";
import { Award, Clock, Edit, Trash2 } from "lucide-react";

type TaskData = NonNullable<QuestResponseDto["tasks"]>[0];

interface QuestTaskTableProps {
	tasks: TaskData[];
	selectedTasks?: string[];
	deletingTaskId: string | null;
	isSubmitting?: boolean;
	onToggleSelection?: (taskId: string) => void;
	onToggleSelectAll?: () => void;
	onEdit: (task: TaskData) => void;
	onDelete: (taskId: string, taskName: string) => void;
	getThemeColor: (theme: string) => string;
	getTaskTypeColor: (type: string) => string;
}

function getTaskTypeIcon(taskType: string): string {
	switch (taskType) {
		case "VISIT_LOCATION":
			return "📍";
		case "PHOTO_UPLOAD":
			return "📷";
		case "ANSWER_TEXT":
			return "📝";
		case "SELECT_OPTION":
			return "☑️";
		case "GROUP_ACTIVITY":
			return "👥";
		case "SHARE_SOCIAL":
			return "📤";
		case "QR_SCAN":
			return "📱";
		case "LOCAL_INTERACTION":
			return "🤝";
		default:
			return "📋";
	}
}

function getTaskTypeColor(taskType: string): string {
	switch (taskType) {
		case "VISIT_LOCATION":
			return "bg-blue-100 text-blue-800";
		case "PHOTO_UPLOAD":
			return "bg-green-100 text-green-800";
		case "ANSWER_TEXT":
			return "bg-purple-100 text-purple-800";
		case "SELECT_OPTION":
			return "bg-orange-100 text-orange-800";
		case "GROUP_ACTIVITY":
			return "bg-pink-100 text-pink-800";
		case "SHARE_SOCIAL":
			return "bg-cyan-100 text-cyan-800";
		case "QR_SCAN":
			return "bg-yellow-100 text-yellow-800";
		case "LOCAL_INTERACTION":
			return "bg-indigo-100 text-indigo-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
}

function getTaskThemeIcon(taskTheme: string): string {
	switch (taskTheme) {
		case "FOOD":
			return "🍜";
		case "URBAN_EXPLORE":
			return "🏙️";
		case "STORY":
			return "📖";
		case "LOCAL_CULTURE":
			return "🎭";
		case "NATURE":
			return "🌿";
		case "HISTORICAL":
			return "🏛️";
		case "ADVENTURE":
			return "⛰️";
		default:
			return "🎯";
	}
}

function getTaskThemeColor(taskTheme: string): string {
	switch (taskTheme) {
		case "FOOD":
			return "bg-red-100 text-red-800";
		case "URBAN_EXPLORE":
			return "bg-gray-100 text-gray-800";
		case "STORY":
			return "bg-blue-100 text-blue-800";
		case "LOCAL_CULTURE":
			return "bg-purple-100 text-purple-800";
		case "NATURE":
			return "bg-green-100 text-green-800";
		case "HISTORICAL":
			return "bg-amber-100 text-amber-800";
		case "ADVENTURE":
			return "bg-orange-100 text-orange-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
}

export default function QuestTaskTable({
	tasks,
	selectedTasks = [],
	deletingTaskId,
	isSubmitting = false,
	onToggleSelection,
	onToggleSelectAll,
	onEdit,
	onDelete,
	getThemeColor,
	getTaskTypeColor,
}: QuestTaskTableProps) {
	const isAllSelected = selectedTasks.length === tasks.length && tasks.length > 0;

	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-lg">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-charcoal text-white">
						<tr>
							<th className="px-6 py-4 text-left font-semibold">Task Name</th>
							<th className="px-6 py-4 text-left font-semibold">Description</th>
							<th className="px-6 py-4 text-left font-semibold">Theme</th>
							<th className="px-6 py-4 text-left font-semibold">Type</th>
							<th className="px-6 py-4 text-left font-semibold">Points</th>
							<th className="px-6 py-4 text-left font-semibold">Status</th>
							<th className="px-6 py-4 text-left font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-warmGrey2">
						{tasks.length > 0 ? (
							tasks.map((task, index) => (
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
											{task.taskTheme?.replace(/_/g, " ")}
										</span>
									</td>
									<td className="px-6 py-4">
										<span
											className={`rounded-full px-2 py-1 text-xs font-medium ${getTaskTypeColor(task.taskType)}`}
										>
											{task.taskType?.replace(/_/g, " ")}
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
												onClick={() => onEdit(task)}
												className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3 transition-all"
												title="Edit Task"
												disabled={isSubmitting || deletingTaskId !== null}
											>
												<Edit size={16} />
											</button>
											<button
												type="button"
												onClick={() => onDelete(task.taskId, task.taskName)}
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
							))
						) : (
							<tr>
								<td colSpan={7} className="px-6 py-8 text-center text-charcoal">
									No tasks found. Create your first task to get started.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}