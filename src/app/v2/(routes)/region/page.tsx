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
	selectRoutes,
	setSelectedRouteByRegion,
} from "@/lib/redux/features/routes/routes-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logger } from "@/utils/logger";
import type { NextPage } from "next";
import { useMemo } from "react";
const RegionPage: NextPage = () => {
	const dispatch = useAppDispatch();
	const { selectedRoute } = useAppSelector(selectRoutes);
	
	// ✅ Use SWR for server data - don't duplicate in Redux
	const {
		data: modelRoutes,
		isLoading: isLoadingModelRoutes,
		isError: isErrorModelRoutes,
		error,
		mutate: mutateModelRoutes,
	} = useModelRoutes();

	// ✅ Compute selection data from server data, store only UI state in Redux
	const selectionData = useMemo(() => {
		if (!modelRoutes) return [];
		
		const regionMap = new Map();
		modelRoutes.forEach(route => {
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
		});
		
		return Array.from(regionMap.values());
	}, [modelRoutes]);

	const handleSelectRoute = (regionName: string) => {
		dispatch(setSelectedRouteByRegion(regionName));
	};

	if (isLoadingModelRoutes) {
		return <Loading />;
	}

	if (isErrorModelRoutes) {
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

	if (
		!selectedRoute &&
		!isLoadingModelRoutes &&
		modelRoutes &&
		modelRoutes.length > 0
	) {
		return (
			<TouriiError
				errorMessage="No Model Route are currently available."
				isEmpty={true}
				textColor="text-charcoal"
				titleTextColor="text-red"
			/>
		);
	}

	if (!selectedRoute) {
		logger.warn("RegionPage rendered without a selected route.");
		return (
			<TouriiError
				errorMessage="No Model Route are currently available."
				isEmpty={true}
				textColor="text-charcoal"
				titleTextColor="text-red"
			/>
		);
	}

	return (
		<div className="h-[90vh] w-full z-20">
			<div className="flex flex-col items-center justify-center h-full">
				<RegionComponent key={selectedRoute.region} region={selectedRoute} />
				<RegionSelectionList
					selectionData={selectionData}
					onSelect={handleSelectRoute}
				/>
			</div>
		</div>
	);
};

export default RegionPage;
