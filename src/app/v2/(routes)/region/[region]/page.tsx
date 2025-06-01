"use client";
import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { getModelRoutes } from "@/hooks/routes/getModelRoutes";
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
		modelRoutes,
		isLoadingModelRoutes,
		isErrorModelRoutes,
		mutateModelRoutes,
	} = getModelRoutes();

	// Filter model routes for the specific region
	const regionModelRoutes = useMemo(() => {
		if (!modelRoutes || !regionName) return [];

		return modelRoutes.filter(
			(route) =>
				route.region?.toLowerCase() ===
				decodeURIComponent(regionName).toLowerCase(),
		);
	}, [modelRoutes, regionName]);

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

	if (!regionName) {
		return <TouriiError errorMessage="Region not specified" />;
	}

	if (regionModelRoutes.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-[90vh] text-warmGrey">
				<h1 className="text-2xl font-bold mb-4">No Routes Found</h1>
				<p className="text-lg mb-8">
					No model routes available for {decodeURIComponent(regionName)}
				</p>
				<Link
					href="/v2/region"
					className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
				>
					Back to Regions
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-[90vh] w-full px-4 py-8">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-8"
				>
					<h1 className="text-4xl font-bold text-warmGrey mb-2">
						{decodeURIComponent(regionName)}
					</h1>
					<p className="text-lg text-warmGrey/80">
						{regionModelRoutes.length} model route
						{regionModelRoutes.length !== 1 ? "s" : ""} available
					</p>
				</motion.div>

				{/* Model Routes Grid */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{regionModelRoutes.map((route, index) => (
						<ModelRouteCard
							key={route.modelRouteId}
							route={route}
							regionName={regionName}
							index={index}
						/>
					))}
				</motion.div>

				{/* Back to Regions */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-12 text-center"
				>
					<Link
						href="/v2/region"
						className="inline-flex items-center px-6 py-3 text-charcoal border border-warmGrey/30 rounded-lg hover:bg-warmGrey/10 transition-colors"
					>
						← Back to All Regions
					</Link>
				</motion.div>
			</div>
		</div>
	);
};

// Model Route Card Component
interface ModelRouteCardProps {
	route: ModelRouteResponseDto;
	regionName: string;
	index: number;
}

const ModelRouteCard: React.FC<ModelRouteCardProps> = ({
	route,
	regionName,
	index,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.1 * index }}
			className="group"
		>
			<Link href={`/v2/region/${regionName}/${route.modelRouteId}`}>
				<div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105 overflow-hidden">
					{/* Route Image/Background */}
					{route.regionBackgroundMedia ? (
						<div className="h-48 bg-gradient-to-br from-charcoal to-warmGrey2 relative overflow-hidden">
							{route.regionBackgroundMedia.endsWith(".mp4") ? (
								<video
									src={route.regionBackgroundMedia}
									className="w-full h-full object-cover"
									muted
									loop
									playsInline
								/>
							) : (
								<img
									src={route.regionBackgroundMedia}
									alt={route.routeName || route.region || ""}
									className="w-full h-full object-cover"
								/>
							)}
							<div className="absolute inset-0 bg-black/30" />
						</div>
					) : (
						<div className="h-48 bg-gradient-to-br from-charcoal to-warmGrey2" />
					)}

					{/* Route Content */}
					<div className="p-6">
						<h3 className="text-xl font-semibold text-charcoal mb-2">
							{route.routeName || "Untitled Route"}
						</h3>

						{route.regionWeatherInfo && (
							<div className="flex items-center justify-between text-sm text-warmGrey mb-4">
								<span>{route.regionWeatherInfo.weatherDesc}</span>
								<span>
									{Math.ceil(route.regionWeatherInfo.temperatureCelsius || 0)}°C
								</span>
							</div>
						)}

						<div className="text-right">
							<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
								Explore Route →
							</span>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default RegionModelRoutesPage;
