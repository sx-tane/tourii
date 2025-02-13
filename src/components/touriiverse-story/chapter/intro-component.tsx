import type { Chapter } from "@/types/story-type";
import Markdown from "react-markdown";
import { motion } from "framer-motion";
import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";

const IntroComponent: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
	return (
		<motion.div
			className="relative h-[70vh] w-auto animate-fadeIn rounded-bl-xl rounded-tl-xl bg-warmGrey p-8 text-charcoal"
			initial="hidden"
			animate="visible"
			variants={upToDownVariants}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				className="text-center font-bold uppercase tracking-wider md:text-5xl"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{chapter?.area}
				<div className="mt-3 text-base font-semibold">
					{chapter?.chapterNumber}
				</div>
			</motion.div>
			<motion.div
				className="bottom-8 left-8 md:absolute"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<div className="mb-5 w-80 font-bold">{chapter?.title}</div>
				<Markdown className="gap-10 whitespace-pre-wrap text-justify text-sm md:w-7/12 xl:columns-2 xl:text-base">
					{chapter?.content}
				</Markdown>
			</motion.div>
			<motion.video
				autoPlay
				loop
				muted
				playsInline
				className="absolute bottom-8 right-8 hidden aspect-square w-auto rounded-full object-cover md:flex md:h-[35vh] lg:h-[45vh] xl:h-[55vh]"
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5, delay: 0.3 }}
			>
				<source src={chapter?.image ?? ""} type="video/mp4" />
			</motion.video>
		</motion.div>
	);
};

export default IntroComponent;
