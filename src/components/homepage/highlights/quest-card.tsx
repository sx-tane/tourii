"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface QuestCardProps {
	questId: string;
	title: string;
	imageUrl: string | null;
	link: string | null;
	questType?: string;
	totalMagatamaPointAwarded?: number;
	isPremium?: boolean;
}

export default function QuestCard({
	questId,
	title,
	imageUrl,
	link,
	questType,
	totalMagatamaPointAwarded,
	isPremium,
}: QuestCardProps) {
	const href = link || `/v2/quests/${questId}`;
	const fallbackImage = "/image/homepage/tourii_main.png";

	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className="group relative overflow-hidden rounded-2xl bg-charcoal shadow-lg"
		>
			<Link href={href} className="block">
				<div className="relative aspect-[4/3] overflow-hidden">
					<Image
						src={imageUrl || fallbackImage}
						alt={title}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 20vw"
					/>
					{isPremium && (
						<div className="absolute top-3 right-3 rounded-full bg-red px-2 py-1 text-xs font-medium text-white">
							PREMIUM
						</div>
					)}
					{questType && (
						<div className="absolute top-3 left-3 rounded-full bg-warmGrey5/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
							{questType.toUpperCase()}
						</div>
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
				</div>
				<div className="p-4">
					<h3 className="font-bold text-white text-lg leading-tight line-clamp-2 mb-2">
						{title}
					</h3>
					{totalMagatamaPointAwarded && (
						<div className="flex items-center gap-2 text-warmGrey3 text-sm">
							<span>🪙</span>
							<span>{totalMagatamaPointAwarded} Magatama</span>
						</div>
					)}
				</div>
			</Link>
		</motion.div>
	);
}