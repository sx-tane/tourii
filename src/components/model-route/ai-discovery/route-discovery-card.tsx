"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
	MapPin, 
	Clock, 
	Route, 
	Sparkles, 
	Star,
	ChevronRight,
	Navigation,
	Camera
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { RouteDiscoveryCardProps } from "./types";

export function RouteDiscoveryCard({ 
	route, 
	onSelect, 
	className 
}: RouteDiscoveryCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);

	// Get the first tourist spot image as card background
	const backgroundImage = route.touristSpots[0]?.imageUrl;
	
	// Calculate confidence color
	const getConfidenceColor = (confidence: number) => {
		if (confidence >= 0.8) return "text-green-500 bg-green-500/10";
		if (confidence >= 0.6) return "text-mustard bg-mustard/10";
		return "text-orange-500 bg-orange-500/10";
	};

	// Format duration
	const formatDuration = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		if (hours > 0) {
			return `${hours}h ${mins > 0 ? `${mins}m` : ""}`;
		}
		return `${mins}m`;
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			whileHover={{ y: -5, scale: 1.02 }}
			transition={{ 
				duration: 0.3,
				type: "spring",
				stiffness: 300,
				damping: 25
			}}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			onClick={onSelect}
			className={cn(
				"relative group cursor-pointer overflow-hidden",
				"bg-warmGrey-50 border border-charcoal-200 rounded-2xl",
				"hover:border-red hover:shadow-lg transition-all duration-300",
				className
			)}
		>
			{/* Background Image */}
			{backgroundImage && (
				<div className="relative h-48 overflow-hidden">
					<motion.img
						src={backgroundImage}
						alt={route.routeName}
						onLoad={() => setImageLoaded(true)}
						className={cn(
							"w-full h-full object-cover transition-all duration-500",
							imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
						)}
					/>
					
					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
					
					{/* AI Badge */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-warmGrey-50/90 backdrop-blur-sm rounded-full"
					>
						<Sparkles className="h-3 w-3 text-red" />
						<span className="text-xs font-medium text-charcoal uppercase tracking-wide">
							AI Generated
						</span>
					</motion.div>

					{/* Confidence Score */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3 }}
						className="absolute top-3 right-3"
					>
						<div className={cn(
							"flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
							"backdrop-blur-sm border border-warmGrey-50/20",
							getConfidenceColor(route.confidence)
						)}>
							<Star className="h-3 w-3 fill-current" />
							<span>{Math.round(route.confidence * 100)}%</span>
						</div>
					</motion.div>

					{/* Route Stats Overlay */}
					<div className="absolute bottom-3 left-3 right-3 text-warmGrey-50">
						<h3 className="text-lg font-bold mb-2 line-clamp-2">
							{route.routeName}
						</h3>
						
						<div className="flex items-center gap-4 text-sm">
							<div className="flex items-center gap-1">
								<Clock className="h-4 w-4" />
								<span>{formatDuration(route.estimatedDurationMinutes)}</span>
							</div>
							<div className="flex items-center gap-1">
								<Route className="h-4 w-4" />
								<span>{route.totalDistanceKm.toFixed(1)} km</span>
							</div>
							<div className="flex items-center gap-1">
								<MapPin className="h-4 w-4" />
								<span>{route.touristSpots.length} spots</span>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Content Section */}
			<div className="p-4 space-y-3">
				{/* Description */}
				<p className="text-sm text-charcoal-600 line-clamp-3 leading-relaxed">
					{route.routeDescription}
				</p>

				{/* Hashtags */}
				{route.hashtags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{route.hashtags.slice(0, 4).map((hashtag, index) => (
							<motion.span
								key={hashtag}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.1 * index }}
								className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red/10 text-red border border-red/20 uppercase tracking-wide"
							>
								#{hashtag}
							</motion.span>
						))}
						{route.hashtags.length > 4 && (
							<span className="text-xs text-charcoal-500 px-2 py-1">
								+{route.hashtags.length - 4} more
							</span>
						)}
					</div>
				)}

				{/* Tourist Spots Preview */}
				<div className="space-y-2">
					<div className="flex items-center gap-2 text-xs font-medium text-charcoal-600 uppercase tracking-wide">
						<Camera className="h-3 w-3" />
						<span>Featured Spots</span>
					</div>
					<div className="space-y-1">
						{route.touristSpots.slice(0, 3).map((spot, index) => (
							<motion.div
								key={spot.touristSpotId}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.1 * index }}
								className="flex items-center gap-2 text-sm text-charcoal-600"
							>
								<div className="w-1.5 h-1.5 bg-red rounded-full flex-shrink-0" />
								<span className="truncate">{spot.name}</span>
							</motion.div>
						))}
						{route.touristSpots.length > 3 && (
							<div className="text-xs text-charcoal-500 pl-3.5">
								+{route.touristSpots.length - 3} more spots
							</div>
						)}
					</div>
				</div>

				{/* Region Badge */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Navigation className="h-4 w-4 text-charcoal-400" />
						<span className="text-sm font-medium text-charcoal-600 uppercase tracking-wide">
							{route.region}
						</span>
					</div>

					{/* Explore Button */}
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={cn(
							"flex items-center gap-2 px-3 py-1.5 rounded-lg",
							"bg-red text-warmGrey-50 text-sm font-medium",
							"hover:bg-red/90 transition-colors duration-200",
							"uppercase tracking-wide"
						)}
						onClick={(e) => {
							e.stopPropagation();
							onSelect?.();
						}}
					>
						<span>Explore</span>
						<motion.div
							animate={{ x: isHovered ? 3 : 0 }}
							transition={{ duration: 0.2 }}
						>
							<ChevronRight className="h-4 w-4" />
						</motion.div>
					</motion.button>
				</div>
			</div>

			{/* Hover Glow Effect */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: isHovered ? 0.1 : 0 }}
				transition={{ duration: 0.3 }}
				className="absolute inset-0 bg-red rounded-2xl pointer-events-none"
			/>
		</motion.div>
	);
}