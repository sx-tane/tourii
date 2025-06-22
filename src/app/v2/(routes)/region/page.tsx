"use client";
import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import {
	RegionComponent,
	RegionSelectionList,
} from "@/components/model-route/region";
import { useModelRoutes } from "@/hooks";
import { ApiError } from "@/lib/errors";
import {
	selectSelectedRegion,
	setSelectedRouteByRegion,
} from "@/lib/redux/features/routes/routes-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logger } from "@/utils/logger";
import type { NextPage } from "next";
import type { RegionSelection } from "@/app/v2/(routes)/types";
import { useMemo } from "react";

const RegionPage: NextPage = () => {
	const dispatch = useAppDispatch();
	const selectedRegionFromRedux = useAppSelector(selectSelectedRegion);

	// ✅ Use SWR for server data - don't duplicate in Redux
	const {
		data: modelRoutes,
		isLoading,
		isError,
		error,
		mutate: mutateModelRoutes,
	} = useModelRoutes();

	// ✅ Compute selection data from server data, store only UI state in Redux
	const regions = useMemo(() => {
		if (!modelRoutes) return [];

		const regionMap = new Map();
		for (const route of modelRoutes) {
			if (!regionMap.has(route.region)) {
				regionMap.set(route.region, {
					region: route.region,
					regionDesc: route.regionDesc,
					regionLatitude: route.regionLatitude,
					regionLongitude: route.regionLongitude,
					regionBackgroundMedia: route.regionBackgroundMedia,
					regionWeatherInfo: route.regionWeatherInfo,
					routeCount: 0,
				});
			}
			regionMap.get(route.region).routeCount++;
		}

		return Array.from(regionMap.values());
	}, [modelRoutes]);

	// ✅ Map regions to RegionSelection format with isSelected property
	const regionSelections = useMemo((): RegionSelection[] => {
		return regions.map((region) => ({
			region: region.region,
			temperatureCelsius: region.regionWeatherInfo?.temperatureCelsius,
			weatherName: region.regionWeatherInfo?.weatherName,
			routeCount: region.routeCount,
			isSelected: selectedRegionFromRedux
				? region.region === selectedRegionFromRedux
				: region === regions[0], // Default to first region
		}));
	}, [regions, selectedRegionFromRedux]);

	const handleSelectRoute = (regionName: string) => {
		dispatch(setSelectedRouteByRegion(regionName));
	};

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		let errorMessage =
			"An unexpected error occurred while loading model routes.";
		let errorStatus: number | undefined = undefined;

		if (error instanceof ApiError) {
			errorMessage = error.message;
			errorStatus = error.status;
			logger.error("API Error loading model routes:", {
				status: error.status,
				message: error.message,
				context: error.context,
			});
		} else if (error instanceof Error) {
			errorMessage = error.message;
		} else {
			logger.error("Unknown error loading model routes:", {
				error,
			});
		}

		return (
			<TouriiError
				errorMessage={errorMessage}
				status={errorStatus}
				onRetry={mutateModelRoutes}
				textColor="text-charcoal"
				titleTextColor="text-red"
			/>
		);
	}

	// Check if we have no model routes at all
	if (!isLoading && (!modelRoutes || modelRoutes.length === 0)) {
		return (
			<TouriiError
				errorMessage="No Model Routes are currently available."
				isEmpty={true}
				textColor="text-charcoal"
				titleTextColor="text-red"
			/>
		);
	}

	// Check if we have no regions
	if (regions.length === 0) {
		return (
			<TouriiError
				errorMessage="No regions are currently available."
				isEmpty={true}
				textColor="text-charcoal"
				titleTextColor="text-red"
			/>
		);
	}

	// Get the selected region for the RegionComponent
	const selectedRegion = selectedRegionFromRedux
		? regions.find((r) => r.region === selectedRegionFromRedux) || regions[0]
		: regions[0];

	return (
		<div className="h-[90vh] w-full z-20">
			<div className="flex flex-col items-center justify-center h-full">
				<RegionComponent key={selectedRegion?.region} region={selectedRegion} />
				<RegionSelectionList
					selectionData={regionSelections}
					onSelect={handleSelectRoute}
				/>
			</div>
		</div>
	);
};

export default RegionPage;
