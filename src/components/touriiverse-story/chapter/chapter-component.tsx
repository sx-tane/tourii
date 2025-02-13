"use client";

import type { Chapter } from "@/types/story-type";
import Image from "next/image";
import { useState } from "react";
import Markdown from "react-markdown";
import { motion } from "framer-motion";
import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
import ChapterButton from "./chapter-button";

const ChapterComponent: React.FC<{ chapter?: Chapter }> = ({ chapter }) => {
	const [isHovered, setIsHovered] = useState(false);

	const imageSrc =
		isHovered && chapter?.realImage ? chapter.realImage : chapter?.image;

	return (
		<motion.div
			className="relative h-[70vh] w-auto animate-fadeIn rounded-bl-xl rounded-tl-xl bg-warmGrey p-8 text-charcoal"
			initial="hidden"
			animate="visible"
			variants={upToDownVariants}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				className="text-lg font-semibold uppercase tracking-widest"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{chapter?.chapterNumber}
			</motion.div>
			<motion.div
				className="absolute right-14 top-8 text-center text-lg font-bold uppercase tracking-widest"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				{chapter?.area}
			</motion.div>
			<motion.div
				className="bottom-8 left-8 md:absolute md:w-8/12"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.3 }}
			>
				<div className="mb-5 text-sm font-bold uppercase tracking-widest md:text-3xl">
					{chapter?.title}
				</div>
				<Markdown className="gap-10 overflow-hidden whitespace-pre-wrap text-justify text-base ">
					{(chapter?.content.length ?? 0 > 350)
						? `${chapter?.content?.substring(0, 350)}...`
						: chapter?.content}
				</Markdown>
			</motion.div>
			<motion.div
				className="absolute bottom-8 right-14 animate-fadeIn"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.4 }}
			>
				<Image
					src={imageSrc ?? ""}
					alt={chapter?.title ?? ""}
					width={550}
					height={550}
					priority
					className="aspect-square h-[48vh] w-[20vw] animate-fadeIn rounded-full object-cover"
				/>
				<ChapterButton
					vnUnlocked={chapter?.vnUnlocked}
					chapterId={chapter?.chapterId}
					chapterNumber={chapter?.chapterNumber}
				/>
			</motion.div>
		</motion.div>
	);
};

export default ChapterComponent;
