import type { ChapterSelectionButtonProps } from "@/types/story-type";
import { forwardRef } from "react";
import { usePathname } from "next/navigation";

const ChapterSelectionMobileButton = forwardRef<
	HTMLDivElement,
	ChapterSelectionButtonProps
>(({ selection, onSelect }, ref) => {
	const pathname = usePathname();
	return (
		<div ref={ref} className="relative top-10 flex flex-col items-center py-5">
			<div
				className={`relative bottom-2 flex flex-col items-center h-0.5 w-32 ${selection.isSelected ? "bg-white" : "hidden"}`}
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
