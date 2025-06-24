"use client";
import type { TouristSpotResponseDto } from "@/api/generated";
import {
	useLocationInfo,
	useModelRoutes,
	useTouristSpotsByChapter,
} from "@/hooks/api";
import { AnimatePresence, motion } from "framer-motion";
import {
	Cloud,
	CloudDrizzle,
	CloudRain,
	CloudSnow,
	Cloudy,
	Loader2,
	Mountain,
	Sun,
} from "lucide-react";
import Image from "next/image";
import React from "react";

interface WorldLoreTabContentProps {
	storyChapterId: string | undefined;
}

const ANIMATIONS = {
	container: {
		initial: { opacity: 0, y: 15 },
		animate: { opacity: 1, y: 0 },
		transition: { 
			duration: 0.8, 
			delay: 0.1,
			type: "spring",
			stiffness: 100,
			damping: 15
		},
	},
	spot: {
		initial: { opacity: 0, y: 40, scale: 0.9, rotateX: 15 },
		animate: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
		transition: { 
			duration: 0.8, 
			type: "spring", 
			bounce: 0.2,
			stiffness: 80,
			damping: 12
		},
	},
	loading: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	image: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { duration: 0.6, ease: "easeOut" },
	},
	content: {
		initial: { opacity: 0, x: 30, y: 20 },
		animate: { opacity: 1, x: 0, y: 0 },
		transition: { duration: 0.8, delay: 0.3, type: "spring" },
	},
	weather: {
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1 },
		transition: { 
			duration: 0.6, 
			delay: 0.5, 
			type: "spring"
		},
	},
	button: {
		initial: { opacity: 0, y: 20, scale: 0.9 },
		animate: { opacity: 1, y: 0, scale: 1 },
		transition: { duration: 0.6, delay: 0.6, type: "spring" },
	},
	title: {
		initial: { opacity: 0, y: 30, rotateX: 90 },
		animate: { opacity: 1, y: 0, rotateX: 0 },
		transition: { 
			duration: 0.8, 
			delay: 0.4,
			type: "spring",
			stiffness: 100
		},
	},
	description: {
		initial: { opacity: 0, y: 20, x: -10 },
		animate: { opacity: 1, y: 0, x: 0 },
		transition: { duration: 0.6, delay: 0.5 },
	},
	footer: {
		initial: { opacity: 0, y: 15 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.5, delay: 0.7 },
	},
};

// Weather icon helper function
const getWeatherIcon = (weatherName: string) => {
	const weather = weatherName.toLowerCase();
	if (weather.includes("rain") || weather.includes("rainy")) return CloudRain;
	if (weather.includes("drizzle")) return CloudDrizzle;
	if (weather.includes("snow") || weather.includes("snowy")) return CloudSnow;
	if (weather.includes("cloud") || weather.includes("overcast")) return Cloudy;
	if (weather.includes("clear") || weather.includes("sunny")) return Sun;
	return Cloud; // default
};

export const WorldLoreTabContent: React.FC<WorldLoreTabContentProps> = ({
	storyChapterId,
}) => {
	const {
		data: touristSpots,
		isLoading,
		error,
	} = useTouristSpotsByChapter(storyChapterId);

	if (isLoading) {
		return (
			<AnimatePresence mode="wait">
				<motion.div
					{...ANIMATIONS.loading}
					className="flex flex-col items-center justify-center py-16 bg-warmGrey3 rounded-lg"
				>
					<Loader2 className="w-6 h-6 text-charcoal animate-spin mb-3" />
					<p className="text-xs uppercase tracking-widest text-charcoal">
						Loading...
					</p>
				</motion.div>
			</AnimatePresence>
		);
	}

	if (error) {
		return (
			<div className="bg-warmGrey3 rounded-lg p-6">
				<div className="flex items-center gap-3 text-charcoal">
					<Mountain className="w-5 h-5" />
					<p className="text-xs uppercase tracking-widest">
						Unable to load world lore
					</p>
				</div>
			</div>
		);
	}

	if (!touristSpots || touristSpots.length === 0) {
		return (
			<div className="bg-warmGrey3 rounded-lg p-8 text-center">
				<Mountain className="w-8 h-8 text-charcoal mx-auto mb-4 opacity-60" />
				<p className="text-xs uppercase tracking-widest text-charcoal opacity-80">
					No sacred places discovered yet
				</p>
			</div>
		);
	}

	return (
		<motion.div
			{...ANIMATIONS.container}
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
		>
			{touristSpots.map((spot, index) => (
				<motion.div
					key={spot.touristSpotId}
					{...ANIMATIONS.spot}
					transition={{ ...ANIMATIONS.spot.transition, delay: index * 0.1 }}
				>
					<TouristSpotCard spot={spot} />
				</motion.div>
			))}
		</motion.div>
	);
};

const TouristSpotCard: React.FC<{ spot: TouristSpotResponseDto }> = ({
	spot,
}) => {
	// Get location info with Google images
	const { locationInfo, isLoading: locationLoading } = useLocationInfo({
		query: spot.touristSpotName,
		latitude: spot.touristSpotLatitude?.toString(),
		longitude: spot.touristSpotLongitude?.toString(),
		address: spot.address ?? "",
		enabled: Boolean(spot.touristSpotName),
	});

	// Get all model routes to find which one contains this tourist spot
	const { data: modelRoutes } = useModelRoutes();

	// Find the model route that contains this tourist spot
	const modelRoute = modelRoutes?.find((route) =>
		route.touristSpotList.some((ts) => ts.touristSpotId === spot.touristSpotId),
	);

	// Get Google images from location API
	const googleImages = locationInfo?.images || [];
	const hasImages = googleImages.length > 0;
	const firstImage = googleImages[0]?.url;

	return (
		<div className="relative w-full max-w-sm lg:max-w-none">
			{/* Card Container - Portrait format like reference */}
			<div className="relative bg-charcoal rounded-3xl overflow-hidden shadow-xl border-2 border-warmGrey3 h-[60vh] w-full lg:h-[55vh] lg:w-[55vw]">
				{/* Full Background Image */}
				{hasImages && firstImage ? (
					<>
						<motion.div
							{...ANIMATIONS.image}
							className="absolute inset-0"
						>
							<Image
								src={firstImage}
								alt={spot.touristSpotName}
								fill
								className="object-cover"
								priority={true}
								quality={85}
								loading="eager"
								placeholder="blur"
								blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R6i+gaVabwKkOH//9k="
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</motion.div>
						{/* Bottom gradient - solid charcoal until title area */}
						<motion.div
							className="absolute inset-0"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							style={{
								background:
									"linear-gradient(to top, #21211B 0%, #21211B 30%, #21211BE6 35%, #21211BCC 40%, #21211B80 45%, #1F1F1F33 55%, transparent 70%)",
							}}
						/>
					</>
				) : locationLoading ? (
					<div className="absolute inset-0 bg-warmGrey4 flex flex-col items-center justify-center">
						<Loader2 className="w-8 h-8 text-charcoal animate-spin mb-2" />
						<p className="text-xs text-charcoal/60 tracking-wider">Loading image...</p>
					</div>
				) : (
					<div className="absolute inset-0 bg-warmGrey4 flex items-center justify-center">
						<Mountain className="w-12 h-12 text-charcoal opacity-40" />
					</div>
				)}

				{/* Content Overlay */}
				<motion.div 
					className="absolute inset-0 flex flex-col p-4"
					{...ANIMATIONS.content}
				>
					{/* Weather Badge - Floating */}
					{spot.weatherInfo && (
						<motion.div
							{...ANIMATIONS.weather}
							className="absolute top-4 right-4 bg-charcoal/20 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-warmGrey/30"
						>
							{React.createElement(
								getWeatherIcon(spot.weatherInfo.weatherName),
								{
									className: "w-6 h-6 text-warmGrey",
								},
							)}
							<span className="text-warmGrey text-sm font-medium tracking-wider italic">
								{spot.weatherInfo.temperatureCelsius.toFixed(1)}°C
							</span>
						</motion.div>
					)}

					{/* Bottom Section - Main Content */}
					<div className="mt-auto space-y-4">
						{/* Main Heading */}
						<motion.div {...ANIMATIONS.title}>
							<motion.h2 
								className="text-warmGrey text-xl md:text-2xl font-bold leading-tight mb-2 tracking-widest uppercase truncate lg:whitespace-normal"
								whileHover={{ 
									textShadow: "0 0 8px rgba(223, 211, 195, 0.3)",
									transition: { duration: 0.2 }
								}}
							>
								{spot.touristSpotName}
							</motion.h2>

							{/* Subtext */}
							<motion.p 
								className="text-warmGrey text-sm leading-relaxed tracking-wider line-clamp-3"
								{...ANIMATIONS.description}
							>
								{spot.touristSpotDesc
									? spot.touristSpotDesc
									: "From sacred sites to modern wonders. Let's explore this destination."}
							</motion.p>
						</motion.div>

						{/* Call to Action Button */}
						<motion.div {...ANIMATIONS.button}>
							<a
								href={
									modelRoute
										? `/v2/region/${modelRoute.region}/${modelRoute.modelRouteId}`
										: "#"
								}
								className="inline-flex items-center justify-center w-full md:w-1/4 gap-2 px-5 py-2.5 border border-warmGrey/60 text-warmGrey rounded-full hover:bg-warmGrey hover:text-charcoal transition-all duration-300 text-sm font-medium tracking-wide"
							>
								{modelRoute ? "Explore Route" : "Learn more"}
							</a>
						</motion.div>

						{/* Footer - Split between left and right */}
						<motion.div 
							className="flex justify-between items-center text-warmGrey/70 text-xs pt-2"
							{...ANIMATIONS.footer}
						>
							<span className="tracking-wider truncate max-w-[120px] lg:truncate-none lg:max-w-none">
								{spot.address ? spot.address : "tourii.jp"}
							</span>
							<span className="tracking-wider truncate max-w-[120px] lg:max-w-[150px]">
								{spot.touristSpotHashtag && spot.touristSpotHashtag.length > 0
									? spot.touristSpotHashtag
											.slice(0, 2)
											.map((tag) => tag.toLowerCase())
											.join(" + ")
									: "explore + earn"}
							</span>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};
