import type { RegionSelection } from "@/app/v2/(routes)/types";

export interface RegionSelectionButtonProps {
	selection: RegionSelection;
	modelRouteCount: number;
	onSelect: (selectedRegion: string) => void;
}

const RegionSelectionButton: React.FC<RegionSelectionButtonProps> = ({
	selection,
	onSelect,
	modelRouteCount,
}) => {
	return (
		<button
			type="button"
			onClick={() => onSelect(selection.region)}
			className={`relative z-10 h-24 md:h-28 w-80 md:w-96 2xl:w-full text-xl rounded-lg font-bold uppercase tracking-widest text-charcoal  lg:text-2xl ${selection.isSelected ? "bg-red text-charcoal" : "bg-warmGrey2 text-charcoal"}`}
		>
			<div
				className={`absolute left-6 top-4 font-semibold capitalize italic lg:text-lg  text-charcoal ${selection.isSelected ? "text-warmGrey" : "text-charcoal"}`}
			>
				{selection.region}
			</div>
			<div
				className={`absolute bottom-4 right-6 text-sm font-semibold capitalize italic tracking-widest ${selection.isSelected ? "text-warmGrey" : "text-charcoal"}`}
			>
				{modelRouteCount} Routes
			</div>
		</button>
	);
};

export default RegionSelectionButton;

// )}
// {selection.chapterNumber ? (
// <div
// className={`absolute bottom-4 right-6 text-sm font-semibold capitalize italic tracking-widest ${selection.isSelected ? "text-warmGrey" : "text-charcoal"}`}
// >
// {selection.chapterNumber} Chapters
// </div>
