"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { HomepageHighlightsResponseDto } from "@/api/generated";

interface LatestStoryChapterProps {
	chapter: HomepageHighlightsResponseDto["latestChapter"];
}

export default function LatestStoryChapter({ chapter }: LatestStoryChapterProps) {
	if (!chapter) {
		return (
			<div className="text-center py-12">
				<p className="text-warmGrey3 text-lg">No latest chapter available</p>
			</div>
		);
	}

	const href = chapter.link || `/v2/touriiverse/${chapter.storyId}/chapters/${chapter.chapterId}`;
	const fallbackImage = "/image/touriiverse/story-page.png";

	return (
		<div className="space-y-6">
			{/* Section Header */}
			<div className="text-center">
				<div className="inline-block">
					<p className="text-warmGrey3 text-sm font-medium tracking-wider uppercase mb-2">
						TOURIIVERSE
					</p>
					<h2 className="text-white text-3xl md:text-4xl font-bold">
						THIS WEEK'S TALE
					</h2>
				</div>
			</div>

			{/* Chapter Card */}
			<motion.div
				whileHover={{ scale: 1.01 }}
				whileTap={{ scale: 0.99 }}
				className="group relative overflow-hidden rounded-3xl bg-charcoal shadow-2xl max-w-2xl mx-auto"
			>
				<Link href={href} className="block">
					<div className="relative aspect-[16/10] overflow-hidden">
						<Image
							src={chapter.imageUrl || fallbackImage}
							alt={chapter.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 50vw"
							priority
						/>
						
						{/* Gradient Overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
						
						{/* Chapter Badge */}
						<div className="absolute top-6 left-6 rounded-full bg-warmGrey5/90 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
							{chapter.chapterId ? `CHAPTER ${chapter.chapterId.toUpperCase()}` : 'LATEST CHAPTER'}
						</div>

						{/* Play Button */}
						<div className="absolute inset-0 flex items-center justify-center">
							<motion.button
								whileHover={{ scale: 1.1 }}
								className="rounded-full bg-white/20 p-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30"
								aria-label="Play chapter video"
							>
								<svg
									className="h-8 w-8 text-white ml-1"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M8 5v14l11-7z" />
								</svg>
							</motion.button>
						</div>
					</div>

					{/* Content */}
					<div className="p-6">
						<h3 className="text-white text-xl md:text-2xl font-bold leading-tight line-clamp-2">
							{chapter.title}
						</h3>
						<p className="text-warmGrey3 text-sm mt-2">
							THE LEGEND BEGINS
						</p>
					</div>
				</Link>
			</motion.div>
		</div>
	);
}