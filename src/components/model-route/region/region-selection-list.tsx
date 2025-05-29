import type { RegionSelection } from "@/app/v2/(routes)/types";
import RegionSelectionButton from "./region-selection-button";

export interface RegionSelectionListProps {
	selectionData: RegionSelection[];
	modelRouteCount: number;
	onSelect: (selectedRegion: string) => void;
}

const RegionSelectionList: React.FC<RegionSelectionListProps> = ({
	selectionData,
	modelRouteCount,
	onSelect,
}) => {
	return (
		<div className="item-center mt-2 flex w-full overflow-x-auto md:w-11/12 justify-start gap-1 scrollbar-hide">
			{selectionData.map((selection, index) => (
				<RegionSelectionButton
					key={selection.region}
					selection={selection}
					modelRouteCount={modelRouteCount}
					onSelect={onSelect}
				/>
			))}
		</div>
	);
};

export default RegionSelectionList;
