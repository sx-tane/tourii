"use client";
import ModelRouteSelectionCard from "@/components/model-route/model-route-selection-card";
import { modelRouteSelectionData } from "@/lib/data/model-route/model-route-selection-data";
import type { NextPage } from "next";

const ModelRoute: NextPage = () => {
	return (
		<div className="flex h-[90vh] items-center justify-center overflow-hidden py-20">
			<div className="grid grid-cols-2 gap-4">
				{modelRouteSelectionData?.map((modelRoute) => (
					<ModelRouteSelectionCard
						key={modelRoute.areaId}
						modelRouteSelection={modelRoute}
					/>
				))}
			</div>
		</div>
	);
};

export default ModelRoute;
