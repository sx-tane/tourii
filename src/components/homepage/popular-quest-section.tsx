"use client";

import { useHomepageHighlights } from "@/hooks/api/useHomepageHighlights";
import { motion } from "framer-motion";
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

	// Only show up to 3 quests
	const displayQuests = popularQuests.slice(0, 3);

	return (
		<div className="w-full">
			{/* Section Header with Centered Line */}
			<motion.div
				className="w-full flex justify-center mb-4 sm:mb-6 md:mb-8"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: false, amount: 0.3 }}
				transition={{
					duration: 0.8,
					ease: [0.25, 0.1, 0.25, 1],
				}}
			>
				<div className="w-10/12 md:w-auto">
					<Line />
				</div>
			</motion.div>

			{/* Section Title */}
			<motion.div
				className="w-full px-5 mb-6 sm:mb-8 md:mb-12"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: false, amount: 0.3 }}
				transition={{
					duration: 0.8,
					delay: 0.2,
					ease: [0.25, 0.1, 0.25, 1],
				}}
			>
				<div className="w-full max-w-screen-lg mx-auto">
					<SectionTitle subtitle={["FEATURED"]} title={["POPULAR", "QUEST"]} />
				</div>
			</motion.div>

			{/* Quest Cards Container */}
			<motion.div
				className="w-full px-5"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: false, amount: 0.3 }}
				transition={{
					duration: 1,
					delay: 0.4,
					ease: [0.25, 0.1, 0.25, 1],
				}}
			>
				<div className="w-full max-w-screen-lg mx-auto">
					<div
						className={`grid gap-4 sm:gap-6 md:gap-8 ${
							displayQuests.length === 1
								? "grid-cols-1 justify-items-center"
								: displayQuests.length === 2
									? "grid-cols-1 sm:grid-cols-2 justify-items-center"
									: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
						}`}
					>
						{displayQuests.map((quest, index) => (
							<div
								key={quest.questId}
								className={
									displayQuests.length === 1
										? "w-full max-w-sm"
										: displayQuests.length === 2
											? "w-full max-w-xs"
											: "w-full"
								}
							>
								<QuestCard
									questId={quest.questId}
									title={quest.title}
									imageUrl={quest.imageUrl}
									link={quest.link}
									index={index}
									forceAspectRatio="normal"
								/>
							</div>
						))}
					</div>
				</div>
			</motion.div>
		</div>
	);
};
