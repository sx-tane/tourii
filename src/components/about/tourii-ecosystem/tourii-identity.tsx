import type React from "react";
import { descriptionData } from "../../../lib/data/about/description-data";
import { DescriptionWithImages } from "../description";
import Line from "../divider-line/line";

const TouriiIdentity: React.FC = () => {
	return (
		<div className="items-center justify-center px-6 lg:px-24">
			<div className="w-full">
				<Line />
			</div>
			<div id="tourii-identity" className="-mt-5 ">
				<DescriptionWithImages {...descriptionData[2]} />
			</div>

			<div className=" mt-5 w-full">
				<Line />
			</div>
		</div>
	);
};

export default TouriiIdentity;
