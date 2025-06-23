"use client";
import type { TouristSpotResponseDto } from "@/api/generated";
import {
	useLocationInfo,
	useModelRoutes,
	useTouristSpotsByChapter,
} from "@/hooks/api";
import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronLeft,
	ChevronRight,
	Clock,
	Cloud,
	CloudDrizzle,
	CloudRain,
	CloudSnow,
	Cloudy,
	ExternalLink,
	Loader2,
	MapPin,
	Mountain,
	Route,
	Sun,
	Thermometer,
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
		transition: { duration: 0.5, delay: 0.1 },
	},
	spot: {
		initial: { opacity: 0, y: 20, scale: 0.95 },
		animate: { opacity: 1, y: 0, scale: 1 },
		transition: { duration: 0.6, type: "spring", bounce: 0.3 },
	},
	loading: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	image: {
		initial: { opacity: 0, scale: 1.1 },
		animate: { opacity: 1, scale: 1 },
		transition: { duration: 0.5 },
	},
	content: {
		initial: { opacity: 0, x: 20 },
		animate: { opacity: 1, x: 0 },
		transition: { duration: 0.4, delay: 0.2 },
	},
	weather: {
		initial: { opacity: 0, rotate: -10, scale: 0.8 },
		animate: { opacity: 1, rotate: 0, scale: 1 },
		transition: { duration: 0.5, delay: 0.3, type: "spring" },
	},
	button: {
		initial: { opacity: 0, y: 10 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.3, delay: 0.4 },
	},
};

// Weather icon helper function
const getWeatherIcon = (weatherName: string) => {
	const weather = weatherName.toLowerCase();
	if (weather.includes('rain') || weather.includes('rainy')) return CloudRain;
	if (weather.includes('drizzle')) return CloudDrizzle;
	if (weather.includes('snow') || weather.includes('snowy')) return CloudSnow;
	if (weather.includes('cloud') || weather.includes('overcast')) return Cloudy;
	if (weather.includes('clear') || weather.includes('sunny')) return Sun;
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
		<motion.div {...ANIMATIONS.container} className="space-y-4">
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

	// Image navigation state
	const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

	const nextImage = () => {
		if (googleImages.length > 1) {
			setCurrentImageIndex((prev) => (prev + 1) % googleImages.length);
		}
	};

	const prevImage = () => {
		if (googleImages.length > 1) {
			setCurrentImageIndex(
				(prev) => (prev - 1 + googleImages.length) % googleImages.length,
			);
		}
	};

	return (
		<div className="bg-warmGrey3 rounded-lg overflow-hidden hover:bg-warmGrey/80 transition-colors duration-150">
			<div className="flex flex-col md:flex-row">
				{/* Image Section - Left Side */}
				<div className="md:w-1/3 flex-shrink-0">
					{hasImages ? (
						<div className="relative h-48 md:h-full md:min-h-[480px] bg-warmGrey4 group overflow-hidden">
							<AnimatePresence mode="wait">
								<motion.div
									key={currentImageIndex}
									initial={{ opacity: 0, scale: 1.1, x: 50 }}
									animate={{ opacity: 1, scale: 1, x: 0 }}
									exit={{ opacity: 0, scale: 0.95, x: -50 }}
									transition={{ 
										duration: 0.6,
										ease: [0.4, 0, 0.2, 1],
										scale: { duration: 0.8 }
									}}
									className="absolute inset-0"
								>
									<Image
										src={googleImages[currentImageIndex]?.url ?? ""}
										alt={spot.touristSpotName}
										fill
										className="object-cover opacity-90"
										sizes="(max-width: 768px) 100vw, 33vw"
										priority
									/>
								</motion.div>
							</AnimatePresence>

							{/* Navigation arrows - only show if multiple images */}
							{googleImages.length > 1 && (
								<>
									<button
										type="button"
										onClick={prevImage}
										className="absolute left-2 top-1/2 -translate-y-1/2 bg-charcoal/70 hover:bg-charcoal/90 text-warmGrey p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
										aria-label="Previous image"
									>
										<ChevronLeft className="w-3 h-3" />
									</button>
									<button
										type="button"
										onClick={nextImage}
										className="absolute right-2 top-1/2 -translate-y-1/2 bg-charcoal/70 hover:bg-charcoal/90 text-warmGrey p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
										aria-label="Next image"
									>
										<ChevronRight className="w-3 h-3" />
									</button>
								</>
							)}

							{/* Image count indicator */}
							{googleImages.length > 1 && (
								<motion.div 
									{...ANIMATIONS.image}
									key={currentImageIndex}
									className="absolute bottom-2 right-2 bg-red text-warmGrey px-2 py-1 rounded text-xs tracking-wider font-medium"
								>
									{currentImageIndex + 1}/{googleImages.length}
								</motion.div>
							)}
						</div>
					) : locationLoading ? (
						<div className="h-48 md:h-full md:min-h-[280px] bg-warmGrey4 flex items-center justify-center">
							<Loader2 className="w-4 h-4 text-charcoal animate-spin opacity-60" />
						</div>
					) : (
						<div className="h-48 md:h-full md:min-h-[280px] bg-warmGrey4 flex items-center justify-center">
							<Mountain className="w-6 h-6 text-charcoal opacity-40" />
						</div>
					)}
				</div>

				{/* Content Section - Right Side */}
				<motion.div 
					{...ANIMATIONS.content}
					className="md:w-2/3 p-4 flex flex-col h-full"
				>
					{/* Title */}
					<div className="flex-grow">
						<h3 className="text-base lg:text-xl font-bold text-charcoal uppercase tracking-widest mb-2">
							{spot.touristSpotName}
						</h3>
						{spot.touristSpotDesc && (
							<p className="text-sm text-charcoal opacity-90 leading-relaxed text-pretty">
								{spot.touristSpotDesc}
							</p>
						)}

						{/* Weather Info */}
						{spot.weatherInfo && (
							<motion.div 
								{...ANIMATIONS.weather}
								className="flex items-center gap-3 p-3 bg-warmGrey4 rounded border border-warmGrey mt-4"
							>
								<div className="flex items-center gap-2">
									<Thermometer className="w-4 h-4 text-charcoal opacity-80" />
									<span className="font-medium text-charcoal uppercase tracking-wide text-sm">
										{spot.weatherInfo.temperatureCelsius.toFixed(1)}°C
									</span>
								</div>
								<div className="flex items-center gap-2">
									{React.createElement(getWeatherIcon(spot.weatherInfo.weatherName), {
										className: "w-5 h-5 text-charcoal opacity-80"
									})}
								</div>
							</motion.div>
						)}
					</div>

					{/* Bottom Content - All aligned to bottom */}
					<div className="space-y-3 mt-auto">
						{/* Location */}
						{spot.address && (
							<div className="flex items-start gap-2">
								<MapPin className="w-4 h-4 text-charcoal mt-0.5 flex-shrink-0 opacity-80" />
								<div className="space-y-2">
									<p className="text-sm text-charcoal opacity-90 leading-relaxed">
										{spot.address}
									</p>
									{spot.touristSpotLatitude && spot.touristSpotLongitude && (
										<a
											href={`https://www.google.com/maps?q=${spot.touristSpotLatitude},${spot.touristSpotLongitude}`}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 text-xs text-charcoal hover:text-charcoal/80 transition-colors uppercase tracking-widest underline decoration-1 underline-offset-2"
										>
											View Map
											<ExternalLink className="w-3 h-3" />
										</a>
									)}
								</div>
							</div>
						)}

						{/* Best Visit Time */}
						{spot.bestVisitTime && (
							<div className="flex items-center gap-2">
								<Clock className="w-4 h-4 text-charcoal opacity-80" />
								<span className="text-sm text-charcoal opacity-90 uppercase tracking-wide">
									Best Visit: {spot.bestVisitTime}
								</span>
							</div>
						)}

						{/* Hashtags */}
						{spot.touristSpotHashtag && spot.touristSpotHashtag.length > 0 && (
							<div className="flex flex-wrap gap-1">
								{spot.touristSpotHashtag.slice(0, 4).map((tag, index) => (
									<span
										key={`${spot.touristSpotId}-tag-${index}`}
										className="text-xs text-charcoal bg-warmGrey px-2 py-1 rounded uppercase tracking-wide opacity-80"
									>
										#{tag}
									</span>
								))}
							</div>
						)}

						{/* Model Route Link */}
						{modelRoute && (
							<motion.div 
								{...ANIMATIONS.button}
								className="pt-3 border-t border-warmGrey flex justify-end"
							>
								<a
									href={`/v2/region/${modelRoute.region}/${modelRoute.modelRouteId}`}
									className="inline-flex items-center gap-1 text-sm text-red hover:underline font-medium uppercase tracking-widest transition-all duration-300 hover:scale-110"
								>
									<Route size={16} />
									Explore Route
								</a>
							</motion.div>
						)}
					</div>
				</motion.div>
			</div>
		</div>
	);
};
