import type { QuestResponseDto } from "@/api/generated/models/QuestResponseDto";
import type { TaskResponseDto } from "@/api/generated/models/TaskResponseDto";
import { questStorage } from "@/utils/quest-storage";
import Link from "next/link";

// Type alias for tasks within a quest
type QuestTask = NonNullable<QuestResponseDto["tasks"]>[number];

interface QuestOverviewProps {
	quest: QuestResponseDto;
}

const QuestOverview: React.FC<QuestOverviewProps> = ({ quest }) => {
	const handleTaskClick = (task: QuestTask, e: React.MouseEvent) => {
		if (!task.isUnlocked || task.isCompleted) {
			e.preventDefault(); // Prevent navigation for locked/completed tasks
			return;
		}

		// Convert task from quest task type to TaskResponseDto type
		const taskResponseDto: TaskResponseDto = {
			taskId: task.taskId,
			taskType: task.taskType as TaskResponseDto.taskType, // Type assertion needed due to different enum types
			taskName: task.taskName,
			taskDesc: task.taskDesc,
			taskTheme: task.taskTheme as TaskResponseDto.taskTheme, // Type assertion needed due to different enum types
			isUnlocked: task.isUnlocked,
			requiredAction: task.requiredAction,
			groupActivityMembers: task.groupActivityMembers,
			selectOptions: task.selectOptions,
			antiCheatRules: task.antiCheatRules,
			magatamaPointAwarded: task.magatamaPointAwarded,
			rewardEarned: task.rewardEarned,
			isCompleted: task.isCompleted,
			delFlag: task.delFlag,
			insUserId: task.insUserId,
			insDateTime: task.insDateTime,
			updUserId: task.updUserId,
			updDateTime: task.updDateTime,
		};

		// Store quest and task data using utility function
		const success = questStorage.setQuestData(quest, taskResponseDto);

		if (!success) {
			e.preventDefault();
			console.error("Failed to store quest data");
			// Could show an error message to user here
		}
	};

	const getTaskStatusIcon = (task: QuestTask) => {
		if (!task.isUnlocked) {
			return (
				<svg width="20" height="20" fill="none" viewBox="0 0 24 24">
					<title>Locked</title>
					<path
						d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4"
						stroke="#9ca3af"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		}
		if (task.isCompleted) {
			return (
				<svg width="20" height="20" fill="none" viewBox="0 0 24 24">
					<title>Completed</title>
					<circle cx="12" cy="12" r="10" fill="#10b981" />
					<path
						d="M9 12l2 2 4-4"
						stroke="#ffffff"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		}
		return (
			<svg width="20" height="20" fill="none" viewBox="0 0 24 24">
				<title>Available</title>
				<circle cx="12" cy="12" r="10" fill="#3b82f6" />
				<path
					d="M12 6v6l4 2"
					stroke="#ffffff"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	};

	const getTaskStatusText = (task: QuestTask) => {
		if (!task.isUnlocked) return "Locked";
		if (task.isCompleted) return "Completed";
		return "Available";
	};

	const getTaskStatusColor = (task: QuestTask) => {
		if (!task.isUnlocked) return "text-gray-500 bg-gray-100";
		if (task.isCompleted) return "text-green-700 bg-green-100";
		return "text-blue-700 bg-blue-100";
	};

	const completedTasksCount =
		quest.tasks?.filter((task) => task.isCompleted).length || 0;
	const totalTasksCount = quest.tasks?.length || 0;
	const progressPercentage =
		totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

	return (
		<div className="relative min-h-[400px]">
			{/* Background image */}
			<div className="absolute inset-0 h-[340px] w-full overflow-hidden rounded-b-3xl">
				<img
					src={quest.questImage}
					alt={quest.questName}
					className="w-full h-full object-cover object-center opacity-90"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f7f4ee]" />
			</div>
			{/* Main content */}
			<div className="relative z-10 flex flex-col md:flex-row max-w-6xl mx-auto mt-[220px]">
				{/* Left: Quest Info */}
				<div className="bg-white/90 rounded-2xl shadow-lg p-8 flex-1 min-w-0 mr-0 md:mr-8">
					<div className="flex gap-2 mb-2">
						{quest.isUnlocked && (
							<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
								Available
							</span>
						)}
						{quest.isPremium && (
							<span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
								Premium
							</span>
						)}
					</div>
					<h1 className="text-3xl font-bold text-[#1a140a] mb-2">
						{quest.questName}
					</h1>
					<div className="flex items-center text-[#7c6f57] text-sm mb-4 gap-4">
						<span className="flex items-center gap-1">
							<svg
								width="16"
								height="16"
								fill="none"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<title>Location</title>
								<path
									d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
									fill="#7c6f57"
								/>
							</svg>
							{quest.touristSpot?.touristSpotName || "Unknown Location"}
						</span>
						<span className="flex items-center gap-1">
							<svg
								width="16"
								height="16"
								fill="none"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<title>Duration</title>
								<path
									d="M12 8V4m0 0C7.03 4 3 8.03 3 13c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4 0-4.97-4.03-9-9-9z"
									stroke="#7c6f57"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							{totalTasksCount} tasks
						</span>
					</div>
					<p className="text-[#4b3c1a] mb-6 text-base leading-relaxed">
						{quest.questDesc}
					</p>

					{/* Tasks List */}
					<div className="space-y-3">
						<h3 className="text-lg font-semibold text-[#1a140a] mb-3">Tasks</h3>
						{quest.tasks && quest.tasks.length > 0 ? (
							quest.tasks.map((task, index) => (
								<Link
									key={task.taskId}
									href={`/v2/quests/${quest.questId}/${task.taskId}`}
									onClick={(e) => handleTaskClick(task, e)}
									className={`block transition-all ${
										task.isUnlocked && !task.isCompleted
											? "cursor-pointer hover:bg-gray-50"
											: "cursor-default"
									}`}
									aria-disabled={!task.isUnlocked || task.isCompleted}
									aria-label={`${task.taskName} - ${getTaskStatusText(task)}`}
								>
									<div
										className={`flex items-center gap-3 p-3 rounded-lg border ${
											task.isUnlocked && !task.isCompleted
												? "border-gray-200 hover:border-gray-300"
												: "border-gray-100"
										} ${
											task.isCompleted
												? "bg-green-50 border-green-200"
												: !task.isUnlocked
													? "bg-gray-50 border-gray-100"
													: "bg-white"
										}`}
									>
										<div className="flex-shrink-0">
											{getTaskStatusIcon(task)}
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-1">
												<h4 className="font-medium text-[#1a140a] truncate">
													{task.taskName}
												</h4>
												<span
													className={`text-xs px-2 py-1 rounded-full ${getTaskStatusColor(task)}`}
												>
													{getTaskStatusText(task)}
												</span>
											</div>
											<p className="text-sm text-[#7c6f57] line-clamp-2">
												{task.taskDesc}
											</p>
											<div className="flex items-center gap-4 mt-2 text-xs text-[#a89c87]">
												<span className="flex items-center gap-1">
													<svg
														width="12"
														height="12"
														fill="none"
														viewBox="0 0 24 24"
													>
														<title>Points</title>
														<path
															d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
															fill="#a89c87"
														/>
													</svg>
													{task.magatamaPointAwarded} pts
												</span>
												<span className="capitalize">
													{task.taskType.toLowerCase().replace("_", " ")}
												</span>
											</div>
										</div>
									</div>
								</Link>
							))
						) : (
							<div className="text-center py-8 text-[#7c6f57]">
								<p>No tasks available for this quest.</p>
							</div>
						)}
					</div>
				</div>
				{/* Right: Progress & Rewards */}
				<div className="bg-white/90 rounded-2xl shadow-lg p-8 w-full md:w-[350px] mt-8 md:mt-0 flex flex-col items-stretch">
					<h2 className="text-xl font-semibold mb-2 text-[#1a140a]">
						Quest Progress
					</h2>
					<div className="text-sm text-[#7c6f57] mb-2">
						{completedTasksCount} of {totalTasksCount} tasks completed
					</div>
					<div className="h-2 w-full bg-[#ece5d6] rounded-full mb-4">
						<div
							className="h-2 bg-[#a89c87] rounded-full transition-all duration-300"
							style={{ width: `${progressPercentage}%` }}
						/>
					</div>
					<div className="bg-[#fdf6ee] rounded-xl p-4 mb-2">
						<div className="font-semibold mb-1 text-[#3d2c13]">Rewards</div>
						<div className="flex flex-col gap-1">
							<span className="flex items-center gap-2 text-[#a88c2c] font-medium">
								<svg
									width="18"
									height="18"
									fill="none"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<title>Points</title>
									<path
										d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
										fill="#a88c2c"
									/>
								</svg>
								{quest.totalMagatamaPointAwarded} points
							</span>
							<span className="flex items-center gap-2 text-[#7c6f57] font-medium">
								<span className="text-xs font-bold text-purple-700">NFT</span>{" "}
								Unique NFT reward
							</span>
						</div>
						<span className="inline-block mt-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
							Upon completion
						</span>
					</div>
					<div className="text-xs text-[#7c6f57] mt-2">
						Complete all tasks to earn the rewards.
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestOverview;
