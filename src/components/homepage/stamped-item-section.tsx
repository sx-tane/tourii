import Line from "../about/divider-line/line";
import { SectionTitle } from "../common/section-title";
import ChapterDisplay from "./chapter-display";
import { PopularQuestSection } from "./popular-quest-section";

export const StampedItemSection: React.FC = () => {
	return (
		<>
			<div className="flex flex-col items-center w-11/12 mx-auto mt-20">
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
					<div className="mt-8">
						<ChapterDisplay />
					</div>
				</div>
			</div>
			<PopularQuestSection />
		</>
	);
};
