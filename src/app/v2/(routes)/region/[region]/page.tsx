"use client";
import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import RouteCarousel from "@/components/model-route/route-component/route-carousel/route-carousel";
import { useModelRoutes } from "@/hooks";
import { ApiError } from "@/lib/errors";
import { logger } from "@/utils/logger";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const RegionModelRoutesPage: NextPage = () => {
	const params = useParams();
	const regionName = params.region as string;

	const {
		data: modelRoutes,
		isLoading,
		isError,
		error,
		mutate,
	} = useModelRoutes();

	// Filter model routes for the specific region
	const regionModelRoutes = useMemo(() => {
		if (!modelRoutes || !regionName) return [];

		return modelRoutes.filter(
			(route) =>
				route.region?.toLowerCase() ===
				decodeURIComponent(regionName).toLowerCase(),
		);
	}, [modelRoutes, regionName]);

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		let errorMessage =
			"An unexpected error occurred while loading model routes.";
		let errorStatus: number | undefined;

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
				onRetry={mutate}
				textColor="text-charcoal"
				titleTextColor="text-red"
			/>
		);
	}

	if (!regionName) {
		return <TouriiError errorMessage="Region not specified" />;
	}

	if (regionModelRoutes.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-[90vh] text-charcoal">
				<h1 className="text-2xl font-bold mb-4">No Routes Found</h1>
				<p className="text-lg mb-8">
					No model routes available for {decodeURIComponent(regionName)}
				</p>
				<Link
					href="/v2/region"
					className="px-6 py-3 bg-primary text-charcoal rounded-lg hover:bg-primary/80 transition-colors"
				>
					Back to Regions
				</Link>
			</div>
		);
	}

	return (
		<div className="w-[95vw] mx-auto py-5">
			{/* Route Carousel */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				className="px-0 md:px-4"
			>
				<RouteCarousel routes={regionModelRoutes} className="" />
			</motion.div>
		</div>
	);
};

export default RegionModelRoutesPage;