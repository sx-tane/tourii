"use client";

import { useHomepageHighlights } from "@/hooks/api/useHomepageHighlights";
import Line from "../about/divider-line/line";
import { SectionTitle } from "../common/section-title";
import { QuestCard } from "./quest-card";

export const PopularQuestSection: React.FC = () => {
	const { data: highlights } = useHomepageHighlights();

	// Use API data or fallback
	const popularQuests = highlights?.popularQuests || [
		{
			questId: "demo-quest-1",
			title: "Explore Sacred Temple",
			imageUrl: "/image/touriiverse/bungo-ono/chapter1.png",
			link: "/v2/quests/demo-quest-1",
		},
		{
			questId: "demo-quest-2",
			title: "Cherry Blossom Hunt",
			imageUrl: "/image/touriiverse/bungo-ono/chapter1.png",
			link: "/v2/quests/demo-quest-2",
		},
		{
			questId: "demo-quest-3",
			title: "Mountain Hiking Quest",
			imageUrl: "/image/touriiverse/bungo-ono/chapter1.png",
			link: "/v2/quests/demo-quest-3",
		},
	];

	return (
		<div className="flex flex-col items-center w-11/12 mx-auto mt-20">
			<div className="flex justify-center w-full px-5">
				<div className="w-full max-w-screen-md">
					<Line />
				</div>
			</div>
			<div className="z-20">
				<SectionTitle subtitle={["FEATURED"]} title={["POPULAR", "QUEST"]} />
				<div className="w-full max-w-screen-md mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
						{popularQuests.slice(0, 3).map((quest, index) => (
							<QuestCard
								key={quest.questId}
								questId={quest.questId}
								title={quest.title}
								imageUrl={quest.imageUrl}
								link={quest.link}
								index={index}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
