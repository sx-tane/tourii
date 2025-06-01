import type { RegionSelection } from "@/app/v2/(routes)/types";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";
import type React from "react";
import { memo } from "react";
import { RegionSelectionButton } from "@/components/model-route/region";

export interface RegionSelectionListProps {
	selectionData: RegionSelection[];
	onSelect: (selectedRegion: string) => void;
}

const RegionSelectionList: React.FC<RegionSelectionListProps> = memo(
	({ selectionData, onSelect }) => {
		return (
			<div className="item-center mt-2 flex w-full overflow-x-auto md:w-11/12 justify-start gap-1 scrollbar-hide">
				{selectionData.map((selection, index) => (
					<motion.div
						key={selection.region}
						variants={downToUpVariants}
						initial="hidden"
						animate="visible"
						transition={{
							duration: 0.6,
							delay: index * 0.1,
							ease: "easeOut",
						}}
						className={`md:w-full ${index === 0 ? "sticky" : ""}`} // Sticky first button
					>
						<RegionSelectionButton selection={selection} onSelect={onSelect} />
					</motion.div>
				))}
			</div>
		);
	},
);

RegionSelectionList.displayName = "RegionSelectionList";

export default RegionSelectionList;
