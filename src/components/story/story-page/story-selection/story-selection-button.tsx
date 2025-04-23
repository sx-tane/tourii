import type { StorySelectionButtonProps } from "@/app/v2/(stories)/types";

const StorySelectionButton: React.FC<StorySelectionButtonProps> = ({
	selection,
	onSelect,
}) => {
	return (
		<button
			type="button"
			onClick={() => onSelect(selection.selectedStoryId ?? "")}
			className={`relative z-10 h-24 md:h-28 w-80 md:w-96 2xl:w-full text-xl rounded-lg font-bold uppercase tracking-widest text-charcoal lg:text-2xl ${selection.isSelected ? "bg-warmGrey3 text-warmGrey" : "bg-warmGrey hover:bg-warmGrey2"}`}
		>
			{selection.title !== "Coming Soon" ? (
				<div className="absolute left-6 top-4">{selection.title}</div>
			) : (
				<div
					className={`absolute left-6 top-4 font-semibold capitalize italic lg:text-lg ${selection.isSelected ? "text-warmGrey" : "text-warmGrey3"}`}
				>
					{selection.title}
				</div>
			)}
			{selection.chapterNumber ? (
				<div
					className={`absolute bottom-4 right-6 text-sm font-semibold capitalize italic tracking-widest ${selection.isSelected ? "text-warmGrey" : "text-charcoal"}`}
				>
					{selection.chapterNumber} Chapters
				</div>
			) : null}
		</button>
	);
};

export default StorySelectionButton;

