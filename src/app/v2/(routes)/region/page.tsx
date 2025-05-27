"use client";
import { ApiError } from "@/lib/errors";
import Loading from "@/app/loading";
import { getModelRoutes } from "@/hooks/routes/getModelRoutes";
import {
	selectRoutes,
	setRoutes,
	setSelectedRoute,
} from "@/lib/redux/features/routes/routes-slice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useAppSelector } from "@/lib/redux/hooks";
import { logger } from "@/utils/logger";
import type { NextPage } from "next";
import { useEffect } from "react";
import TouriiError from "@/app/error";

const RegionPage: NextPage = () => {
	const dispatch = useAppDispatch();
	const { selectedRoute } = useAppSelector(selectRoutes);
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

	const handleSelectRoute = (routeId: string) => {
		dispatch(setSelectedRoute(routeId));
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

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-warmGrey3">
			<h1 className="text-4xl font-bold">{selectedRoute.region}</h1>
			<br />
			<br />
			<video src={selectedRoute.regionBackgroundMedia} autoPlay muted loop />
			<br />
			<br />
			{selectedRoute.regionWeatherInfo.temperatureCelsius}
			<br />
			{selectedRoute.regionWeatherInfo.weatherName}
			<br />
		</div>
	);
};

export default RegionPage;
