"use client";

import type { StoryChapterResponseDto } from "@/api/generated";
import { upToDownVariants } from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";
import Image from "next/image";
import Markdown from "react-markdown";
import ChapterButton from "./chapter-button";

interface ChapterComponentProps {
	chapter?: StoryChapterResponseDto;
	sagaName?: string;
}

const ChapterComponent: React.FC<ChapterComponentProps> = ({
	chapter,
	sagaName,
}) => {
	const chapterImage = chapter?.chapterImage ?? "";
	const chapterTitle = chapter?.chapterTitle ?? "";
	const chapterDesc = chapter?.chapterDesc ?? "";
	const chapterNumber = chapter?.chapterNumber ?? "";

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
				{sagaName ?? "Chapter Area"}
			</motion.div>
			<motion.div
				className="mt-1 mb-10 md:mt-0 text-3xl md:text-lg font-bold md:font-semibold text-center md:text-left uppercase tracking-widest"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{chapterNumber}
			</motion.div>
			<motion.div
				className="mt-1 mb-10 md:mt-0 text-3xl md:text-lg font-bold md:font-semibold text-center md:text-left uppercase tracking-widest"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<Image
					src={chapterImage}
					alt={chapterTitle}
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
				<div className="mb-5 text-sm font-bold uppercase tracking-widest md:text-2xl">
					{chapterTitle}
				</div>
				<Markdown className="text-justify text-sm md:w-10/12 md:text-base leading-relaxed max-h-[30vh] md:max-h-full overflow-y-auto md:overflow-y-visible">
					{chapterDesc.length > 400
						? `${chapterDesc.substring(0, 400)}...`
						: chapterDesc}
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
					src={chapterImage}
					alt={chapterTitle}
					width={550}
					height={550}
					priority
					className="hidden md:flex h-[45vh] w-full animate-fadeIn rounded-t-full rounded-b-full object-cover"
				/>
				<ChapterButton chapter={chapter} />
			</motion.div>
		</motion.div>
	);
};

export default ChapterComponent;
