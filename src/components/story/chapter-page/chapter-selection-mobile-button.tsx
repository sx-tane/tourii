import type { ChapterSelectionButtonProps } from "@/types/story-type";
import { forwardRef } from "react";

const ChapterSelectionMobileButton = forwardRef<
	HTMLDivElement,
	ChapterSelectionButtonProps
>(({ selection, onSelect }, ref) => {
	return (
		<div ref={ref} className="relative flex flex-col items-center py-5">
			<div
				className={`relative bottom-2 flex flex-col items-center h-0.5 w-[4.8em] ${selection.isSelected ? "bg-white" : "hidden"}`}
			/>
			<button
				type="button"
				onClick={() => onSelect(selection.selectedChapterId ?? "")}
				className={`text-warmGrey3 w-48 ${selection.isSelected ? "text-white" : "text-warmGrey3"}`}
			>
				<div className="font-bold text-xs uppercase tracking-wider">
					{selection.chapter}
				</div>

				<div className="relative top-1 italic text-xs font-medium">
					{selection.placeName}
				</div>
			</button>
		</div>
	);
});

export default ChapterSelectionMobileButton;
