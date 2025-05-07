import type { StorySelection } from "@/app/v2/(stories)/types";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";
import type React from "react";
import StorySelectionButton from "./story-selection-button";

export interface StorySelectionListProps {
	selectionData: StorySelection[];
	onSelect: (selectedStoryId: string) => void;
}

const StorySelectionList: React.FC<StorySelectionListProps> = ({
	selectionData,
	onSelect,
}) => {
	return (
		<div className="item-center mt-2 flex w-full overflow-x-auto md:w-11/12 justify-start gap-1 scrollbar-hide">
			{selectionData.map((selection, index) => (
				<motion.div
					key={selection.selectedStoryId}
					variants={downToUpVariants}
					initial="hidden"
					animate="visible"
					transition={{
						duration: 0.6,
						delay: index * 0.1,
						ease: "easeOut",
					}}
					className={`md:w-full ${index === 0 ? "sticky" : ""}`} // Sticky first button
				>
					<StorySelectionButton selection={selection} onSelect={onSelect} />
				</motion.div>
			))}
		</div>
	);
};

export default StorySelectionList;
