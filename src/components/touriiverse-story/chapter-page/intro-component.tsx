import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
import type { Chapter } from "@/types/story-type";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import Image from "next/image";

const IntroComponent: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
	const isVideo = chapter?.image.endsWith(".mp4");
	const isNotVideo = chapter?.image.endsWith(".png");
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
				{chapter?.area}
				<div className="mt-1 mb-10 md:mt-3 text-3xl md:text-base font-bold md:font-semibold">
					{chapter?.chapterNumber}
				</div>
			</motion.div>
			{isNotVideo && (
				<Image
					src={chapter?.image ?? ""}
					alt={chapter?.title ?? ""}
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
					<source src={chapter?.image ?? ""} type="video/mp4" />
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
					{chapter?.title}
				</div>
				<Markdown className="pr-1 md:pr-0 text-justify text-sm md:w-7/12 md:text-base leading-relaxed max-h-[30vh] md:max-h-full overflow-y-auto md:overflow-y-visible">
					{chapter?.content}
				</Markdown>
			</motion.div>
		</motion.div>
	);
};

export default IntroComponent;
