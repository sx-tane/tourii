import type { RegionSelection } from "@/app/v2/(routes)/types";
import { memo, useCallback } from "react";

export interface RegionSelectionButtonProps {
	selection: RegionSelection;
	onSelect: (selectedRegion: string) => void;
}

const RegionSelectionButton: React.FC<RegionSelectionButtonProps> = memo(
	({ selection, onSelect }) => {
		const handleClick = useCallback(() => {
			onSelect(selection.region);
		}, [onSelect, selection.region]);

		return (
			<button
				type="button"
				onClick={handleClick}
				className={`relative z-10 h-24 md:h-28 w-80 md:w-96 2xl:w-full text-xl rounded-lg font-bold uppercase tracking-widest text-charcoal lg:text-2xl transition-all duration-300 ${selection.isSelected ? "bg-red text-warmGrey" : "bg-warmGrey3 hover:bg-warmGrey2"}`}
			>
				<div
					className={`absolute left-6 top-4 font-semibold capitalize italic lg:text-lg transition-colors duration-300 ${selection.isSelected ? "text-warmGrey" : "text-charcoal"}`}
				>
					{selection.region}
				</div>
				<div
					className={`absolute bottom-4 right-6 text-sm font-semibold capitalize italic tracking-widest transition-colors duration-300 ${selection.isSelected ? "text-warmGrey" : "text-charcoal"}`}
				>
					{selection.routeCount} Routes
				</div>
			</button>
		);
	},
);

RegionSelectionButton.displayName = "RegionSelectionButton";

export default RegionSelectionButton;

// )}
// {selection.chapterNumber ? (
// <div
// className={`
