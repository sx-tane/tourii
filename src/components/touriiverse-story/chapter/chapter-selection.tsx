import { downToUpVariants } from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";
import type React from "react";
import ChapterSelectionButton from "./chapter-selection-button";
import type {
	ChapterSelection,
	ChapterSelectionProps,
} from "@/types/story-type";

const ChapterSelectionComponent: React.FC<ChapterSelectionProps> = ({
	selectionData,
	handleSelectChapter,
	selectedButtonRef,
}) => {
	return (
		<motion.div
			className="mt-2 flex rounded-bl-xl rounded-tl-xl bg-warmGrey2 pb-2 pl-12"
			initial="hidden"
			animate="visible"
			variants={downToUpVariants}
			transition={{ duration: 0.5 }}
		>
			<div className="flex w-full items-center overflow-y-hidden overflow-x-scroll">
				<button
					type="button"
					onClick={() => handleSelectChapter("Intro")}
					onKeyUp={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							handleSelectChapter("Intro");
						}
					}}
					className="mr-10 shrink-0 cursor-pointer text-xl font-bold tracking-wider transition-all duration-500 hover:text-red"
				>
					BUNGO ONO
				</button>

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
