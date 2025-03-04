import type React from "react";
import { useState } from "react";
import type { ChapterSelectionProps } from "@/types/story-type";
import ChapterSelectionMobileModal from "./chapter-selection-mobile-modal";

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
				className="relative flex items-center justify-center w-12 h-fit border-2 border-red rounded-full hover:bg-red group transition-all duration-300 cursor-pointer"
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

			<div className="sm:pt-2">
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
