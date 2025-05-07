import type { StoryChapterResponseDto } from "@/api/generated";
import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";
import Image from "next/image";
import Markdown from "react-markdown";

interface IntroComponentProps {
	chapter: StoryChapterResponseDto;
	sagaName?: string;
}

const IntroComponent: React.FC<IntroComponentProps> = ({
	chapter,
	sagaName,
}) => {
	const isVideo = chapter.chapterImage.endsWith(".mp4");
	const isNotVideo = chapter.chapterImage.endsWith(".png");

	const chapterTitle = chapter?.chapterTitle ?? "";
	const chapterImage = chapter?.chapterImage ?? "";
	const chapterDesc = chapter?.chapterDesc ?? "";

	return (
		<motion.div
			className="relative h-fit md:h-[70vh] w-auto animate-fadeIn rounded-xl md:rounded-bl-xl md:rounded-tl-xl bg-warmGrey p-8 text-charcoal"
			initial="hidden"
			animate="visible"
			variants={upToDownVariants}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				className="text-center font-medium md:font-bold uppercase tracking-widest md:tracking-wider text-sm md:text-5xl"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{sagaName ?? "Introduction Area"}
				<div className="mt-1 mb-10 md:mt-3 text-3xl md:text-base font-bold md:font-semibold">
					{chapter?.chapterNumber}
				</div>
			</motion.div>
			{isNotVideo && (
				<Image
					src={chapterImage}
					alt={chapterTitle}
					width={1200}
					height={1200}
					className="md:absolute md:bottom-8 md:right-8 aspect-square w-8/12 md:w-auto md:rounded-full object-cover rounded-t-full rounded-b-full md:flex h-[38vh] md:h-[25vh] lg:h-[40vh] xl:h-[55vh] mx-auto"
					priority
				/>
			)}
			{isVideo && (
				<motion.video
					autoPlay
					loop
					muted
					playsInline
					className="md:absolute md:bottom-8 md:right-8 aspect-square w-8/12 md:w-auto md:rounded-full object-cover rounded-t-full rounded-b-full md:flex h-[38vh] md:h-[25vh] lg:h-[30vh] xl:h-[55vh] mx-auto"
					initial="hidden"
					animate="visible"
					variants={upToDownVariants}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<source src={chapterImage} type="video/mp4" />
				</motion.video>
			)}

			<motion.div
				className="md:bottom-8 md:left-8 md:absolute mt-10 md:mt-0"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<div className="mb-5 w-full pr-10 md:pr-0 font-bold uppercase text-sm md:text-2xl tracking-widest">
					{chapterTitle}
				</div>
				<Markdown className="pr-1 md:pr-0 text-justify text-sm md:w-7/12 md:text-base leading-relaxed max-h-[30vh] md:max-h-full overflow-y-auto md:overflow-y-visible">
					{chapterDesc}
				</Markdown>
			</motion.div>
		</motion.div>
	);
};

export default IntroComponent;
