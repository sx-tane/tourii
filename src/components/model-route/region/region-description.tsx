import type React from "react";

interface RegionDescriptionProps {
	// Define your props here
	description: string;
}

const RegionDescription: React.FC<RegionDescriptionProps> = ({
	description,
}) => {
	return (
		<div>
			{/* Implement your RegionDescription component here */}
			<p>{description}</p>
		</div>
	);
};

export default RegionDescription;
