import type { ChapterSelectionItem } from "@/app/v2/(stories)/types";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";
import type React from "react";
import ChapterSelectionButton from "./chapter-selection-button";

interface ChapterSelectionComponentProps {
	placeName?: string;
	selectionData: ChapterSelectionItem[];
	handleSelectChapter: (selectedChapterId: string) => void;
	selectedButtonRef: React.RefObject<HTMLDivElement | null>;
}

const ChapterSelectionComponent: React.FC<ChapterSelectionComponentProps> = ({
	placeName,
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
				<div className="mr-10 shrink-0 text-xl font-bold tracking-wider transition-all duration-500 uppercase">
					{placeName}
				</div>

				{/* Map over the new ChapterSelectionItem type */}
				{selectionData.map((item: ChapterSelectionItem, index: number) => {
					// Create the 'selection' object expected by ChapterSelectionButton
					const buttonSelectionProp = {
						selectedChapterId: item.storyChapterId,
						chapter: item.chapterNumber, // Map to chapterNumber
						placeName: item.chapterTitle, // Map to chapterTitle
						isSelected: item.isSelected,
					};

					return (
						<div
							key={item.storyChapterId} // Use storyChapterId as key
							className={`md:w-full ${index === 0 ? "sticky" : ""}`}
						>
							<ChapterSelectionButton
								selection={buttonSelectionProp} // Pass the mapped object
								onSelect={handleSelectChapter}
								ref={item.isSelected ? selectedButtonRef : null} // Use item.isSelected
							/>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
};

export default ChapterSelectionComponent;
