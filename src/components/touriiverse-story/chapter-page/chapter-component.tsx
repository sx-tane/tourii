"use client";

import { upToDownVariants } from "@/lib/animation/variants-settings";
import type { Chapter } from "@/types/story-type";
import { motion } from "framer-motion";
import Image from "next/image";
import Markdown from "react-markdown";
import ChapterButton from "./chapter-button";

const ChapterComponent: React.FC<{ chapter?: Chapter; areaLink: string }> = ({
	chapter,
	areaLink,
}) => {
	return (
		<motion.div
			className="relative md:h-[70vh] w-auto rounded-xl md:rounded-tr-none md:rounded-br-none md:rounded-bl-xl md:rounded-tl-xl bg-warmGrey p-8 text-charcoal"
			initial="hidden"
			animate="visible"
			variants={upToDownVariants}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				className="mt-5 md:mt-0 md:absolute md:right-14 md:top-8 text-center text-sm md:text-lg font-medium md:font-bold uppercase tracking-widest"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{chapter?.area}
			</motion.div>
			<motion.div
				className="mt-1 mb-10 md:mt-0 text-3xl md:text-lg font-bold md:font-semibold text-center md:text-left uppercase tracking-widest"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{chapter?.chapterNumber}
			</motion.div>
			<motion.div
				className="mt-1 mb-10 md:mt-0 text-3xl md:text-lg font-bold md:font-semibold text-center md:text-left uppercase tracking-widest"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<Image
					src={chapter?.image ?? ""}
					alt={chapter?.title ?? ""}
					width={550}
					height={550}
					priority
					className="flex md:hidden aspect-square w-8/12 md:w-auto md:rounded-full object-cover rounded-t-full rounded-b-full h-[38vh] md:h-[25vh] lg:h-[40vh] xl:h-[55vh] mx-auto"
				/>
			</motion.div>
			<motion.div
				className="bottom-8 left-8 md:absolute md:w-8/12"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.3 }}
			>
				<div className="mb-5 text-xl font-bold uppercase tracking-widest md:text-2xl">
					{chapter?.title}
				</div>
				<Markdown className="text-justify text-sm md:w-10/12 md:text-base leading-relaxed max-h-[30vh] md:max-h-full overflow-y-auto md:overflow-y-visible">
					{(chapter?.content.length ?? 0 > 400)
						? `${chapter?.content?.substring(0, 400)}...`
						: chapter?.content}
				</Markdown>
			</motion.div>
			<motion.div
				className="md:absolute md:bottom-8 md:right-14 md:w-3/12 xl:w-2/12 animate-fadeIn"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.4 }}
			>
				<Image
					src={chapter?.image ?? ""}
					alt={chapter?.title ?? ""}
					width={550}
					height={550}
					priority
					className="hidden md:flex h-[45vh] w-full animate-fadeIn rounded-t-full rounded-b-full object-cover"
				/>
				<ChapterButton
					areaLink={areaLink}
					vnUnlocked={chapter?.storyUnlocked}
					chapterId={chapter?.chapterId}
					chapterNumber={chapter?.chapterNumber}
				/>
			</motion.div>
		</motion.div>
	);
};

export default ChapterComponent;
