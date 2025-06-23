import type { QuestResponseDto } from "@/api/generated";

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

interface QuestTaskCreateEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	editingTask: TaskData | null;
	form: TaskCreateRequestDto;
	onFormChange: (updates: Partial<TaskCreateRequestDto>) => void;
	onSubmit: () => void;
	isSubmitting: boolean;
	getThemeColor: (theme: string) => string;
	getTaskTypeColor: (type: string) => string;
	taskNameId: string;
	taskDescId: string;
	requiredActionId: string;
	taskThemeId: string;
	taskTypeId: string;
	magatamaPointsId: string;
	questId: string;
}

export default function QuestTaskCreateEditModal({
	isOpen,
	onClose,
	editingTask,
	form,
	onFormChange,
	onSubmit,
	isSubmitting,
	getThemeColor,
	getTaskTypeColor,
	taskNameId,
	taskDescId,
	requiredActionId,
	taskThemeId,
	taskTypeId,
	magatamaPointsId,
	questId,
}: QuestTaskCreateEditModalProps) {

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-charcoal">
						{editingTask ? "Edit Task" : "Create New Task"}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg bg-warmGrey2 p-2 text-charcoal hover:bg-warmGrey3"
					>
						✕
					</button>
				</div>

				{editingTask && (
					<div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-4">
						<h3 className="font-medium text-blue-800 mb-2">
							Editing: {editingTask.taskName}
						</h3>
						<div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
							<div>
								<span className="font-medium">Theme:</span>{" "}
								<span className={`inline-block px-2 py-1 rounded-full text-xs ${getThemeColor(editingTask.taskTheme || "")}`}>
									{editingTask.taskTheme}
								</span>
							</div>
							<div>
								<span className="font-medium">Type:</span>{" "}
								<span className={`inline-block px-2 py-1 rounded-full text-xs ${getTaskTypeColor(editingTask.taskType || "")}`}>
									{editingTask.taskType}
								</span>
							</div>
							<div>
								<span className="font-medium">Points:</span> {editingTask.magatamaPointAwarded}
							</div>
							<div>
								<span className="font-medium">Status:</span>{" "}
								{editingTask.isUnlocked ? "Unlocked" : "Locked"}
							</div>
						</div>
					</div>
				)}

				<div className="space-y-4">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label
								htmlFor={taskNameId}
								className="block text-sm font-medium text-charcoal mb-1"
							>
								Task Name *
							</label>
							<input
								id={taskNameId}
								type="text"
								value={form.taskName}
								onChange={(e) =>
									onFormChange({ taskName: e.target.value })
								}
								className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
								placeholder="Enter task name"
							/>
						</div>
						<div>
							<label
								htmlFor={taskTypeId}
								className="block text-sm font-medium text-charcoal mb-1"
							>
								Task Type
							</label>
							<select
								id={taskTypeId}
								value={form.taskType}
								onChange={(e) =>
									onFormChange({
										taskType: e.target.value as TaskCreateRequestDto["taskType"],
									})
								}
								className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
							>
								<option value="VISIT_LOCATION">Visit Location</option>
								<option value="PHOTO_UPLOAD">Photo Upload</option>
								<option value="ANSWER_TEXT">Answer Text</option>
								<option value="SELECT_OPTION">Select Option</option>
								<option value="LOCAL_INTERACTION">Local Interaction</option>
								<option value="SHARE_SOCIAL">Share Social</option>
								<option value="QR_SCAN">QR Scan</option>
								<option value="GROUP_ACTIVITY">Group Activity</option>
							</select>
						</div>
					</div>

					<div>
						<label
							htmlFor={taskDescId}
							className="block text-sm font-medium text-charcoal mb-1"
						>
							Task Description *
						</label>
						<textarea
							id={taskDescId}
							value={form.taskDesc}
							onChange={(e) =>
								onFormChange({ taskDesc: e.target.value })
							}
							rows={3}
							className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
							placeholder="Enter task description"
						/>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label
								htmlFor={taskThemeId}
								className="block text-sm font-medium text-charcoal mb-1"
							>
								Task Theme
							</label>
							<select
								id={taskThemeId}
								value={form.taskTheme}
								onChange={(e) =>
									onFormChange({
										taskTheme: e.target.value as TaskCreateRequestDto["taskTheme"],
									})
								}
								className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
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
								htmlFor={magatamaPointsId}
								className="block text-sm font-medium text-charcoal mb-1"
							>
								Magatama Points
							</label>
							<input
								id={magatamaPointsId}
								type="number"
								min="0"
								value={form.magatamaPointAwarded}
								onChange={(e) =>
									onFormChange({
										magatamaPointAwarded: Number(e.target.value),
									})
								}
								className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor={requiredActionId}
							className="block text-sm font-medium text-charcoal mb-1"
						>
							Required Action
						</label>
						<textarea
							id={requiredActionId}
							value={form.requiredAction}
							onChange={(e) =>
								onFormChange({ requiredAction: e.target.value })
							}
							rows={2}
							className="w-full rounded-lg border border-warmGrey2 px-3 py-2 focus:border-red focus:outline-none"
							placeholder="Enter required action details"
						/>
					</div>

					<div className="flex items-center gap-4 pt-4">
						<button
							type="button"
							onClick={onSubmit}
							disabled={isSubmitting}
							className="flex items-center gap-2 rounded-lg bg-red px-4 py-2 text-white hover:bg-opacity-90 disabled:opacity-50"
						>
							{isSubmitting ? "Saving..." : editingTask ? "Update Task" : "Create Task"}
						</button>
						<button
							type="button"
							onClick={onClose}
							className="rounded-lg bg-warmGrey2 px-4 py-2 text-charcoal hover:bg-warmGrey3"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}