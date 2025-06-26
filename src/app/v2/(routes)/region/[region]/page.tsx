"use client";
import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import RouteCarousel from "@/components/model-route/route-component/route-carousel/route-carousel";
import { AIRouteDiscovery } from "@/components/model-route/ai-discovery/ai-route-discovery";
import { useModelRoutes } from "@/hooks";
import { ApiError } from "@/lib/errors";
import { logger } from "@/utils/logger";
import { motion, AnimatePresence } from "framer-motion";
import { Route, Sparkles, Navigation, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NextPage } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

type TabType = "browse" | "discover";

const RegionModelRoutesPage: NextPage = () => {
	const params = useParams();
	const regionName = params.region as string;
	const [activeTab, setActiveTab] = useState<TabType>("browse");

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
		let errorStatus: number | undefined ;

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

	// Format region name for display
	const displayRegionName = regionName ? decodeURIComponent(regionName) : "";

	return (
		<div className="min-h-screen bg-gradient-to-br from-warmGrey-50 to-warmGrey-100">
			<div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="flex items-center justify-between"
				>
					<div className="space-y-2">
						<Link
							href="/v2/region"
							className="inline-flex items-center gap-2 text-charcoal-600 hover:text-red transition-colors text-sm font-medium uppercase tracking-wide"
						>
							<ChevronLeft className="h-4 w-4" />
							All Regions
						</Link>
						<h1 className="text-3xl md:text-4xl font-bold text-charcoal flex items-center gap-3">
							<Navigation className="h-8 w-8 text-red" />
							{displayRegionName} Routes
						</h1>
					</div>
				</motion.div>

				{/* Tab Navigation */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="flex bg-warmGrey-50 p-1.5 rounded-2xl border border-charcoal-200 w-fit"
				>
					<button
						onClick={() => setActiveTab("browse")}
						className={cn(
							"flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300",
							"uppercase tracking-wide",
							activeTab === "browse"
								? "bg-red text-warmGrey-50 shadow-lg"
								: "text-charcoal hover:text-red"
						)}
						type="button"
					>
						<Route className="h-4 w-4" />
						Browse Routes
					</button>
					<button
						onClick={() => setActiveTab("discover")}
						className={cn(
							"flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300",
							"uppercase tracking-wide",
							activeTab === "discover"
								? "bg-red text-warmGrey-50 shadow-lg"
								: "text-charcoal hover:text-red"
						)}
						type="button"
					>
						<Sparkles className="h-4 w-4" />
						Discover Routes
					</button>
				</motion.div>

				{/* Tab Content */}
				<AnimatePresence mode="wait">
					{activeTab === "browse" && (
						<motion.div
							key="browse"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.3 }}
						>
							{regionModelRoutes.length === 0 ? (
								<div className="flex flex-col items-center justify-center py-20 text-charcoal">
									<div className="w-16 h-16 mx-auto mb-6 bg-warmGrey-100 rounded-2xl flex items-center justify-center">
										<Route className="h-8 w-8 text-charcoal-400" />
									</div>
									<h2 className="text-2xl font-bold mb-4">No Routes Found</h2>
									<p className="text-lg mb-8 text-center max-w-md">
										No curated routes available for {displayRegionName}. 
										Try discovering new routes with AI!
									</p>
									<div className="flex gap-4">
										<button
											onClick={() => setActiveTab("discover")}
											className="flex items-center gap-2 px-6 py-3 bg-red text-warmGrey-50 rounded-lg hover:bg-red/90 transition-colors font-medium uppercase tracking-wide"
											type="button"
										>
											<Sparkles className="h-4 w-4" />
											Discover Routes
										</button>
										<Link
											href="/v2/region"
											className="px-6 py-3 border border-charcoal-200 text-charcoal rounded-lg hover:border-red hover:text-red transition-colors font-medium uppercase tracking-wide"
										>
											Back to Regions
										</Link>
									</div>
								</div>
							) : (
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5 }}
								>
									<RouteCarousel routes={regionModelRoutes} className="" />
								</motion.div>
							)}
						</motion.div>
					)}

					{activeTab === "discover" && (
						<motion.div
							key="discover"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							transition={{ duration: 0.3 }}
						>
							<AIRouteDiscovery
								region={displayRegionName}
								onRoutesGenerated={(routes) => {
									console.log(`Generated ${routes.length} routes for ${displayRegionName}`);
								}}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default RegionModelRoutesPage;
