"use client";
import type { TouristSpotResponseDto } from "@/api/generated";
import { getLocationInfo } from "@/hooks/routes/getLocationInfo";
import { motion, AnimatePresence } from "framer-motion";
import {
	MapPin,
	Clock,
	Thermometer,
	Star,
	Phone,
	Globe,
	ExternalLink,
	Loader2,
	AlertCircle,
} from "lucide-react";
import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { logger } from "@/utils/logger";

interface LocationInfoPanelProps {
	selectedSpot?: TouristSpotResponseDto;
	className?: string;
}

const LocationInfoPanel: React.FC<LocationInfoPanelProps> = ({
	selectedSpot,
	className = "",
}) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const {
		locationInfo,
		isLoadingLocationInfo,
		isErrorLocationInfo,
		errorLocationInfo,
		hasLocationInfo,
	} = getLocationInfo({
		query: selectedSpot?.touristSpotName ?? "",
		latitude: selectedSpot?.touristSpotLatitude?.toString(),
		longitude: selectedSpot?.touristSpotLongitude?.toString(),
		address: selectedSpot?.address ?? "",
	});

	logger.info(locationInfo ? JSON.stringify(locationInfo) : "No location info");

	// Reset image index when spot changes or when valid images change
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setCurrentImageIndex(0);
	}, [selectedSpot?.touristSpotId]);

	// Use Google Places images if available, otherwise fall back to local images
	const googleImages = locationInfo?.images || [];
	const localImages = selectedSpot?.imageSet?.small || [];

	// Helper function to validate image URLs
	const isValidImageUrl = (url: string | undefined | null): url is string => {
		return typeof url === "string" && url.trim() !== "";
	};

	// Get valid filtered images for navigation
	const validGoogleImages = googleImages.filter((img) =>
		isValidImageUrl(img?.url),
	);
	const hasGoogleImages = validGoogleImages.length > 0;

	const mainImageSrc = selectedSpot?.imageSet?.main;
	const hasValidMainImage = mainImageSrc && mainImageSrc.trim() !== "";

	// Image navigation functions
	const activeImages = hasGoogleImages
		? validGoogleImages
		: hasValidMainImage
			? [{ url: mainImageSrc }]
			: [];

	// Reset index if it's out of bounds for the current active images
	useEffect(() => {
		if (currentImageIndex >= activeImages.length && activeImages.length > 0) {
			setCurrentImageIndex(0);
		}
	}, [activeImages.length, currentImageIndex]);

	const nextImage = () => {
		if (activeImages.length > 1) {
			setCurrentImageIndex((prev) => (prev + 1) % activeImages.length);
		}
	};

	const prevImage = () => {
		if (activeImages.length > 1) {
			setCurrentImageIndex(
				(prev) => (prev - 1 + activeImages.length) % activeImages.length,
			);
		}
	};

	if (!selectedSpot) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className={`absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 ${className}`}
			>
				<div className="flex items-center gap-2 text-sm text-gray-500">
					<MapPin className="w-4 h-4" />
					Select a tourist spot to view details
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className={`absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 min-w-[320px] max-w-[380px] overflow-hidden ${className}`}
		>
			{/* Image Gallery Section */}
			<AnimatePresence mode="wait">
				{isLoadingLocationInfo ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
					>
						<Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
						<span className="ml-2 text-sm text-blue-600">
							Loading location info...
						</span>
					</motion.div>
				) : hasGoogleImages || hasValidMainImage ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="relative h-48 group"
					>
						{hasGoogleImages
							? activeImages[currentImageIndex]?.url &&
								isValidImageUrl(activeImages[currentImageIndex]?.url) && (
									<Image
										src={activeImages[currentImageIndex].url}
										alt={locationInfo?.name || selectedSpot.touristSpotName}
										fill
										className="object-cover"
										sizes="(max-width: 380px) 100vw, 380px"
										unoptimized // Disable optimization for Google Photos API URLs
									/>
								)
							: hasValidMainImage &&
								isValidImageUrl(mainImageSrc) && (
									<Image
										src={mainImageSrc}
										alt={selectedSpot.touristSpotName}
										fill
										className="object-cover"
										sizes="(max-width: 380px) 100vw, 380px"
									/>
								)}

						{/* Image navigation for multiple images */}
						{activeImages.length > 1 && (
							<>
								<button
									type="button"
									onClick={prevImage}
									className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full z-10 transition-all duration-200 opacity-70 hover:opacity-100"
									aria-label="Previous image"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										aria-hidden="true"
									>
										<polyline points="15,18 9,12 15,6" />
									</svg>
								</button>
								<button
									type="button"
									onClick={nextImage}
									className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full z-10 transition-all duration-200 opacity-70 hover:opacity-100"
									aria-label="Next image"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										aria-hidden="true"
									>
										<polyline points="9,18 15,12 9,6" />
									</svg>
								</button>

								{/* Image indicators */}
								<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
									{activeImages.map((image, index) => (
										<button
											key={
												hasGoogleImages ? `google-${index}` : `local-${index}`
											}
											type="button"
											onClick={() => setCurrentImageIndex(index)}
											className={`w-2 h-2 rounded-full transition-colors ${
												index === currentImageIndex ? "bg-white" : "bg-white/50"
											}`}
											aria-label={`Go to image ${index + 1}`}
										/>
									))}
								</div>
							</>
						)}

						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
					>
						<div className="text-center">
							<AlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
							<span className="text-xs text-gray-500">No images available</span>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Content Section */}
			<div className="p-4 space-y-3">
				{/* Location Name */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1 }}
				>
					<h3 className="font-bold text-lg text-charcoal mb-1 line-clamp-2">
						{hasLocationInfo && locationInfo?.name
							? locationInfo.name
							: selectedSpot.touristSpotName}
					</h3>

					{/* Rating */}
					{hasLocationInfo && locationInfo?.rating && (
						<div className="flex items-center gap-1 mb-2">
							<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
							<span className="text-sm font-medium text-gray-700">
								{locationInfo.rating}
							</span>
							<span className="text-xs text-gray-500">Google rating</span>
						</div>
					)}
				</motion.div>

				{/* Address */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.15 }}
					className="flex items-start gap-2"
				>
					<MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
					<span className="text-sm text-gray-700 line-clamp-2">
						{hasLocationInfo && locationInfo?.formattedAddress
							? locationInfo.formattedAddress
							: selectedSpot.address}
					</span>
				</motion.div>

				{/* Contact Info */}
				{hasLocationInfo &&
					(locationInfo?.phoneNumber ||
						locationInfo?.website ||
						locationInfo?.googleMapsUrl) && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="flex flex-wrap gap-2"
						>
							{locationInfo.phoneNumber && (
								<a
									href={`tel:${locationInfo.phoneNumber}`}
									className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
								>
									<Phone className="w-3 h-3" />
									Call
								</a>
							)}
							{locationInfo.website && (
								<a
									href={locationInfo.website}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full hover:bg-green-100 transition-colors"
								>
									<Globe className="w-3 h-3" />
									Website
								</a>
							)}
							{locationInfo.googleMapsUrl && (
								<a
									href={locationInfo.googleMapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1 text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full hover:bg-red-100 transition-colors"
								>
									<ExternalLink className="w-3 h-3" />
									Maps
								</a>
							)}
						</motion.div>
					)}

				{/* Best Visit Time */}
				{selectedSpot.bestVisitTime && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.25 }}
						className="flex items-center gap-2"
					>
						<Clock className="w-4 h-4 text-gray-500" />
						<span className="text-sm text-gray-700">
							Best time: {selectedSpot.bestVisitTime}
						</span>
					</motion.div>
				)}

				{/* Weather Info */}
				{selectedSpot.weatherInfo && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
					>
						<Thermometer className="w-4 h-4 text-blue-500" />
						<div className="text-sm">
							<span className="font-medium text-charcoal">
								{selectedSpot.weatherInfo.temperatureCelsius}°C
							</span>
							<span className="text-gray-600 ml-2">
								{selectedSpot.weatherInfo.weatherName}
							</span>
						</div>
					</motion.div>
				)}

				{/* Opening Hours */}
				{hasLocationInfo &&
					locationInfo?.openingHours &&
					locationInfo.openingHours.length > 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.35 }}
							className="space-y-1"
						>
							<div className="flex items-center gap-2 text-sm font-medium text-gray-700">
								<Clock className="w-4 h-4" />
								Opening Hours
							</div>
							<div className="text-xs text-gray-600 space-y-0.5 pl-6">
								{locationInfo.openingHours.slice(0, 3).map((hours) => (
									<div key={hours}>{hours}</div>
								))}
								{locationInfo.openingHours.length > 3 && (
									<div className="text-gray-500">
										+{locationInfo.openingHours.length - 3} more days
									</div>
								)}
							</div>
						</motion.div>
					)}

				{/* Hashtags */}
				{selectedSpot.touristSpotHashtag &&
					selectedSpot.touristSpotHashtag.length > 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
							className="flex flex-wrap gap-1"
						>
							{selectedSpot.touristSpotHashtag.slice(0, 4).map((tag, index) => (
								<span
									key={tag}
									className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full border border-indigo-100"
								>
									#{tag}
								</span>
							))}
						</motion.div>
					)}
			</div>
		</motion.div>
	);
};

export default LocationInfoPanel;
