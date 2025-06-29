"use client";

import type { AiRouteRecommendationResponseDto } from "@/api/generated/models/AiRouteRecommendationResponseDto";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";

interface RouteDiscoveryProps {
	/** AI route recommendations response */
	aiRoutes?: AiRouteRecommendationResponseDto;
	/** Existing routes to display */
	existingRoutes?: ModelRouteResponseDto[];
	/** Loading state */
	isLoading?: boolean;
	/** Error state */
	error?: string;
	/** Selected region for context */
	region?: string;
	/** Selected interests for context */
	selectedInterests?: string[];
	/** Callback when user wants to regenerate */
	onRegenerate?: () => void;
}

const RouteDiscovery: React.FC<RouteDiscoveryProps> = memo(
	({
		aiRoutes,
		existingRoutes = [],
		isLoading = false,
		error,
		region,
		selectedInterests = [],
		onRegenerate,
	}) => {
		// Filter existing routes by region if specified
		const filteredExistingRoutes = useMemo(() => {
			if (!region) return existingRoutes;
			return existingRoutes.filter(
				(route) => route.region?.toLowerCase() === region.toLowerCase(),
			);
		}, [existingRoutes, region]);

		const hasResults =
			aiRoutes?.generatedRoutes?.length || filteredExistingRoutes.length;

		if (isLoading) {
			return (
				<div className="flex flex-col items-center justify-center py-20">
					<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red mb-4"></div>
					<h3 className="text-xl font-semibold text-charcoal mb-2">
						Discovering Perfect Routes...
					</h3>
					<p className="text-charcoal/70 text-center max-w-md">
						Our AI is analyzing{" "}
						{selectedInterests.length > 0
							? `${selectedInterests.join(", ")}`
							: "your preferences"}
						{region ? ` in ${region}` : ""} to create personalized
						recommendations.
					</p>
				</div>
			);
		}

		if (error) {
			return (
				<div className="flex flex-col items-center justify-center py-20 text-center">
					<div className="w-16 h-16 bg-red/10 rounded-full flex items-center justify-center mb-4">
						<svg
							className="w-8 h-8 text-red"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-charcoal mb-2">
						Unable to Generate Routes
					</h3>
					<p className="text-charcoal/70 mb-6 max-w-md">{error}</p>
					{onRegenerate && (
						<button
							onClick={onRegenerate}
							className="px-6 py-3 bg-red text-white rounded-lg hover:bg-red/90 transition-colors"
						>
							Try Again
						</button>
					)}
				</div>
			);
		}

		if (!hasResults) {
			return (
				<div className="flex flex-col items-center justify-center py-20 text-center">
					<div className="w-16 h-16 bg-charcoal/10 rounded-full flex items-center justify-center mb-4">
						<svg
							className="w-8 h-8 text-charcoal/50"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1V8z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-charcoal mb-2">
						No Routes Found
					</h3>
					<p className="text-charcoal/70 mb-6 max-w-md">
						No routes match your criteria for {selectedInterests.join(", ")}
						{region ? ` in ${region}` : ""}. Try different interests or explore
						other regions.
					</p>
				</div>
			);
		}

		return (
			<div className="w-full max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-8"
				>
					<h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
						Your Perfect Routes in {region}
					</h1>
					<p className="text-lg text-charcoal/80 mb-4">
						Based on your interests:{" "}
						{selectedInterests.map((interest) => `#${interest}`).join(", ")}
					</p>

					{/* Summary Stats */}
					{aiRoutes?.summary && (
						<div className="flex justify-center gap-6 text-sm text-charcoal/60">
							<span>{aiRoutes.summary.totalSpotsFound} spots analyzed</span>
							<span>
								{aiRoutes.summary.routesGenerated} AI routes generated
							</span>
							<span>{filteredExistingRoutes.length} existing routes</span>
							{aiRoutes.summary.processingTimeMs && (
								<span>
									Generated in{" "}
									{(aiRoutes.summary.processingTimeMs / 1000).toFixed(1)}s
								</span>
							)}
						</div>
					)}
				</motion.div>

				<div className="space-y-12">
					{/* AI Generated Routes */}
					{aiRoutes?.generatedRoutes && aiRoutes.generatedRoutes.length > 0 && (
						<motion.section
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<div className="flex items-center gap-3 mb-6">
								<div className="w-8 h-8 bg-red rounded-full flex items-center justify-center">
									<svg
										className="w-5 h-5 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h2 className="text-2xl font-bold text-charcoal">
									✨ AI-Generated Routes Just for You
								</h2>
								<span className="bg-red text-white px-3 py-1 rounded-full text-sm font-medium">
									{aiRoutes.generatedRoutes.length} route
									{aiRoutes.generatedRoutes.length !== 1 ? "s" : ""}
								</span>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{aiRoutes.generatedRoutes.map((route, index) => (
									<RouteCard
										key={`ai-${route.modelRouteId}`}
										route={route}
										isAiGenerated={true}
										index={index}
									/>
								))}
							</div>
						</motion.section>
					)}

					{/* Existing Routes */}
					{filteredExistingRoutes.length > 0 && (
						<motion.section
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<div className="flex items-center gap-3 mb-6">
								<div className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center">
									<svg
										className="w-5 h-5 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<h2 className="text-2xl font-bold text-charcoal">
									🌟 Popular Existing Routes
								</h2>
								<span className="bg-charcoal text-white px-3 py-1 rounded-full text-sm font-medium">
									{filteredExistingRoutes.length} route
									{filteredExistingRoutes.length !== 1 ? "s" : ""}
								</span>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredExistingRoutes.map((route, index) => (
									<RouteCard
										key={`existing-${route.modelRouteId}`}
										route={route}
										isAiGenerated={false}
										index={index}
									/>
								))}
							</div>
						</motion.section>
					)}
				</div>

				{/* Regenerate Button */}
				{onRegenerate && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						className="text-center mt-12"
					>
						<button
							onClick={onRegenerate}
							className="px-8 py-3 border-2 border-red text-red rounded-lg hover:bg-red hover:text-white transition-colors font-medium"
						>
							🔄 Generate New Routes
						</button>
					</motion.div>
				)}
			</div>
		);
	},
);

// Route Card Component
interface RouteCardProps {
	route: any; // Can be either AI generated route or ModelRouteResponseDto
	isAiGenerated: boolean;
	index: number;
}

const RouteCard: React.FC<RouteCardProps> = memo(
	({ route, isAiGenerated, index }) => {
		const hasImage =
			route.regionBackgroundMedia ||
			(route.touristSpots && route.touristSpots[0]);
		const imageUrl =
			route.regionBackgroundMedia ||
			(route.touristSpots &&
				route.touristSpots[0] &&
				`/image/model-route/1/placeholder.jpg`);

		return (
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: index * 0.1 }}
				whileHover={{ scale: 1.02, y: -5 }}
				className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
			>
				{/* Route Image */}
				<div className="relative h-48">
					{hasImage ? (
						<Image
							src={imageUrl}
							alt={route.routeName}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					) : (
						<div className="w-full h-full bg-gradient-to-br from-charcoal/10 to-warmGrey2/30" />
					)}

					{/* AI Badge */}
					{isAiGenerated && (
						<div className="absolute top-3 left-3">
							<span className="bg-red text-white px-2 py-1 rounded-full text-xs font-medium">
								✨ AI Generated
							</span>
						</div>
					)}

					{/* Confidence Score for AI routes */}
					{isAiGenerated && route.confidenceScore && (
						<div className="absolute top-3 right-3">
							<span className="bg-black/50 text-white px-2 py-1 rounded text-xs">
								{Math.round(route.confidenceScore * 100)}% match
							</span>
						</div>
					)}
				</div>

				{/* Route Content */}
				<div className="p-6">
					<h3 className="text-xl font-semibold text-charcoal mb-2 line-clamp-2">
						{route.routeName}
					</h3>

					{route.regionDesc && (
						<p className="text-charcoal/70 text-sm mb-4 line-clamp-2">
							{route.regionDesc}
						</p>
					)}

					{/* Route Stats */}
					<div className="flex items-center gap-4 text-sm text-charcoal/60 mb-4">
						{(route.spotCount || route.touristSpotList?.length) && (
							<span className="flex items-center gap-1">
								📍 {route.spotCount || route.touristSpotList?.length} spots
							</span>
						)}
						{route.estimatedDuration && (
							<span className="flex items-center gap-1">
								⏱️ {route.estimatedDuration}
							</span>
						)}
					</div>

					{/* Hashtags/Recommendations */}
					{(route.recommendations || route.recommendation) && (
						<div className="flex flex-wrap gap-2 mb-4">
							{(route.recommendations || route.recommendation)
								?.slice(0, 3)
								.map((tag: string) => (
									<span
										key={tag}
										className="px-2 py-1 bg-charcoal/10 text-charcoal text-xs rounded-full"
									>
										#{tag}
									</span>
								))}
						</div>
					)}

					{/* Action Button */}
					<Link
						href={`/v2/model-route/${route.region}/${route.modelRouteId}`}
						className="block w-full text-center py-3 bg-red text-white rounded-lg hover:bg-red/90 transition-colors font-medium"
					>
						Explore Route
					</Link>
				</div>
			</motion.div>
		);
	},
);

RouteCard.displayName = "RouteCard";
RouteDiscovery.displayName = "RouteDiscovery";

export default RouteDiscovery;
