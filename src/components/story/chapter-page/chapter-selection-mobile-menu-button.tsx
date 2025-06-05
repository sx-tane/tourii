import type React from "react";
import { useState } from "react";
import type { ChapterSelectionProps } from "@/types/story-type";
import ChapterSelectionMobileModal from "./chapter-selection-mobile-modal";
import type { ChapterSelection } from "@/types/story-type";

interface ChapterArea extends ChapterSelectionProps {
	placeName?: string;
}

const ChapterSelectionMobileMenuButton: React.FC<ChapterArea> = ({
	placeName,
	selectionData,
	selectedButtonRef,
	handleSelectChapter,
}) => {
	const [buttonClicked, setButtonClicked] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleclick = (menu: string) => {
		setButtonClicked(menu);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<button
				className="relative top-1 w-11 sm:w-12 h-fit border-2 border-red rounded-full hover:bg-red group transition-all duration-300 cursor-pointer"
				onClick={() => handleclick(" ")}
				type="button"
			>
				<div className="flex flex-col items-center space-y-2 my-4">
					{/* Red dots */}
					<div className="w-1 h-1 bg-red rounded-full group-hover:bg-warmGrey" />
					<div className="w-1 h-1 bg-red rounded-full group-hover:bg-warmGrey" />
					<div className="w-1 h-1 bg-red rounded-full group-hover:bg-warmGrey" />
				</div>
			</button>

			<div className="sm:pb-2">
				{buttonClicked && (
					<ChapterSelectionMobileModal
						isOpen={isModalOpen}
						onClose={handleCloseModal}
						placeName={placeName}
						selectionData={selectionData}
						selectedButtonRef={selectedButtonRef}
						handleSelectChapter={handleSelectChapter}
					/>
				)}
			</div>
		</>
	);
};

ChapterSelectionMobileMenuButton.displayName = "chapterSelectionMobileButton";

export default ChapterSelectionMobileMenuButton;
