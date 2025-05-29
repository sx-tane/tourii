"use client";
import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import type { RegionSelection } from "@/app/v2/(routes)/types";
import RegionComponent from "@/components/model-route/region/region-component";
import RegionSelectionList from "@/components/model-route/region/region-selection-list";
import { getModelRoutes } from "@/hooks/routes/getModelRoutes";
import { ApiError } from "@/lib/errors";
import {
	selectRoutes,
	setRoutes,
	setSelectedRouteByRegion,
} from "@/lib/redux/features/routes/routes-slice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useAppSelector } from "@/lib/redux/hooks";
import { logger } from "@/utils/logger";
import type { NextPage } from "next";
import { useEffect } from "react";
const RegionPage: NextPage = () => {
	const dispatch = useAppDispatch();
	const { selectedRoute, selectionData } = useAppSelector(selectRoutes);
	const {
		modelRoutes,
		isLoadingModelRoutes,
		isErrorModelRoutes,
		mutateModelRoutes,
	} = getModelRoutes();

	useEffect(() => {
		if (modelRoutes !== undefined) {
			dispatch(setRoutes(modelRoutes));
		}
	}, [modelRoutes, dispatch]);

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

		if (isErrorModelRoutes instanceof ApiError) {
			errorMessage = isErrorModelRoutes.message;
			errorStatus = isErrorModelRoutes.status;
			logger.error("API Error loading model routes:", {
				status: isErrorModelRoutes.status,
				message: isErrorModelRoutes.message,
				context: isErrorModelRoutes.context,
			});
		} else if (isErrorModelRoutes instanceof Error) {
			errorMessage = isErrorModelRoutes.message;
		} else {
			logger.error("Unknown error loading model routes:", {
				isErrorModelRoutes,
			});
		}

		return (
			<TouriiError
				errorMessage={errorMessage}
				status={errorStatus}
				onRetry={mutateModelRoutes}
			/>
		);
	}

	if (
		!selectedRoute &&
		!isLoadingModelRoutes &&
		modelRoutes &&
		modelRoutes.length > 0
	) {
		return <Loading />;
	}

	if (!selectedRoute) {
		logger.warn("RegionPage rendered without a selected route.");
		return <div>Please select a route.</div>;
	}

	const modelRouteCount = selectionData.filter(
		(selection) => selection.region === selectedRoute.region,
	).length;

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-warmGrey3">
			<div className="flex flex-col items-center justify-center h-full">
				<RegionComponent region={selectedRoute} />
				<RegionSelectionList
					selectionData={selectionData}
					modelRouteCount={modelRouteCount}
					onSelect={handleSelectRoute}
				/>
			</div>
		</div>
	);
};

export default RegionPage;
