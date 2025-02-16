import { downToUpVariants } from "@/lib/animation/variants-settings";
import type {
	ChapterSelection,
	ChapterSelectionProps,
} from "@/types/story-type";
import { motion } from "framer-motion";
import type React from "react";
import ChapterSelectionButton from "./chapter-selection-button";

const ChapterSelectionComponent: React.FC<ChapterSelectionProps> = ({
	selectionData,
	handleSelectChapter,
	selectedButtonRef,
}) => {
	const shouldScroll = selectionData.length > 1;

	return (
		<motion.div
			className="mt-2 hidden md:flex rounded-bl-xl rounded-tl-xl md:bg-warmGrey2 pb-2 pl-12"
			initial="hidden"
			animate="visible"
			variants={downToUpVariants}
			transition={{ duration: 0.5 }}
		>
			<div
				className={`flex w-full items-center overflow-y-hidden ${
					shouldScroll ? "overflow-x-scroll" : ""
				}`}
			>
				<div className="mr-10 shrink-0 text-xl font-bold tracking-wider transition-all duration-500">
					BUNGO ONO
				</div>

				{selectionData.map((selection: ChapterSelection, index: number) => (
					<div
						key={selection.selectedChapterId}
						className={`md:w-full ${index === 0 ? "sticky" : ""}`}
					>
						<ChapterSelectionButton
							selection={selection}
							onSelect={handleSelectChapter}
							ref={selection.isSelected ? selectedButtonRef : null}
						/>
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default ChapterSelectionComponent;
