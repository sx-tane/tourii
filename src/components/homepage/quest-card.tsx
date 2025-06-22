import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { useQuestById } from "@/hooks/api/useQuestById";

interface QuestCardProps {
	questId: string;
	title: string;
	imageUrl: string | null;
	link: string | null;
	index: number;
}

// Helper function to determine difficulty based on quest data
const getDifficulty = (totalPoints: number, taskCount: number): string => {
	if (totalPoints >= 1000 || taskCount >= 5) return "Hard";
	if (totalPoints >= 500 || taskCount >= 3) return "Medium";
	return "Easy";
};

// Helper function to format quest type for display
const formatQuestType = (questType: string): string => {
	return questType.replace(/_/g, " ");
};

export const QuestCard: React.FC<QuestCardProps> = ({ 
	questId, 
	title, 
	imageUrl, 
	link, 
	index 
}) => {
	const { data: questData } = useQuestById(questId);

	// Use quest data if available, otherwise fallback to props
	const displayTitle = questData?.questName || title;
	const displayImage = questData?.questImage || imageUrl || "/image/touriiverse/story-page.png";
	const magatama = questData?.totalMagatamaPointAwarded || 500;
	const questType = questData?.questType || "UNKNOWN";
	const taskCount = questData?.tasks?.length || 0;
	const difficulty = getDifficulty(magatama, taskCount);

	return (
		<motion.div
			className="group relative overflow-hidden rounded-[20px] aspect-[3/4] shadow-lg"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: false }}
			transition={{
				duration: 0.8,
				delay: index * 0.1,
				ease: [0.6, 0.05, 0.01, 0.9],
			}}
			whileHover={{ scale: 1.02 }}
		>
			<Link href={link || "#"} className="block h-full">
				{/* Background Image */}
				<div className="relative w-full h-full">
					<Image
						src={displayImage}
						alt={displayTitle}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, 33vw"
					/>
					
					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
					
					{/* Top Badges Row */}
					<div className="absolute top-3 left-3 right-3 flex justify-between items-start">
						{/* Difficulty Badge - Top Left */}
						<div className="bg-red rounded-full px-2 py-1">
							<span className="text-white text-xs font-medium">
								{difficulty}
							</span>
						</div>
						
						{/* Magatama Badge - Top Right */}
						<div className="bg-red rounded-full px-2 py-1">
							<span className="text-white text-xs font-medium">
								{magatama} Magatama
							</span>
						</div>
					</div>
					
					{/* Quest Info - Bottom */}
					<div className="absolute bottom-0 left-0 right-0 p-4">
						<div className="text-left">
							<h3 className="text-white text-lg font-bold tracking-wide uppercase leading-tight mb-1 line-clamp-2">
								{displayTitle}
							</h3>
							<p className="text-white/70 text-xs font-medium tracking-wide uppercase">
								{formatQuestType(questType)}
							</p>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};