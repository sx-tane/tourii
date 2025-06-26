"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Settings2, MapPin, Users, Route } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchFiltersProps } from "./types";

export function SearchFilters({
	filters,
	onFiltersChange,
	isAdvancedOpen,
	onAdvancedToggle,
	disabled = false,
	className,
}: SearchFiltersProps) {
	const handleFilterChange = (key: keyof typeof filters, value: any) => {
		onFiltersChange({
			...filters,
			[key]: value,
		});
	};

	return (
		<div className={cn("w-full space-y-4", className)}>
			{/* Basic Filters Row */}
			<div className="flex flex-wrap items-center gap-4">
				{/* Search Mode Toggle */}
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium text-charcoal-600 uppercase tracking-wide">
						Match:
					</span>
					<div className="flex bg-warmGrey-100 rounded-lg p-1">
						<button
							onClick={() => handleFilterChange("mode", "any")}
							disabled={disabled}
							className={cn(
								"px-3 py-1.5 text-sm rounded-md transition-all duration-200",
								"uppercase tracking-wide font-medium",
								filters.mode === "any"
									? "bg-red text-warmGrey-50 shadow-sm"
									: "text-charcoal-600 hover:text-charcoal",
								disabled && "opacity-50 cursor-not-allowed"
							)}
							type="button"
						>
							Any
						</button>
						<button
							onClick={() => handleFilterChange("mode", "all")}
							disabled={disabled}
							className={cn(
								"px-3 py-1.5 text-sm rounded-md transition-all duration-200",
								"uppercase tracking-wide font-medium",
								filters.mode === "all"
									? "bg-red text-warmGrey-50 shadow-sm"
									: "text-charcoal-600 hover:text-charcoal",
								disabled && "opacity-50 cursor-not-allowed"
							)}
							type="button"
						>
							All
						</button>
					</div>
				</div>

				{/* Quick Distance Presets */}
				<div className="flex items-center gap-2">
					<MapPin className="h-4 w-4 text-charcoal-400" />
					<span className="text-sm font-medium text-charcoal-600 uppercase tracking-wide">
						Range:
					</span>
					<div className="flex gap-1">
						{[25, 50, 100].map((distance) => (
							<button
								key={distance}
								onClick={() => handleFilterChange("proximityRadiusKm", distance)}
								disabled={disabled}
								className={cn(
									"px-3 py-1.5 text-sm rounded-lg transition-all duration-200",
									"border border-charcoal-200 uppercase tracking-wide font-medium",
									filters.proximityRadiusKm === distance
										? "bg-red text-warmGrey-50 border-red"
										: "bg-warmGrey-50 text-charcoal hover:border-red hover:text-red",
									disabled && "opacity-50 cursor-not-allowed"
								)}
								type="button"
							>
								{distance}km
							</button>
						))}
					</div>
				</div>

				{/* Advanced Toggle Button */}
				<button
					onClick={onAdvancedToggle}
					disabled={disabled}
					className={cn(
						"flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
						"border border-charcoal-200 text-charcoal hover:border-red hover:text-red",
						"text-sm font-medium uppercase tracking-wide",
						isAdvancedOpen && "bg-red text-warmGrey-50 border-red",
						disabled && "opacity-50 cursor-not-allowed"
					)}
					type="button"
				>
					<Settings2 className="h-4 w-4" />
					Advanced
					<motion.div
						animate={{ rotate: isAdvancedOpen ? 180 : 0 }}
						transition={{ duration: 0.2 }}
					>
						<ChevronDown className="h-4 w-4" />
					</motion.div>
				</button>
			</div>

			{/* Advanced Filters Panel */}
			<AnimatePresence>
				{isAdvancedOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0, y: -10 }}
						animate={{ opacity: 1, height: "auto", y: 0 }}
						exit={{ opacity: 0, height: 0, y: -10 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="overflow-hidden"
					>
						<div className="p-4 bg-warmGrey-50 rounded-xl border border-charcoal-200 space-y-4">
							<div className="flex items-center gap-2 mb-3">
								<Settings2 className="h-4 w-4 text-charcoal-600" />
								<span className="text-sm font-medium text-charcoal-600 uppercase tracking-wide">
									Advanced Settings
								</span>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								{/* Custom Distance Slider */}
								<div className="space-y-2">
									<label className="flex items-center gap-2 text-xs font-medium text-charcoal-600 uppercase tracking-wide">
										<MapPin className="h-3 w-3" />
										Search Radius
									</label>
									<div className="space-y-2">
										<input
											type="range"
											min="10"
											max="200"
											step="5"
											value={filters.proximityRadiusKm}
											onChange={(e) => handleFilterChange("proximityRadiusKm", Number(e.target.value))}
											disabled={disabled}
											className={cn(
												"w-full h-2 bg-warmGrey-200 rounded-lg appearance-none cursor-pointer",
												"[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4",
												"[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red",
												"[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md",
												disabled && "opacity-50 cursor-not-allowed"
											)}
										/>
										<div className="text-center text-sm font-medium text-charcoal">
											{filters.proximityRadiusKm} km
										</div>
									</div>
								</div>

								{/* Min Spots per Cluster */}
								<div className="space-y-2">
									<label className="flex items-center gap-2 text-xs font-medium text-charcoal-600 uppercase tracking-wide">
										<Users className="h-3 w-3" />
										Min Spots
									</label>
									<select
										value={filters.minSpotsPerCluster}
										onChange={(e) => handleFilterChange("minSpotsPerCluster", Number(e.target.value))}
										disabled={disabled}
										className={cn(
											"w-full px-3 py-2 rounded-lg border border-charcoal-200 bg-warmGrey-50",
											"text-charcoal text-sm focus:border-red focus:ring-2 focus:ring-red/20",
											"transition-all duration-200",
											disabled && "opacity-50 cursor-not-allowed"
										)}
									>
										{[1, 2, 3, 4, 5].map((num) => (
											<option key={num} value={num}>
												{num} spot{num > 1 ? "s" : ""}
											</option>
										))}
									</select>
								</div>

								{/* Max Spots per Cluster */}
								<div className="space-y-2">
									<label className="flex items-center gap-2 text-xs font-medium text-charcoal-600 uppercase tracking-wide">
										<Users className="h-3 w-3" />
										Max Spots
									</label>
									<select
										value={filters.maxSpotsPerCluster}
										onChange={(e) => handleFilterChange("maxSpotsPerCluster", Number(e.target.value))}
										disabled={disabled}
										className={cn(
											"w-full px-3 py-2 rounded-lg border border-charcoal-200 bg-warmGrey-50",
											"text-charcoal text-sm focus:border-red focus:ring-2 focus:ring-red/20",
											"transition-all duration-200",
											disabled && "opacity-50 cursor-not-allowed"
										)}
									>
										{[5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
											<option key={num} value={num}>
												{num} spots
											</option>
										))}
									</select>
								</div>

								{/* Max Routes */}
								<div className="space-y-2">
									<label className="flex items-center gap-2 text-xs font-medium text-charcoal-600 uppercase tracking-wide">
										<Route className="h-3 w-3" />
										Max Routes
									</label>
									<select
										value={filters.maxRoutes}
										onChange={(e) => handleFilterChange("maxRoutes", Number(e.target.value))}
										disabled={disabled}
										className={cn(
											"w-full px-3 py-2 rounded-lg border border-charcoal-200 bg-warmGrey-50",
											"text-charcoal text-sm focus:border-red focus:ring-2 focus:ring-red/20",
											"transition-all duration-200",
											disabled && "opacity-50 cursor-not-allowed"
										)}
									>
										{[1, 3, 5, 8, 10, 15, 20].map((num) => (
											<option key={num} value={num}>
												{num} route{num > 1 ? "s" : ""}
											</option>
										))}
									</select>
								</div>
							</div>

							{/* Reset to Defaults */}
							<div className="pt-2 border-t border-charcoal-200">
								<button
									onClick={() => onFiltersChange({
										mode: "any",
										proximityRadiusKm: 50,
										minSpotsPerCluster: 2,
										maxSpotsPerCluster: 8,
										maxRoutes: 5,
									})}
									disabled={disabled}
									className={cn(
										"text-sm text-charcoal-600 hover:text-red transition-colors duration-200",
										"uppercase tracking-wide font-medium",
										disabled && "opacity-50 cursor-not-allowed"
									)}
									type="button"
								>
									Reset to Defaults
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Filter Summary */}
			<div className="text-xs text-charcoal-500 flex flex-wrap items-center gap-2">
				<span>Search:</span>
				<span className="font-medium">
					{filters.mode === "any" ? "Any keyword" : "All keywords"}
				</span>
				<span>•</span>
				<span className="font-medium">
					{filters.proximityRadiusKm}km radius
				</span>
				<span>•</span>
				<span className="font-medium">
					{filters.minSpotsPerCluster}-{filters.maxSpotsPerCluster} spots per route
				</span>
				<span>•</span>
				<span className="font-medium">
					Max {filters.maxRoutes} routes
				</span>
			</div>
		</div>
	);
}