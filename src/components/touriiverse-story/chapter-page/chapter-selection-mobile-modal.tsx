import { upToDownVariants } from "@/lib/animation/variants-settings";
import type { ChapterSelectionProps } from "@/types/story-type";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import { useState } from "react";

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
	const [currentIndex, setCurrentIndex] = useState(0);
	const handleLeftClick = () => {
		const newIndex =
			(currentIndex - 5 + selectionData.length) % selectionData.length;
		setCurrentIndex(newIndex);
		if (placeName === "BUNGO ONO") {
			setCurrentIndex(currentIndex);
		}
	};

	const handleRightClick = () => {
		const newIndex = (currentIndex + 5) % selectionData.length;
		setCurrentIndex(newIndex);
		if (placeName === "BUNGO ONO") {
			setCurrentIndex(currentIndex);
		}
	};

	const handleSwipe = (direction: "left" | "right") => {
		if (direction === "left") {
			handleLeftClick();
		} else {
			handleRightClick();
		}
	};
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* <div className="hidden">menu</div> */}
					<motion.div
						className="absolute -left-[10.5em] w-56 h-[30em] inset-0 rounded-md bg-red z-50"
						initial="hidden"
						animate="visible"
						exit="hidden"
						variants={upToDownVariants}
						transition={{ duration: 0.1 }}
						onTouchStart={(e) => {
							if (e.changedTouches && e.changedTouches.length > 0) {
								const touchStartX = e.changedTouches?.[0]?.screenX;
								const handleTouchEnd = (e: TouchEvent) => {
									if (e.changedTouches && e.changedTouches.length > 0) {
										const touchEndX = e.changedTouches?.[0]?.screenX;
										if (touchStartX === undefined || touchEndX === undefined)
											return;
										if (touchStartX < touchEndX) {
											handleLeftClick();
										} else if (touchEndX < touchStartX) {
											handleRightClick();
										}
									}
									document.removeEventListener("touchend", handleTouchEnd);
								};
								document.addEventListener("touchend", handleTouchEnd);
							}
						}}
					>
						<div className="py-6 text-white font-bold text-xl flex flex-col items-center tracking-widest z-50">
							{placeName}
						</div>
						<button
							type="button"
							className="absolute left-[0em] top-[13.8em] animate-bounce"
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
						{selectionData
							.slice(currentIndex, currentIndex + (5 % selectionData.length))
							.map((selection) => {
								return (
									<div key={selection.chapter} className="py-5">
										<div
											className={`relative bottom-1 left-[4.6em] h-0.5 w-[4.8em] ${selection?.isSelected ? "bg-white" : "hidden"}`}
										/>
										<button
											type="button"
											onClick={() =>
												handleSelectChapter(selection?.selectedChapterId ?? "")
											}
											className={`text-warmGrey3 w-48 ${selection?.isSelected ? "text-white" : "text-warmGrey3"}`}
										>
											<button type="button" onClick={onClose}>
												<div className="font-bold text-xs uppercase tracking-wider">
													{selection?.chapter}
												</div>
												<div className="relative top-1 italic text-xs font-medium">
													{selection?.placeName}
												</div>
											</button>
										</button>
									</div>
								);
							})}
						<button
							type="button"
							className="absolute right-[0em] bottom-[15.2em] animate-bounce"
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
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};
export default ChapterSelectionMobileModal;
