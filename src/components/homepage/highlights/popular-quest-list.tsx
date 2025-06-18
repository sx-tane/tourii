"use client";

import QuestCard from "./quest-card";
import type { HomepageHighlightsResponseDto } from "@/api/generated";

interface PopularQuestListProps {
	quests: HomepageHighlightsResponseDto["popularQuests"];
}

export default function PopularQuestList({ quests }: PopularQuestListProps) {
	if (!quests || quests.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-warmGrey3 text-lg">No popular quests available</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Section Header */}
			<div className="text-center">
				<div className="inline-block">
					<p className="text-warmGrey3 text-sm font-medium tracking-wider uppercase mb-2">
						FEATURED
					</p>
					<h2 className="text-white text-3xl md:text-4xl font-bold">
						POPULAR QUEST
					</h2>
				</div>
			</div>

			{/* Quest Grid - Desktop */}
			<div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
				{quests.map((quest) => (
					<QuestCard
						key={quest.questId}
						questId={quest.questId}
						title={quest.title}
						imageUrl={quest.imageUrl}
						link={quest.link}
					/>
				))}
			</div>

			{/* Mobile: Horizontal scroll version */}
			<div className="md:hidden -mx-6 px-6">
				<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
					{quests.map((quest) => (
						<div key={`mobile-${quest.questId}`} className="flex-shrink-0 w-64">
							<QuestCard
								questId={quest.questId}
								title={quest.title}
								imageUrl={quest.imageUrl}
								link={quest.link}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}