"use client";
import { ApiError } from "@/api/generated";
import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import ModelRouteIntro from "@/components/model-route/route-details/model-route-intro";
import RouteDestination from "@/components/model-route/route-details/route-destination";
import { getModelRouteById } from "@/hooks/routes/getModelRouteById";
import { logger } from "@/utils/logger";
import { useParams } from "next/navigation";

const RegionRoutesPage = () => {
	const { region, modelRouteId } = useParams<{
		region: string;
		modelRouteId: string;
	}>();

	const {
		modelRoute,
		isLoadingModelRoute,
		isErrorModelRoute,
		mutateModelRoute,
	} = getModelRouteById(modelRouteId);

	if (isLoadingModelRoute) {
		return <Loading />;
	}

	if (isErrorModelRoute) {
		let errorMessage = "Failed to load model route.";
		let errorStatus: number | undefined = undefined;

		if (isErrorModelRoute instanceof ApiError) {
			errorMessage = isErrorModelRoute.message;
			errorStatus = isErrorModelRoute.status;
			logger.error("API Error loading model route:", {
				status: isErrorModelRoute.status,
				message: isErrorModelRoute.message,
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
		</div>
	);
};

export default RegionRoutesPage;
