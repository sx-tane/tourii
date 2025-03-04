import { downToUpVariants } from "@/lib/animation/variants-settings";
import type {
	ChapterSelection,
	ChapterSelectionProps,
} from "@/types/story-type";
import { motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import { useEffect, useRef } from "react";
import ChapterSelectionMobileMenuButton from "./chapter-selection-mobile-menu-button";

interface ChapterSelectionMobileComponentProps extends ChapterSelectionProps {
	currentIndex: number;
	setCurrentIndex: (index: number) => void;
}

const ChapterSelectionMobileComponent: React.FC<
	ChapterSelectionMobileComponentProps
> = ({
	selectionData,
	handleSelectChapter,
	selectedButtonRef,
	currentIndex,
	setCurrentIndex,
	placeName,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (selectedButtonRef.current && containerRef.current) {
			selectedButtonRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		}
	}, [selectedButtonRef]);

	const handleLeftClick = () => {
		const newIndex =
			(currentIndex - 1 + selectionData.length) % selectionData.length;
		setCurrentIndex(newIndex);
		handleSelectChapter(selectionData?.[newIndex]?.selectedChapterId || "");
	};

	const handleRightClick = () => {
		const newIndex = (currentIndex + 1) % selectionData.length;
		setCurrentIndex(newIndex);
		handleSelectChapter(selectionData?.[newIndex]?.selectedChapterId || "");
	};

	const getDotColor = (index: number) => {
		const visibleDots = 5;
		const middleIndex = Math.floor(visibleDots / 2);

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

		return "bg-[#4d4d48]";
	};

	return (
		<motion.div
			className="h-full my-6 mx-5 flex md:hidden justify-center items-center text-center"
			initial="hidden"
			animate="visible"
			variants={downToUpVariants}
			transition={{ duration: 0.5 }}
		>
			<div className="absolute bottom-[47em] right-5 sm:bottom-[46em] z-20">
				<ChapterSelectionMobileMenuButton
					placeName={placeName}
					selectionData={selectionData}
					selectedButtonRef={selectedButtonRef}
					handleSelectChapter={handleSelectChapter}
				/>
			</div>

			<div
				ref={containerRef}
				className="flex w-full items-center justify-between"
			>
				<button
					type="button"
					className="flex-shrink-0 animate-fadeIn"
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
				<div className="flex justify-center items-center space-x-2 mx-auto">
					{[...Array(5)].map((_, dotIndex) => (
						<div
							key={selectionData?.[dotIndex]?.selectedChapterId}
							className={`h-2 w-2 rounded-full ${getDotColor(dotIndex)}`}
						/>
					))}
				</div>
				<button
					type="button"
					className="flex-shrink-0 animate-fadeIn"
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
	);
};

export default ChapterSelectionMobileComponent;
