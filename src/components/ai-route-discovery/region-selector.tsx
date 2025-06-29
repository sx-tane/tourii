"use client";

import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useMemo } from "react";

interface RegionSelectorProps {
	/** Available model routes to extract regions from */
	routes: ModelRouteResponseDto[];
	/** Callback when a region is selected */
	onRegionSelect: (region: string) => void;
	/** Currently selected region */
	selectedRegion?: string;
	/** Loading state */
	isLoading?: boolean;
}

interface RegionData {
	name: string;
	routeCount: number;
	backgroundImage?: string;
	description?: string;
}

const RegionSelector: React.FC<RegionSelectorProps> = memo(({
	routes,
	onRegionSelect,
	selectedRegion,
	isLoading = false,
}) => {
	// Extract unique regions from routes and count routes per region
	const regionData = useMemo((): RegionData[] => {
		const regionMap = new Map<string, RegionData>();

		routes.forEach((route) => {
			if (!route.region) return;

			const existingRegion = regionMap.get(route.region);
			if (existingRegion) {
				existingRegion.routeCount += 1;
			} else {
				regionMap.set(route.region, {
					name: route.region,
					routeCount: 1,
					backgroundImage: route.regionBackgroundMedia,
					description: route.regionDesc,
				});
			}
		});

		return Array.from(regionMap.values()).sort((a, b) => a.name.localeCompare(b.name));
	}, [routes]);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center py-20">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red"></div>
				<p className="mt-4 text-charcoal">Loading regions...</p>
			</div>
		);
	}

	if (regionData.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-charcoal">
				<h2 className="text-xl font-semibold mb-2">No Regions Available</h2>
				<p className="text-center">No route regions found. Please try again later.</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-center mb-8"
			>
				<h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
					Where would you like to explore?
				</h1>
				<p className="text-lg text-charcoal/80">
					Choose a region to discover amazing routes and destinations
				</p>
			</motion.div>

			{/* Region Grid */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
			>
				{regionData.map((region, index) => (
					<motion.div
						key={region.name}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: index * 0.1 }}
						whileHover={{ scale: 1.02, y: -5 }}
						whileTap={{ scale: 0.98 }}
						className={`relative h-64 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl ${
							selectedRegion === region.name
								? "ring-4 ring-red ring-opacity-50"
								: ""
						}`}
						onClick={() => onRegionSelect(region.name)}
					>
						{/* Background Image */}
						{region.backgroundImage ? (
							<Image
								src={region.backgroundImage}
								alt={region.name}
								fill
								className="object-cover brightness-75 hover:brightness-50 transition-all duration-300"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						) : (
							<div className="w-full h-full bg-gradient-to-br from-charcoal to-warmGrey2" />
						)}

						{/* Overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

						{/* Content */}
						<div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
							{/* Route Count Badge */}
							<div className="self-end">
								<span className="bg-red px-3 py-1 rounded-full text-sm font-medium">
									{region.routeCount} route{region.routeCount !== 1 ? 's' : ''}
								</span>
							</div>

							{/* Region Info */}
							<div>
								<h3 className="text-2xl font-bold mb-2 uppercase tracking-wider">
									{region.name}
								</h3>
								{region.description && (
									<p className="text-sm text-white/90 line-clamp-2">
										{region.description}
									</p>
								)}
							</div>
						</div>

						{/* Selection Indicator */}
						{selectedRegion === region.name && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className="absolute top-4 left-4 w-6 h-6 bg-red rounded-full flex items-center justify-center"
							>
								<svg
									className="w-4 h-4 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</motion.div>
						)}
					</motion.div>
				))}
			</motion.div>

			{/* Selected Region Info */}
			{selectedRegion && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mt-8 text-center"
				>
					<p className="text-charcoal/80">
						Selected region: <span className="font-semibold text-red">{selectedRegion}</span>
					</p>
				</motion.div>
			)}
		</div>
	);
});

RegionSelector.displayName = "RegionSelector";

export default RegionSelector;