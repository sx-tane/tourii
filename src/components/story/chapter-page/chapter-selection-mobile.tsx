import type { ChapterSelectionItem } from "@/app/v2/(stories)/types";
import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import { useRef } from "react";
import ChapterSelectionMobileMenuButton from "./chapter-selection-mobile-menu-button";

interface ChapterSelectionMobileComponentProps {
	selectionData: ChapterSelectionItem[];
	handleSelectChapter: (selectedChapterId: string) => void;
	currentIndex: number;
	setCurrentIndex: (index: number) => void;
}

const ChapterSelectionMobileComponent: React.FC<
	ChapterSelectionMobileComponentProps
> = ({ selectionData, handleSelectChapter, currentIndex, setCurrentIndex }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleLeftClick = () => {
		if (selectionData.length === 0) return; // Add guard clause
		const newIndex =
			(currentIndex - 1 + selectionData.length) % selectionData.length;
		setCurrentIndex(newIndex);
		// Use touristSpotId from the new item structure
		handleSelectChapter(selectionData[newIndex]?.storyChapterId ?? "");
	};

	const handleRightClick = () => {
		if (selectionData.length === 0) return; // Add guard clause
		const newIndex = (currentIndex + 1) % selectionData.length;
		setCurrentIndex(newIndex);
		// Use storyChapterId from the new item structure
		handleSelectChapter(selectionData[newIndex]?.storyChapterId ?? "");
	};

	const getDotColor = (index: number) => {
		const visibleDots = 5; // Assuming always 5 dots displayed
		const middleIndex = Math.floor(visibleDots / 2);

		if (selectionData.length === 0) return "bg-[#4d4d48]"; // Default if no data

		// Logic to determine active dot based on currentIndex relative to displayed dots
		if (currentIndex === 0 && index === 0) return "bg-warmGrey";
		if (currentIndex === 1 && index === 1) return "bg-warmGrey";
		if (currentIndex === selectionData.length - 1 && index === visibleDots - 1)
			return "bg-warmGrey";
		if (currentIndex === selectionData.length - 2 && index === visibleDots - 2)
			return "bg-warmGrey";
		if (
			index === middleIndex &&
			currentIndex > 1 &&
			currentIndex < selectionData.length - 2
		)
			return "bg-warmGrey";

		return "bg-[#4d4d48]"; // Inactive dot color
	};

	// Add a check for empty selectionData to avoid rendering issues
	if (selectionData.length === 0) {
		return null; // Or render a placeholder/message
	}

	return (
		<motion.div
			className="h-full my-6 mx-5 flex md:hidden justify-center items-center text-center"
			initial="hidden"
			animate="visible"
			variants={downToUpVariants}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				initial="hidden"
				animate="visible"
				variants={upToDownVariants}
				transition={{ duration: 0.5 }}
				className="absolute h-full top-[6em] right-3 sm:bottom-[46em] z-30"
			>
				<ChapterSelectionMobileMenuButton
					placeName={placeName}
					selectionData={selectionData}
					selectedButtonRef={selectedButtonRef}
					handleSelectChapter={handleSelectChapter}
				/>
			</motion.div>

			<div
				ref={containerRef}
				className="flex w-full items-center justify-between"
			>
				<button
					type="button"
					className="flex-shrink-0 animate-fadeIn"
					onClick={handleLeftClick}
					aria-label="Previous Chapter"
				>
					<Image
						src="/image/about/left.svg"
						alt="left arrow"
						width={20}
						height={20}
						priority
					/>
				</button>
				<div className="flex justify-center items-center space-x-2 mx-auto">
					{/* Map to create dots, use touristSpotId for key */}
					{[...Array(Math.min(5, selectionData.length))].map((_, dotIndex) => (
						<div
							// Key needs to be stable and unique. Using index if touristSpotId isn't reliable here.
							// If the 5 dots represent a sliding window, the key logic needs review.
							// biome-ignore lint/suspicious/noArrayIndexKey: Using index for fixed-position visual dots is acceptable here.
							key={dotIndex} // Using dotIndex as key for the visible dots
							className={`h-2 w-2 rounded-full ${getDotColor(dotIndex)} transition-colors duration-300`}
						/>
					))}
				</div>
				<button
					type="button"
					className="flex-shrink-0 animate-fadeIn"
					onClick={handleRightClick}
					aria-label="Next Chapter"
				>
					<Image
						src="/image/about/right.svg"
						alt="right arrow"
						width={20}
						height={20}
						priority
					/>
				</button>
			</div>
		</motion.div>
	);
};

export default ChapterSelectionMobileComponent;
