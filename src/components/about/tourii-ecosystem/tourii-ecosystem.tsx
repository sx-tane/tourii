import { descriptionData } from "@/lib/data/about/description-data";
import type React from "react";
import { DescriptionWithImage } from "../description";
import ExperienceButton from "./experience-modal/experience-button";

const TouriiEcosystem: React.FC = () => {
	return (
		<div>
			<DescriptionWithImage {...descriptionData[3]} />
			<ExperienceButton />
		</div>
	);
};

export default TouriiEcosystem;
