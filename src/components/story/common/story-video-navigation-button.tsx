import { Button } from "@headlessui/react";
import {
	ArrowUturnLeftIcon,
	SpeakerXMarkIcon,
	SpeakerWaveIcon,
	ArrowRightIcon,
	ArrowLeftIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { motion } from "framer-motion";
import type React from "react";
import type { StoryVideoNavigationButtonsProps } from "@/types/story-type";
import { downToUpVariants } from "@/lib/animation/variants-settings";

const StoryVideoNavigationButtons: React.FC<
	StoryVideoNavigationButtonsProps
> = ({
	returnLink,
	isMuted,
	toggleSound,
	handlePreviousChapter,
	handleNextChapter,
	previousChapterUnlocked,
	nextChapterUnlocked,
}) => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={downToUpVariants}
			transition={{ duration: 0.5 }}
			className="absolute left-5 bottom-5 space-x-2 flex"
		>
			<motion.div
				initial="hidden"
				animate="visible"
				variants={downToUpVariants}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				<Link href={returnLink}>
					<Button className="font-light tracking-widest text-[10px] md:text-xs z-20 p-2 uppercase text-warmGrey border-warmGrey2 border rounded-full transition-all duration-300 hover:bg-warmGrey hover:text-charcoal">
						<ArrowUturnLeftIcon className="h-5 w-5 md:h-6 md:w-6 inline-block" />
					</Button>
				</Link>
			</motion.div>
			<motion.div
				initial="hidden"
				animate="visible"
				variants={downToUpVariants}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<Button
					onClick={toggleSound}
					className="font-light tracking-widest text-[10px] md:text-xs z-20 p-2 uppercase text-warmGrey border-warmGrey2 border rounded-full transition-all duration-300 hover:bg-warmGrey hover:text-charcoal"
				>
					{isMuted ? (
						<SpeakerXMarkIcon className="h-5 w-5 md:h-6 md:w-6 inline-block" />
					) : (
						<SpeakerWaveIcon className="h-5 w-5 md:h-6 md:w-6 inline-block" />
					)}
				</Button>
			</motion.div>
			{previousChapterUnlocked && (
				<motion.div
					initial="hidden"
					animate="visible"
					variants={downToUpVariants}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<Button
						onClick={handlePreviousChapter}
						className="font-light tracking-widest text-[10px] md:text-xs z-20 p-2 uppercase text-warmGrey border-warmGrey2 border rounded-full transition-all duration-300 hover:bg-warmGrey hover:text-charcoal"
					>
						<ArrowLeftIcon className="h-5 w-5 md:h-6 md:w-6 inline-block" />
					</Button>
				</motion.div>
			)}
			{nextChapterUnlocked && (
				<motion.div
					initial="hidden"
					animate="visible"
					variants={downToUpVariants}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<Button
						onClick={handleNextChapter}
						className="font-light tracking-widest text-[10px] md:text-xs z-20 p-2 uppercase text-warmGrey border-warmGrey2 border rounded-full transition-all duration-300 hover:bg-warmGrey hover:text-charcoal"
					>
						<ArrowRightIcon className="h-5 w-5 md:h-6 md:w-6 inline-block" />
					</Button>
				</motion.div>
			)}
		</motion.div>
	);
};

export default StoryVideoNavigationButtons;
