import type React from "react";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";

// Make RegionProps an alias for ModelRouteResponseDto or select specific props
// For now, let's assume it takes the whole DTO. Adjust as needed.
export type RegionProps = ModelRouteResponseDto;

const Region: React.FC<RegionProps> = (props) => {
	const { routeName, region, regionBackgroundMedia } = props;
	return (
		<div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
			<h2>{routeName}</h2>
			<p>Region: {region}</p>
			{regionBackgroundMedia && (
				<img
					src={regionBackgroundMedia}
					alt={routeName}
					style={{ maxWidth: "200px", maxHeight: "150px" }}
				/>
			)}
			{/* Display other relevant info from props */}
		</div>
	);
};

export default Region;
