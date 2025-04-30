import { motion } from "framer-motion";
import type React from "react";
import Line from "../about/divider-line/line";
import { SectionTitle } from "../common/section-title";
import ChapterDisplay from "./chapter-display";

export const StampedItemSection: React.FC = () => {
	return (
		<div className="flex flex-col items-center w-11/12 mx-auto">
			<div className="flex justify-center w-full px-5">
				<div className="w-full max-w-screen-md">
					<Line />
				</div>
			</div>
			<div className="z-20">
				<SectionTitle
					subtitle={["TOURIIVERSE"]}
					title={["THIS", "WEEK'S", "TALE"]}
				/>
				<ChapterDisplay />
			</div>
		</div>
	);
};
