
import { descriptionData } from "../../../lib/data/about/description-data";
import { DescriptionWithImages } from "../description";
import Line from "../divider-line/line";

const TouriiIdentity: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center px-6 lg:px-24">
			<div className="items-center justify-center">
				<Line />
			</div>
			<div id="tourii-identity" className="-mt-5 ">
				<DescriptionWithImages {...descriptionData[2]} />
			</div>

			<div className=" mt-5 items-center justify-center">
				<Line />
			</div>
		</div>
	);
};

export default TouriiIdentity;
