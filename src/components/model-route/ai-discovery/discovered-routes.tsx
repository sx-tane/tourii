"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
	Sparkles, 
	Clock, 
	MapPin, 
	TrendingUp, 
	RefreshCw,
	Grid3X3,
	List,
	Filter
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { DiscoveredRoutesProps } from "./types";
import { RouteDiscoveryCard } from "./route-discovery-card";
import { RouteCardSkeleton } from "./loading-states";

type ViewMode = "grid" | "list";
type SortMode = "relevance" | "duration" | "distance" | "spots";

export function DiscoveredRoutes({
	routes,
	isLoading = false,
	summary,
	onRouteSelect,
	className,
}: DiscoveredRoutesProps) {
	const [viewMode, setViewMode] = useState<ViewMode>("grid");
	const [sortMode, setSortMode] = useState<SortMode>("relevance");

	// Sort routes based on selected mode
	const sortedRoutes = [...routes].sort((a, b) => {
		switch (sortMode) {
			case "duration":
				return a.estimatedDurationMinutes - b.estimatedDurationMinutes;
			case "distance":
				return a.totalDistanceKm - b.totalDistanceKm;
			case "spots":
				return b.touristSpots.length - a.touristSpots.length;
			case "relevance":
			default:
				return b.confidence - a.confidence;
		}
	});

	if (isLoading) {
		return (
			<div className={cn("space-y-6", className)}>
				<div className="text-center">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-warmGrey-100 rounded-full">
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
						>
							<Sparkles className="h-4 w-4 text-red" />
						</motion.div>
						<span className="text-sm font-medium text-charcoal uppercase tracking-wide">
							Generating Routes...
						</span>
					</div>
				</div>
				<RouteCardSkeleton />
			</div>
		);
	}

	if (routes.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className={cn("text-center py-12", className)}
			>
				<div className="max-w-md mx-auto space-y-4">
					<div className="w-16 h-16 mx-auto bg-warmGrey-100 rounded-2xl flex items-center justify-center">
						<MapPin className="h-8 w-8 text-charcoal-400" />
					</div>
					<h3 className="text-lg font-bold text-charcoal">
						No Routes Found
					</h3>
					<p className="text-charcoal-600">
						Try adjusting your keywords or expanding your search area to discover more routes.
					</p>
				</div>
			</motion.div>
		);
	}

	return (
		<div className={cn("space-y-6", className)}>
			{/* Results Header */}
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
			>
				{/* Summary Stats */}
				<div className="space-y-2">
					<h2 className="text-xl font-bold text-charcoal flex items-center gap-2">
						<Sparkles className="h-5 w-5 text-red" />
						AI-Discovered Routes
					</h2>
					
					{summary && (
						<div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-600">
							<div className="flex items-center gap-1">
								<TrendingUp className="h-4 w-4" />
								<span>{routes.length} routes generated</span>
							</div>
							<div className="flex items-center gap-1">
								<MapPin className="h-4 w-4" />
								<span>{summary.totalSpotsFound} spots found</span>
							</div>
							<div className="flex items-center gap-1">
								<Clock className="h-4 w-4" />
								<span>{(summary.processingTimeMs / 1000).toFixed(1)}s processing</span>
							</div>
							{summary.aiAvailable && (
								<div className="flex items-center gap-1 text-green-600">
									<Sparkles className="h-4 w-4" />
									<span className="font-medium">AI Enhanced</span>
								</div>
							)}
						</div>
					)}
				</div>

				{/* View Controls */}
				<div className="flex items-center gap-2">
					{/* Sort Dropdown */}
					<div className="relative">
						<select
							value={sortMode}
							onChange={(e) => setSortMode(e.target.value as SortMode)}
							className={cn(
								"px-3 py-2 rounded-lg border border-charcoal-200 bg-warmGrey-50",
								"text-sm text-charcoal focus:border-red focus:ring-2 focus:ring-red/20",
								"transition-all duration-200 appearance-none pr-8"
							)}
						>
							<option value="relevance">Most Relevant</option>
							<option value="duration">Shortest Duration</option>
							<option value="distance">Shortest Distance</option>
							<option value="spots">Most Spots</option>
						</select>
						<Filter className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400 pointer-events-none" />
					</div>

					{/* View Mode Toggle */}
					<div className="flex bg-warmGrey-100 rounded-lg p-1">
						<button
							onClick={() => setViewMode("grid")}
							className={cn(
								"p-2 rounded-md transition-all duration-200",
								viewMode === "grid"
									? "bg-red text-warmGrey-50 shadow-sm"
									: "text-charcoal-600 hover:text-charcoal"
							)}
							type="button"
						>
							<Grid3X3 className="h-4 w-4" />
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={cn(
								"p-2 rounded-md transition-all duration-200",
								viewMode === "list"
									? "bg-red text-warmGrey-50 shadow-sm"
									: "text-charcoal-600 hover:text-charcoal"
							)}
							type="button"
						>
							<List className="h-4 w-4" />
						</button>
					</div>
				</div>
			</motion.div>

			{/* Routes Grid/List */}
			<AnimatePresence mode="wait">
				<motion.div
					key={`${viewMode}-${sortMode}`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3 }}
					className={cn(
						"grid gap-6",
						viewMode === "grid" 
							? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
							: "grid-cols-1 max-w-4xl mx-auto"
					)}
				>
					{sortedRoutes.map((route, index) => (
						<motion.div
							key={route.routeId}
							initial={{ opacity: 0, y: 20, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ 
								duration: 0.3, 
								delay: index * 0.1,
								type: "spring",
								stiffness: 300,
								damping: 25
							}}
						>
							<RouteDiscoveryCard
								route={route}
								onSelect={() => onRouteSelect?.(route)}
								className={cn(
									viewMode === "list" && "flex-row max-h-48"
								)}
							/>
						</motion.div>
					))}
				</motion.div>
			</AnimatePresence>

			{/* Load More / Pagination (Future Enhancement) */}
			{routes.length >= 5 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="text-center py-6"
				>
					<button
						className={cn(
							"inline-flex items-center gap-2 px-6 py-3 rounded-xl",
							"border border-charcoal-200 bg-warmGrey-50 text-charcoal",
							"hover:border-red hover:text-red transition-all duration-200",
							"font-medium uppercase tracking-wide text-sm"
						)}
						type="button"
					>
						<RefreshCw className="h-4 w-4" />
						Generate More Routes
					</button>
				</motion.div>
			)}

			{/* AI Attribution */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
				className="text-center py-4 border-t border-charcoal-200"
			>
				<div className="flex items-center justify-center gap-2 text-xs text-charcoal-500">
					<Sparkles className="h-3 w-3" />
					<span className="uppercase tracking-wide">
						Routes generated by AI based on your preferences
					</span>
					<Sparkles className="h-3 w-3" />
				</div>
			</motion.div>
		</div>
	);
}