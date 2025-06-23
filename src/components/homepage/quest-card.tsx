import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";

import { useQuestById } from "@/hooks/api/useQuestById";

interface QuestCardProps {
	questId: string;
	title: string;
	imageUrl: string | null;
	link: string | null;
	index: number;
	forceAspectRatio?: "normal" | "wider";
}

// Constants moved outside component to prevent recreation
const DEFAULT_IMAGE = "/image/touriiverse/story-page.png";
const DEFAULT_MAGATAMA = 500;

// Animation variants
const downToUpVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0 },
};

// Helper functions moved outside and memoized
const getDifficulty = (totalPoints: number, taskCount: number): string => {
	if (totalPoints >= 1000 || taskCount >= 5) return "Hard";
	if (totalPoints >= 500 || taskCount >= 3) return "Medium";
	return "Easy";
};

const formatQuestType = (questType: string): string => {
	return questType.replace(/_/g, " ");
};

// Badge component to reduce duplication
const Badge = memo(
	({
		children,
		className = "",
	}: {
		children: React.ReactNode;
		className?: string;
	}) => (
		<div
			className={`bg-red rounded-full px-3 tracking-widest font-semibold  ${className}`}
		>
			<span className="text-warmGrey text-xs py-1 font-semibold italic">
				{children}
			</span>
		</div>
	),
);

export const QuestCard: React.FC<QuestCardProps> = memo(
	({ questId, title, imageUrl, link, index, forceAspectRatio = "normal" }) => {
		// Only fetch quest data if we have a valid questId (skip demo quests)
		const shouldFetchQuest = questId && !questId.startsWith("demo-quest");
		const { data: questData } = useQuestById(
			shouldFetchQuest ? questId : undefined,
		);

		// Memoize computed values
		const computedValues = useMemo(() => {
			const displayTitle = questData?.questName || title;
			const displayImage = questData?.questImage || imageUrl || DEFAULT_IMAGE;
			const magatama = questData?.totalMagatamaPointAwarded || DEFAULT_MAGATAMA;
			const questType = questData?.questType || "UNKNOWN";
			const taskCount = questData?.tasks?.length || 0;
			const difficulty = getDifficulty(magatama, taskCount);
			const formattedQuestType = formatQuestType(questType);

			return {
				displayTitle,
				displayImage,
				magatama,
				difficulty,
				formattedQuestType,
			};
		}, [questData, title, imageUrl]);

		// Determine aspect ratio based on forceAspectRatio prop
		const aspectRatio = forceAspectRatio === "wider" ? "4/3" : "3/4";

		return (
			<motion.div
				className="w-full group relative overflow-hidden rounded-[20px] shadow-lg"
				style={{ aspectRatio }}
				initial={{ opacity: 0, y: 40, scale: 0.98 }}
				whileInView={{ opacity: 1, y: 0, scale: 1 }}
				viewport={{ once: false, amount: 0.3 }}
				transition={{
					duration: 1,
					delay: index * 0.2,
					ease: [0.25, 0.1, 0.25, 1],
				}}
				whileHover={{ scale: 1.02 }}
			>
				<Link href={link || "#"} className="block w-full h-full">
					{/* Background Image */}
					<div className="relative w-full h-full">
						<Image
							src={computedValues.displayImage}
							alt={computedValues.displayTitle}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							priority={index < 3}
						/>

						{/* Gradient Overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

						{/* Quest Info - Bottom */}
						<div className="absolute bottom-0 left-0 right-0 p-4 gap-2 flex flex-col">
							{/* Badges Row - Above Title */}
							<motion.div
								className="flex items-center gap-2"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: false }}
								variants={downToUpVariants}
								transition={{
									duration: 0.8,
									delay: index * 0.2 + 0.3,
									ease: [0.6, 0.05, 0.01, 0.9],
								}}
							>
								<Badge>{computedValues.difficulty}</Badge>
								<Badge>{computedValues.magatama} Magatama</Badge>
							</motion.div>

							{/* Title and Type */}
							<motion.div
								className="text-left flex flex-col gap-2"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: false }}
								variants={downToUpVariants}
								transition={{
									duration: 0.8,
									delay: index * 0.2 + 0.5,
									ease: [0.6, 0.05, 0.01, 0.9],
								}}
							>
								<h3 className="text-warmGrey text-lg font-bold tracking-widest uppercase line-clamp-2">
									{computedValues.displayTitle}
								</h3>
								<p className="text-warmGrey/70 text-xs font-normal tracking-widest uppercase italic">
									{computedValues.formattedQuestType}
								</p>
							</motion.div>
						</div>
					</div>
				</Link>
			</motion.div>
		);
	},
);
