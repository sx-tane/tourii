import React from "react";
import type { QuestResponseDto } from "@/api/generated";

interface QuestDetailsProps {
	quest: QuestResponseDto;
}

export function QuestDetails({ quest }: QuestDetailsProps) {
	return (
		<div className="mb-6 rounded-lg bg-gray-50 p-4">
			<h3 className="text-lg font-semibold text-charcoal mb-4">
				📊 Complete Quest Data
			</h3>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">🆔 Identifiers & Status</h4>
					<div className="text-sm space-y-1">
						<div>
							<span className="font-medium">Quest ID:</span> {quest.questId}
						</div>
						<div>
							<span className="font-medium">Type:</span>{" "}
							<span
								className={`px-2 py-1 rounded-full text-xs ${
									quest.questType === "TRAVEL_TO_EARN"
										? "bg-green-100 text-green-800"
										: quest.questType === "EARN_TO_TRAVEL"
											? "bg-blue-100 text-blue-800"
											: quest.questType === "CAMPAIGN"
												? "bg-orange-100 text-orange-800"
												: quest.questType === "COMMUNITY_EVENT"
													? "bg-purple-100 text-purple-800"
													: "bg-gray-100 text-gray-800"
								}`}
							>
								{quest.questType}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-medium">Status:</span>
							{quest.isUnlocked ? (
								<span className="flex items-center gap-1 text-green-600">
									🔓 Unlocked
								</span>
							) : (
								<span className="flex items-center gap-1 text-red-600">
									🔒 Locked
								</span>
							)}
							{quest.isPremium && (
								<span className="flex items-center gap-1 text-yellow-600">
									⭐ Premium
								</span>
							)}
						</div>
						<div>
							<span className="font-medium">Points:</span>{" "}
							<span className="font-bold text-green-600">
								{quest.totalMagatamaPointAwarded || 0}
							</span>
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">🏖️ Tourist Spot Info</h4>
					<div className="text-sm space-y-1">
						{quest.touristSpot ? (
							<>
								<div>
									<span className="font-medium">Spot ID:</span>{" "}
									{quest.touristSpot.touristSpotId}
								</div>
								<div>
									<span className="font-medium">Spot Name:</span>{" "}
									{quest.touristSpot.touristSpotName}
								</div>
								<div>
									<span className="font-medium">Description:</span>
									<div className="max-h-20 overflow-y-auto text-xs mt-1 p-2 bg-white rounded">
										{quest.touristSpot.touristSpotDesc || "No description"}
									</div>
								</div>
								<div>
									<span className="font-medium">Best Visit:</span>{" "}
									{quest.touristSpot.bestVisitTime || "Anytime"}
								</div>
							</>
						) : (
							<div className="text-red-600">No tourist spot linked</div>
						)}
					</div>
				</div>
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">📅 Timestamps & Users</h4>
					<div className="text-sm space-y-1">
						{quest.insDateTime && (
							<div>
								<span className="font-medium">Created:</span>{" "}
								{quest.insDateTime &&
								!Number.isNaN(Date.parse(quest.insDateTime))
									? new Date(quest.insDateTime).toLocaleString()
									: quest.insDateTime || "N/A"}
							</div>
						)}
						{quest.updDateTime && (
							<div>
								<span className="font-medium">Updated:</span>{" "}
								{quest.updDateTime &&
								!Number.isNaN(Date.parse(quest.updDateTime))
									? new Date(quest.updDateTime).toLocaleString()
									: quest.updDateTime || "N/A"}
							</div>
						)}
						{quest.insUserId && (
							<div>
								<span className="font-medium">Created By:</span> {quest.insUserId}
							</div>
						)}
						{quest.updUserId && (
							<div>
								<span className="font-medium">Updated By:</span> {quest.updUserId}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Quest Image */}
			{quest.questImage && (
				<div className="mt-4 space-y-2">
					<h4 className="font-medium text-charcoal">🖼️ Quest Image</h4>
					<div className="text-sm">
						<div className="truncate text-blue-600">{quest.questImage}</div>
					</div>
				</div>
			)}

			{/* Tasks Section */}
			{quest.tasks && quest.tasks.length > 0 && (
				<div className="mt-4">
					<h4 className="font-medium text-charcoal mb-2">
						📋 Quest Tasks ({quest.tasks.length})
					</h4>
					<div className="max-h-40 overflow-y-auto space-y-2">
						{quest.tasks.map((task, idx) => (
							<div
								key={`quest-task-${quest.questId}-${task.taskId}`}
								className="bg-white p-3 rounded border"
							>
								<div className="flex items-center justify-between">
									<div className="font-medium text-sm">
										{idx + 1}. {task.taskName}
									</div>
									<div className="flex items-center gap-2">
										<span className="text-blue-600 text-xs">
											{task.isUnlocked ? "🔓 Unlocked" : "🔒 Locked"}
										</span>
									</div>
								</div>
								{task.taskDesc && (
									<div className="text-xs text-gray-600 mt-1">
										{task.taskDesc}
									</div>
								)}
								<div className="text-xs text-purple-600 mt-1">
									Theme: {task.taskTheme} | Type: {task.taskType}
								</div>
								{task.requiredAction && (
									<div className="text-xs text-blue-600 mt-1 truncate">
										Action: {task.requiredAction}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Raw JSON Data */}
			<details className="mt-4">
				<summary className="font-medium text-purple-600 cursor-pointer">
					🔍 Raw JSON Data
				</summary>
				<pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60 border">
					{JSON.stringify(quest, null, 2)}
				</pre>
			</details>
		</div>
	);
}