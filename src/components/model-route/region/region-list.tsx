import type React from "react";
import { getModelRoutes } from "@/hooks/routes/getModelRoutes";
import Region from "./region";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";

interface RegionListProps {
	placeholder?: string;
}

const RegionList: React.FC<RegionListProps> = (props) => {
	const { modelRoutes, isLoadingModelRoutes, isErrorModelRoutes } =
		getModelRoutes();

	if (isLoadingModelRoutes) return <p>Loading regions...</p>;
	if (isErrorModelRoutes) return <p>Error loading regions.</p>;

	return (
		<div>
			{modelRoutes?.map((route: ModelRouteResponseDto) => (
				<Region key={route.modelRouteId} {...route} />
			))}
		</div>
	);
};

export default RegionList;
