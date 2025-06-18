import React from "react";
import { AlertTriangle } from "lucide-react";

interface ActionItemsProps {
	contentHealth: {
		questsWithoutImage: number;
		questsWithoutTouristSpot: number;
	};
	quality: {
		averageTasksPerQuest: number;
	};
	engagement: {
		premiumQuests: number;
	};
}

export function ActionItems({
	contentHealth,
	quality,
	engagement,
}: ActionItemsProps) {
	const hasActions =
		contentHealth.questsWithoutImage > 0 ||
		contentHealth.questsWithoutTouristSpot > 0 ||
		quality.averageTasksPerQuest < 3 ||
		engagement.premiumQuests === 0;

	if (!hasActions) {
		return (
			<div className="rounded-lg bg-green-50 border border-green-200 p-6">
				<h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
					<AlertTriangle size={18} />
					All Good!
				</h2>
				<p className="text-green-700">
					Your content is in excellent shape. No immediate actions needed.
				</p>
			</div>
		);
	}

	return (
		<div className="rounded-lg bg-red-50 border border-red-200 p-6">
			<h2 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
				<AlertTriangle size={18} />
				Recommended Actions
			</h2>
			<div className="space-y-2 text-sm">
				{contentHealth.questsWithoutImage > 0 && (
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 bg-red-500 rounded-full" />
						<span className="text-red-700">
							Add images to {contentHealth.questsWithoutImage} quests
						</span>
					</div>
				)}
				{contentHealth.questsWithoutTouristSpot > 0 && (
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 bg-yellow-500 rounded-full" />
						<span className="text-yellow-700">
							Link {contentHealth.questsWithoutTouristSpot} quests to tourist
							spots
						</span>
					</div>
				)}
				{quality.averageTasksPerQuest < 3 && (
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 bg-blue-500 rounded-full" />
						<span className="text-blue-700">
							Consider adding more tasks to quests (current avg:{" "}
							{quality.averageTasksPerQuest.toFixed(1)})
						</span>
					</div>
				)}
				{engagement.premiumQuests === 0 && (
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 bg-purple-500 rounded-full" />
						<span className="text-purple-700">
							Consider creating premium quest content for monetization
						</span>
					</div>
				)}
			</div>
		</div>
	);
}