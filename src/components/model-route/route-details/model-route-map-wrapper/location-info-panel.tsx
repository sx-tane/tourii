"use client";
import type {
	LocationInfoResponseDto,
	TouristSpotResponseDto,
} from "@/api/generated";
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
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLocationInfo } from "@/hooks";

// Constants
const SWIPE_CONFIG = {
	minSwipeDistance: 50, // Minimum distance for a swipe
	maxSwipeTime: 300, // Maximum time for a swipe (ms)
	preventScroll: true,
};

const ANIMATIONS = {
	panel: {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.3 },
	},
	loading: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	image: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
	},
	content: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
	},
};

interface LocationInfoPanelProps {
	selectedSpot?: TouristSpotResponseDto;
	className?: string;
	isStatic?: boolean; // For use in scrollable containers (phone/tablet)
	// Navigation props
	touristSpotList?: TouristSpotResponseDto[];
	onPreviousSpot?: () => void;
	onNextSpot?: () => void;
	showNavigation?: boolean;
}

// Custom hooks
const useSwipeDetection = (
	onSwipeLeft: () => void,
	onSwipeRight: () => void,
	enabled = true,
) => {
	const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
		null,
	);
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = elementRef.current;
		if (!element || !enabled) return;

		const handleTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0];
			if (!touch) return;
			touchStartRef.current = {
				x: touch.clientX,
				y: touch.clientY,
				time: Date.now(),
			};
		};

		const handleTouchEnd = (e: TouchEvent) => {
			if (!touchStartRef.current) return;

			const touch = e.changedTouches[0];
			if (!touch) return;
			const deltaX = touch.clientX - touchStartRef.current.x;
			const deltaY = touch.clientY - touchStartRef.current.y;
			const deltaTime = Date.now() - touchStartRef.current.time;

			// Check if it's a valid swipe
			const absDeltaX = Math.abs(deltaX);
			const absDeltaY = Math.abs(deltaY);

			if (
				absDeltaX > SWIPE_CONFIG.minSwipeDistance &&
				absDeltaX > absDeltaY * 2 && // Ensure horizontal swipe
				deltaTime < SWIPE_CONFIG.maxSwipeTime
			) {
				if (deltaX > 0) {
					onSwipeRight();
				} else {
					onSwipeLeft();
				}

				// Prevent default behavior
				e.preventDefault();
			}

			touchStartRef.current = null;
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (SWIPE_CONFIG.preventScroll && touchStartRef.current) {
				// Only prevent scroll for horizontal movements
				const touch = e.touches[0];
				if (!touch) return;
				const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
				const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

				if (deltaX > deltaY) {
					e.preventDefault();
				}
			}
		};

		element.addEventListener("touchstart", handleTouchStart, {
			passive: false,
		});
		element.addEventListener("touchend", handleTouchEnd, { passive: false });
		element.addEventListener("touchmove", handleTouchMove, { passive: false });

		return () => {
			element.removeEventListener("touchstart", handleTouchStart);
			element.removeEventListener("touchend", handleTouchEnd);
			element.removeEventListener("touchmove", handleTouchMove);
		};
	}, [onSwipeLeft, onSwipeRight, enabled]);

	return elementRef;
};

const useDragDetection = (
	activeImages: Array<{ url: string }>,
	currentImageIndex: number,
	nextImage: () => void,
	prevImage: () => void,
	enabled = true,
) => {
	const [dragState, setDragState] = useState({
		isDragging: false,
		startX: 0,
		dragOffset: 0,
	});

	const handleDragStart = (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: { point: { x: number; y: number } },
	) => {
		if (!enabled || activeImages.length <= 1) return;
		setDragState({
			isDragging: true,
			startX: info.point.x,
			dragOffset: 0,
		});
	};

	const handleDrag = (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: { point: { x: number; y: number } },
	) => {
		if (!enabled || activeImages.length <= 1 || !dragState.isDragging) return;
		const offset = info.point.x - dragState.startX;
		setDragState((prev) => ({
			...prev,
			dragOffset: offset,
		}));
	};

	const handleDragEnd = (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: {
			point: { x: number; y: number };
			velocity: { x: number; y: number };
		},
	) => {
		if (!enabled || activeImages.length <= 1) {
			setDragState({ isDragging: false, startX: 0, dragOffset: 0 });
			return;
		}

		const threshold = 100; // Minimum drag distance to trigger swipe
		const velocity = info.velocity.x;
		const offset = dragState.dragOffset;

		// Determine if we should swipe based on drag distance or velocity
		const shouldSwipeRight = offset > threshold || velocity > 500;
		const shouldSwipeLeft = offset < -threshold || velocity < -500;

		if (shouldSwipeRight) {
			prevImage(); // Swipe right shows previous image
		} else if (shouldSwipeLeft) {
			nextImage(); // Swipe left shows next image
		}

		setDragState({ isDragging: false, startX: 0, dragOffset: 0 });
	};

	return {
		dragState,
		handleDragStart,
		handleDrag,
		handleDragEnd,
	};
};

const useImageGallery = (
	selectedSpot: TouristSpotResponseDto | undefined,
	locationInfo: LocationInfoResponseDto | undefined,
) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Reset image index when spot changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setCurrentImageIndex(0);
	}, [selectedSpot?.touristSpotId]);

	// Helper function to validate image URLs
	const isValidImageUrl = (url: string | undefined | null): url is string => {
		return typeof url === "string" && url.trim() !== "";
	};

	// Process images
	const googleImages = locationInfo?.images || [];
	const validGoogleImages = (googleImages as Array<{ url: string }>).filter(
		(img) => isValidImageUrl(img?.url),
	);
	const hasGoogleImages = validGoogleImages.length > 0;

	const mainImageSrc = selectedSpot?.imageSet?.main;
	const hasValidMainImage = mainImageSrc && mainImageSrc.trim() !== "";

	const activeImages = hasGoogleImages
		? validGoogleImages
		: hasValidMainImage
			? [{ url: mainImageSrc }]
			: [];

	// Reset index if out of bounds
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

	return {
		currentImageIndex,
		setCurrentImageIndex,
		activeImages,
		hasGoogleImages,
		hasValidMainImage,
		isValidImageUrl,
		nextImage,
		prevImage,
	};
};

const useLocationData = (selectedSpot: TouristSpotResponseDto | undefined) => {
	const locationData = useLocationInfo({
		query: selectedSpot?.touristSpotName ?? "",
		latitude: selectedSpot?.touristSpotLatitude?.toString(),
		longitude: selectedSpot?.touristSpotLongitude?.toString(),
		address: selectedSpot?.address ?? "",
		enabled: Boolean(selectedSpot?.touristSpotName), // Only call API when we have a valid spot
	});

	// logger.info(
	// 	locationData.locationInfo
	// 		? JSON.stringify(locationData.locationInfo)
	// 		: "No location info",
	// );

	return locationData;
};

// Sub-components
const ImageGallery: React.FC<{
	isLoading: boolean;
	activeImages: Array<{ url: string }>;
	currentImageIndex: number;
	setCurrentImageIndex: (index: number) => void;
	nextImage: () => void;
	prevImage: () => void;
	hasGoogleImages: boolean;
	hasValidMainImage: boolean;
	isValidImageUrl: (url: string | undefined | null) => url is string;
	locationInfo: LocationInfoResponseDto | undefined;
	selectedSpot: TouristSpotResponseDto;
	mainImageSrc: string | undefined;
}> = ({
	isLoading,
	activeImages,
	currentImageIndex,
	setCurrentImageIndex,
	nextImage,
	prevImage,
	hasGoogleImages,
	hasValidMainImage,
	isValidImageUrl,
	locationInfo,
	selectedSpot,
	mainImageSrc,
}) => {
	// Add drag detection for mobile/tablet
	const { dragState, handleDragStart, handleDrag, handleDragEnd } =
		useDragDetection(
			activeImages,
			currentImageIndex,
			nextImage,
			prevImage,
			activeImages.length > 1, // Only enable if multiple images
		);

	return (
		<AnimatePresence mode="wait">
			{isLoading ? (
				<motion.div
					{...ANIMATIONS.loading}
					className="relative h-[25vh] sm:h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
				>
					<Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
					<span className="ml-2 text-sm text-blue-600">
						Loading location info...
					</span>
				</motion.div>
			) : hasGoogleImages || hasValidMainImage ? (
				<motion.div
					{...ANIMATIONS.image}
					className="relative h-[25vh] sm:h-48 group overflow-hidden"
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={0.2}
					onDragStart={handleDragStart}
					onDrag={handleDrag}
					onDragEnd={handleDragEnd}
					style={{
						x: dragState.dragOffset,
					}}
					animate={{
						x: dragState.isDragging ? dragState.dragOffset : 0,
					}}
					transition={{
						type: "spring",
						damping: 30,
						stiffness: 300,
					}}
				>
					{hasGoogleImages
						? activeImages[currentImageIndex]?.url &&
							isValidImageUrl(activeImages[currentImageIndex]?.url) && (
								<Image
									src={activeImages[currentImageIndex].url}
									alt={locationInfo?.name || selectedSpot.touristSpotName}
									fill
									className="object-cover pointer-events-none"
									sizes="(max-width: 380px) 100vw, 380px"
									unoptimized
									draggable={false}
								/>
							)
						: hasValidMainImage &&
							isValidImageUrl(mainImageSrc) && (
								<Image
									src={mainImageSrc}
									alt={selectedSpot.touristSpotName}
									fill
									className="object-cover pointer-events-none"
									sizes="(max-width: 380px) 100vw, 380px"
									draggable={false}
								/>
							)}

					{/* Navigation buttons */}
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
										key={hasGoogleImages ? `google-${index}` : `local-${index}`}
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

					<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
				</motion.div>
			) : (
				<motion.div
					{...ANIMATIONS.image}
					className="relative h-[20vh] sm:h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
				>
					<div className="text-center">
						<AlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
						<span className="text-xs text-gray-500">No images available</span>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const LocationDetails: React.FC<{
	locationInfo: LocationInfoResponseDto | undefined;
	hasLocationInfo: boolean;
	selectedSpot: TouristSpotResponseDto;
}> = ({ locationInfo, hasLocationInfo, selectedSpot }) => (
	<motion.div {...ANIMATIONS.content} transition={{ delay: 0.1 }}>
		<h3 className="font-bold text-lg text-charcoal mb-1 line-clamp-2">
			{hasLocationInfo && locationInfo?.name
				? locationInfo.name
				: selectedSpot.touristSpotName}
		</h3>

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
);

const AddressInfo: React.FC<{
	locationInfo: LocationInfoResponseDto | undefined;
	hasLocationInfo: boolean;
	selectedSpot: TouristSpotResponseDto;
}> = ({ locationInfo, hasLocationInfo, selectedSpot }) => (
	<motion.div
		{...ANIMATIONS.content}
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
);

const ContactInfo: React.FC<{
	locationInfo: LocationInfoResponseDto | undefined;
	hasLocationInfo: boolean;
}> = ({ locationInfo, hasLocationInfo }) => {
	if (
		!hasLocationInfo ||
		!(
			locationInfo?.phoneNumber ||
			locationInfo?.website ||
			locationInfo?.googleMapsUrl
		)
	) {
		return null;
	}

	return (
		<motion.div
			{...ANIMATIONS.content}
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
	);
};

const OpeningHours: React.FC<{
	locationInfo: LocationInfoResponseDto | undefined;
	hasLocationInfo: boolean;
}> = ({ locationInfo, hasLocationInfo }) => {
	if (
		!hasLocationInfo ||
		!locationInfo?.openingHours ||
		locationInfo.openingHours.length === 0
	) {
		return null;
	}

	return (
		<motion.div
			{...ANIMATIONS.content}
			transition={{ delay: 0.35 }}
			className="space-y-1"
		>
			<div className="flex items-center gap-2 text-sm font-medium text-gray-700">
				<Clock className="w-4 h-4" />
				Opening Hours
			</div>
			<div className="text-xs text-gray-600 space-y-0.5 pl-6">
				{locationInfo.openingHours.slice(0, 3).map((hours: string) => (
					<div key={hours}>{hours}</div>
				))}
				{locationInfo.openingHours.length > 3 && (
					<div className="text-gray-500">
						+{locationInfo.openingHours.length - 3} more days
					</div>
				)}
			</div>
		</motion.div>
	);
};

const LocationInfoPanel: React.FC<LocationInfoPanelProps> = ({
	selectedSpot,
	className = "",
	isStatic = false,
	touristSpotList = [],
	onPreviousSpot,
	onNextSpot,
	showNavigation = false,
}) => {
	const { locationInfo, isLoading, isError, error, hasLocationInfo } =
		useLocationData(selectedSpot);

	const {
		currentImageIndex,
		setCurrentImageIndex,
		activeImages,
		hasGoogleImages,
		hasValidMainImage,
		isValidImageUrl,
		nextImage,
		prevImage,
	} = useImageGallery(selectedSpot, locationInfo);

	const mainImageSrc = selectedSpot?.imageSet?.main;

	// Calculate current spot position for navigation
	const currentSpotIndex = touristSpotList.findIndex(
		(spot) => spot.touristSpotId === selectedSpot?.touristSpotId,
	);
	const currentSpotNumber = currentSpotIndex >= 0 ? currentSpotIndex + 1 : 1;
	const hasMultipleSpots = touristSpotList.length > 1;

	if (!selectedSpot) {
		const baseClasses =
			"bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200";
		const positionClasses = isStatic
			? "relative"
			: "absolute bottom-4 left-4 z-[1000]";

		return (
			<motion.div
				{...ANIMATIONS.panel}
				className={`${positionClasses} ${baseClasses} ${className}`}
			>
				<div className="flex items-center gap-2 text-sm text-gray-500">
					<MapPin className="w-4 h-4" />
					Select a tourist spot to view details
				</div>
			</motion.div>
		);
	}

	const baseClasses =
		"bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 overflow-hidden";
	const positionClasses = isStatic
		? "relative w-full"
		: "absolute bottom-4 left-4 z-[1000] min-w-[320px] max-w-[380px]";

	// For mobile fullscreen, limit height and enable scrolling - adjusted for bigger images
	const heightClasses = isStatic
		? "max-h-[50vh] flex flex-col"
		: "max-h-[60vh] flex flex-col";

	return (
		<motion.div
			{...ANIMATIONS.panel}
			className={`${positionClasses} ${baseClasses} ${heightClasses} ${className}`}
		>
			{/* Navigation Controls - Only show if enabled and multiple spots */}
			{showNavigation && hasMultipleSpots && (
				<div className="px-4 py-3 border-b border-gray-200/50 bg-white/95">
					<div className="flex items-center justify-between">
						<button
							type="button"
							onClick={onPreviousSpot}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
							aria-label="Previous tourist spot"
							disabled={!onPreviousSpot}
						>
							<ChevronLeft className="w-5 h-5 text-gray-700" />
						</button>

						<span className="text-sm font-medium text-gray-700 px-3">
							{currentSpotNumber} of {touristSpotList.length}
						</span>

						<button
							type="button"
							onClick={onNextSpot}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
							aria-label="Next tourist spot"
							disabled={!onNextSpot}
						>
							<ChevronRight className="w-5 h-5 text-gray-700" />
						</button>
					</div>
				</div>
			)}

			<ImageGallery
				isLoading={isLoading}
				activeImages={activeImages}
				currentImageIndex={currentImageIndex}
				setCurrentImageIndex={setCurrentImageIndex}
				nextImage={nextImage}
				prevImage={prevImage}
				hasGoogleImages={hasGoogleImages}
				hasValidMainImage={!!hasValidMainImage}
				isValidImageUrl={isValidImageUrl}
				locationInfo={locationInfo}
				selectedSpot={selectedSpot}
				mainImageSrc={mainImageSrc}
			/>

			{/* Content Section - Scrollable */}
			<div className="p-4 space-y-3 overflow-y-auto flex-1 scrollbar-hide">
				<LocationDetails
					locationInfo={locationInfo}
					hasLocationInfo={hasLocationInfo}
					selectedSpot={selectedSpot}
				/>

				<AddressInfo
					locationInfo={locationInfo}
					hasLocationInfo={hasLocationInfo}
					selectedSpot={selectedSpot}
				/>

				<ContactInfo
					locationInfo={locationInfo}
					hasLocationInfo={hasLocationInfo}
				/>

				{/* Best Visit Time */}
				{selectedSpot.bestVisitTime && (
					<motion.div
						{...ANIMATIONS.content}
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
						{...ANIMATIONS.content}
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

				<OpeningHours
					locationInfo={locationInfo}
					hasLocationInfo={hasLocationInfo}
				/>

				{/* Hashtags */}
				{selectedSpot.touristSpotHashtag &&
					selectedSpot.touristSpotHashtag.length > 0 && (
						<motion.div
							{...ANIMATIONS.content}
							transition={{ delay: 0.4 }}
							className="flex flex-wrap gap-1"
						>
							{selectedSpot.touristSpotHashtag.slice(0, 4).map((tag) => (
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
