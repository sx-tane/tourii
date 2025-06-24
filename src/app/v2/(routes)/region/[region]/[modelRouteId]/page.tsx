"use client";
import { ApiError } from "@/api/generated";
import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import ModelRouteIntro from "@/components/model-route/route-details/model-route-intro";
import ModelRouteMapWrapper from "@/components/model-route/route-details/model-route-map-wrapper/model-route-map-wrapper";
import RouteDestination from "@/components/model-route/route-details/route-destination";
import { useModelRouteById } from "@/hooks";
import { logger } from "@/utils/logger";
import { useParams } from "next/navigation";

const RegionRoutesPage = () => {
	const { region, modelRouteId } = useParams<{
		region: string;
		modelRouteId: string;
	}>();

	const {
		modelRoute,
		isLoading: isLoadingModelRoute,
		isError: isErrorModelRoute,
		mutate: mutateModelRoute,
		error,
	} = useModelRouteById(modelRouteId);

	if (isLoadingModelRoute) {
		return <Loading />;
	}

	if (isErrorModelRoute) {
		let errorMessage = "Failed to load model route.";
		let errorStatus: number | undefined;

		if (error instanceof ApiError) {
			errorMessage = error.message;
			errorStatus = error.status;
			logger.error("API Error loading model route:", {
				status: error.status,
				message: error.message,
			});
		}
		return (
			<TouriiError
				errorMessage={errorMessage}
				status={errorStatus}
				onRetry={mutateModelRoute}
				textColor="text-charcoal"
				titleTextColor="text-red"
			/>
		);
	}

	if (!modelRoute) {
		return (
			<TouriiError
				errorMessage="Model route not found."
				textColor="text-charcoal"
				titleTextColor="text-red"
			/>
		);
	}

	if (!region) {
		return (
			<TouriiError
				errorMessage="Region not specified"
				textColor="text-charcoal"
				titleTextColor="text-red"
			/>
		);
	}

	return (
		<div className="absolute md:-right-0 mt-5 md:mt-10 md:w-[95vw] w-screen animate-fadeIn md:space-y-2 space-y-3">
			<ModelRouteIntro modelRoute={modelRoute} />
			<RouteDestination touristSpotList={modelRoute.touristSpotList} />
			<ModelRouteMapWrapper modelRoute={modelRoute} className="h-full" />
		</div>
	);
};

export default RegionRoutesPage;
