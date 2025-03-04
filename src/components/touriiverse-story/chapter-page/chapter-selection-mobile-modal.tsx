import {
	backdropVariants,
	downToUpVariants,
	downToUpVariantsMobile,
	modalVariants,
} from "@/lib/animation/variants-settings";
import type {
	ChapterSelection,
	ChapterSelectionProps,
} from "@/types/story-type";
import { AnimatePresence, motion } from "framer-motion";
import ChapterSelectionMobileButton from "./chapter-selection-mobile-button";

interface ChapterSelectionMobileModalProps extends ChapterSelectionProps {
	isOpen: boolean;
	onClose: () => void;
}

const ChapterSelectionMobileModal: React.FC<
	ChapterSelectionMobileModalProps
> = ({
	isOpen,
	onClose,
	placeName,
	selectionData,
	handleSelectChapter,
	selectedButtonRef,
}) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* <div className="hidden">menu</div> */}
					<motion.div
						className="absolute -left-[9.7em] w-56 h-fit inset-0 rounded-md bg-red z-20"
						initial="hidden"
						animate="visible"
						exit="hidden"
						variants={downToUpVariants}
						transition={{ duration: 0.1 }}
						onClick={onClose}
					>
						<div className="relative top-5 text-white font-bold flex flex-col items-center tracking-widest z-50">
							{placeName}
						</div>

						{selectionData.map((selection: ChapterSelection) => (
							<div key={selection.selectedChapterId}>
								<ChapterSelectionMobileButton
									selection={selection}
									onSelect={handleSelectChapter}
									ref={selection.isSelected ? selectedButtonRef : null}
								/>
							</div>
						))}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};
export default ChapterSelectionMobileModal;
