import {
	backdropVariants,
	downToUpVariants,
	downToUpVariantsMobile,
	modalVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
import type {
	Chapter,
	ChapterSelection,
	ChapterSelectionButtonProps,
	ChapterSelectionProps,
} from "@/types/story-type";
import { AnimatePresence, motion } from "framer-motion";
import ChapterSelectionMobileButton from "./chapter-selection-mobile-button";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import { characters } from "@/lib/data/character/character-data";

interface ChapterSelectionMobileModalProps extends ChapterSelectionProps {
	isOpen: boolean;
	onClose: () => void;
	handleNextModalList: (list: ChapterSelection[]) => void;
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
	const [currentIndex, setCurrentIndex] = useState(0);
	const handleLeftClick = () => {};

	const handleRightClick = () => {
		const newIndex = (currentIndex + 5) % selectionData.length;
		setCurrentIndex(newIndex);
	};
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* <div className="hidden">menu</div> */}
					<motion.div
						className="absolute -left-[10.2em] w-56 h-fit inset-0 rounded-md bg-red z-20"
						initial="hidden"
						animate="visible"
						exit="hidden"
						variants={upToDownVariants}
						transition={{ duration: 0.1 }}
						// onClick={onClose}
					>
						<div className="py-6 text-white font-bold flex flex-col items-center tracking-widest z-50">
							{placeName}
						</div>

						<div className="pb-5">
							<button
								type="button"
								className="float-left flex flex-row justify-center animate-fadeIn"
								onClick={handleLeftClick}
							>
								<Image
									src="/image/about/left.svg"
									alt="left"
									width={20}
									height={20}
									priority
								/>
							</button>
							{[...Array(6)].map((_, index) => {
								const selection = selectionData[index];
								return (
									<div
										key={selectionData?.[index]?.selectedChapterId}
										className="relative flex flex-col items-center py-5"
									>
										<div
											className={`relative bottom-2 flex flex-col items-center h-0.5 w-[4.8em] ${selection?.isSelected ? "bg-white" : "hidden"}`}
										/>
										<button
											type="button"
											onClick={() =>
												handleSelectChapter(selection?.selectedChapterId ?? "")
											}
											className={`text-warmGrey3 w-48 ${selection?.isSelected ? "text-white" : "text-warmGrey3"}`}
										>
											<div className="font-bold text-xs uppercase tracking-wider">
												{selection?.chapter}
											</div>
											<div className="relative top-1 italic text-xs font-medium">
												{selection?.placeName}
											</div>
										</button>
									</div>
								);
							})}
							<button
								type="button"
								className="float-right flex flex-row justify-center animate-fadeIn"
								onClick={handleRightClick}
							>
								<Image
									src="/image/about/right.svg"
									alt="right"
									width={20}
									height={20}
									priority
								/>
							</button>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};
export default ChapterSelectionMobileModal;
