"use client";

import type { QuestResponseDto } from "@/api/generated";

interface QuestInfoDisplayProps {
	quest: QuestResponseDto;
}

export default function QuestInfoDisplay({
	quest,
}: QuestInfoDisplayProps) {
	return (
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
	);
}