"use client";
import type { ModelRouteResponseDto } from "@/api/generated";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type SyntheticEvent, useEffect, useRef } from "react";
import {
	Map as MapIcon,
	Maximize2,
	X,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import {
	useResponsiveDetection,
	useMapInitialization,
	useTouristSpotSelection,
} from "@/hooks";
import dynamic from "next/dynamic";
import TouristSpotMarkers from "./tourist-spot-markers";
import LocationInfoPanel from "./location-info-panel";
import SpotDetailSidebar from "./spot-detail-sidebar";
import MapErrorBoundary from "@/components/common/map-error-boundary";
import MapLoadingSkeleton from "./map-loading-skeleton";

const LeafletMapView = dynamic(() => import("./leaflet-map-view"), {
	loading: () => <MapLoadingSkeleton />,
	ssr: false,
});

// Constants
const DEFAULT_ZOOM = 12;

// Animation configurations
const ANIMATIONS = {
	main: {
		initial: { opacity: 0, y: 20 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: false },
		transition: { duration: 0.5 },
	},
	header: {
		initial: { opacity: 0 },
		whileInView: { opacity: 1 },
		viewport: { once: false },
		transition: { duration: 0.5, delay: 0.1 },
	},
	map: {
		initial: { opacity: 0 },
		whileInView: { opacity: 1 },
		viewport: { once: false },
		transition: { duration: 0.5, delay: 0.2 },
	},
	sidebar: {
		initial: { opacity: 0, x: 20 },
		whileInView: { opacity: 1, x: 0 },
		viewport: { once: false },
		transition: { duration: 0.5, delay: 0.3 },
	},
};

interface ModelRouteMapWrapperProps {
	modelRoute: ModelRouteResponseDto;
	className?: string;
}

// Utility function for getting map center

const getMapCenter = (modelRoute: ModelRouteResponseDto): [number, number] => {
	const firstSpot = modelRoute.touristSpotList[0];
	return firstSpot
		? [firstSpot.touristSpotLatitude, firstSpot.touristSpotLongitude]
		: [modelRoute.regionLatitude, modelRoute.regionLongitude];
};

// Sub-components
const MobileTabletView: React.FC<{
	modelRoute: ModelRouteResponseDto;
	onOpenModal: () => void;
	selectedSpot: ModelRouteResponseDto["touristSpotList"][number] | undefined;
	touristSpotList: ModelRouteResponseDto["touristSpotList"];
	onSpotSelect: (id: string | undefined) => void;
	className?: string;
}> = ({
	modelRoute,
	onOpenModal,
	selectedSpot,
	touristSpotList,
	onSpotSelect,
	className,
}) => (
	<motion.div
		{...ANIMATIONS.main}
		className={`bg-warmGrey2 rounded-3xl overflow-hidden relative ${className}`}
	>
		{/* Header */}
		<div className="pt-8  text-center">
			<motion.div
				className="mx-4 text-xs sm:text-sm font-bold tracking-widest text-charcoal uppercase"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: false }}
				transition={{ duration: 0.5 }}
			>
				{"Route Details".split(" ").map((word, i) => (
					<motion.span
						key={`mobile-header-${word}`}
						className="inline-block mr-[0.25em]"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false }}
						transition={{
							duration: 0.4,
							delay: 0.05 + i * 0.05,
							ease: [0.6, 0.05, 0.01, 0.9],
						}}
					>
						{word}
					</motion.span>
				))}
			</motion.div>
		</div>

		{/* Spot Details */}
		<div className="h-[70vh] sm:h-[60vh]">
			<SpotDetailSidebar
				selectedSpot={selectedSpot}
				touristSpotList={touristSpotList}
				onSpotSelect={onSpotSelect}
			/>
		</div>

		{/* Map Button - Always at bottom */}
		<motion.button
			type="button"
			onClick={onOpenModal}
			className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors z-10"
			initial={{ opacity: 0, scale: 0.8 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: false }}
			transition={{
				duration: 0.4,
				delay: 0.3,
				ease: [0.6, 0.05, 0.01, 0.9],
			}}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<MapIcon className="w-4 h-4" />
			<span className="hidden sm:inline">View Map</span>
			<Maximize2 className="w-3 h-3" />
		</motion.button>
	</motion.div>
);

const FullscreenMapView: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	modelRoute: ModelRouteResponseDto;
	selectedSpot: ModelRouteResponseDto["touristSpotList"][number] | undefined;
	touristSpotList: ModelRouteResponseDto["touristSpotList"];
	onSpotSelect: (id: string | undefined) => void;
	map: L.Map | null;
	isMapReady: boolean;
	handleMapReady: (mapInstance: L.Map) => void;
	mapCenter: [number, number];
}> = ({
	isOpen,
	onClose,
	modelRoute,
	selectedSpot,
	touristSpotList,
	onSpotSelect,
	map,
	isMapReady,
	handleMapReady,
	mapCenter,
}) => {
	// Only show selected spot info, don't auto-default to first spot
	const displayedSelectedSpot = selectedSpot;
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (dialog) {
			if (isOpen) {
				dialog.showModal();
			} else {
				dialog.close();
			}
		}
	}, [isOpen]);

	const handleBackgroundClick = (e: SyntheticEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onSpotSelect(undefined);
		}
	};

	// Navigation functions
	const goToPreviousSpot = () => {
		const currentIndex = touristSpotList.findIndex(
			(spot) => spot.touristSpotId === selectedSpot?.touristSpotId,
		);
		const previousIndex =
			currentIndex > 0 ? currentIndex - 1 : touristSpotList.length - 1;
		onSpotSelect(touristSpotList[previousIndex]?.touristSpotId);
	};

	const goToNextSpot = () => {
		const currentIndex = touristSpotList.findIndex(
			(spot) => spot.touristSpotId === selectedSpot?.touristSpotId,
		);
		const nextIndex =
			currentIndex < touristSpotList.length - 1 ? currentIndex + 1 : 0;
		onSpotSelect(touristSpotList[nextIndex]?.touristSpotId);
	};

	const currentSpotIndex = touristSpotList.findIndex(
		(spot) => spot.touristSpotId === selectedSpot?.touristSpotId,
	);
	const currentSpotNumber = currentSpotIndex >= 0 ? currentSpotIndex + 1 : 1;

	// For mobile fullscreen map:
	// - When no spot selected: show original center to display all markers
	// - When spot selected: position marker in visible area (top half, but not too high)
	const adjustedMapCenter: [number, number] = selectedSpot
		? [
				selectedSpot.touristSpotLatitude - 0.003, // Small offset to position marker at top 25% of visible area
				selectedSpot.touristSpotLongitude,
			]
		: mapCenter; // Show all markers when no spot is selected

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-[99999] bg-warmGrey"
				>
					<dialog
						ref={dialogRef}
						onClose={onClose}
						className="bg-transparent p-0 m-0 w-screen h-screen max-w-full max-h-full"
					>
						{/* Cross Button */}
						<motion.button
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ delay: 0.2 }}
							type="button"
							onClick={onClose}
							className="absolute top-4 right-4 z-[99999] bg-warmGrey2 backdrop-blur-sm shadow-xl rounded-full p-3 hover:bg-warmGrey2 hover:shadow-2xl transition-all duration-200"
							aria-label="Close map"
						>
							<X className="w-6 h-6 text-charcoal" />
						</motion.button>

						{/* Fullscreen Map */}
						<div
							className="relative w-full h-full z-0"
							style={{ width: "100vw", height: "100vh" }}
							onClick={handleBackgroundClick}
							onKeyDown={(e) => {
								if (e.key === "Escape") {
									onClose();
								}
							}}
							role="document"
							tabIndex={-1}
						>
							<MapErrorBoundary>
								<LeafletMapView
									center={adjustedMapCenter}
									zoom={selectedSpot ? 16 : 12}
									onMapReady={(mapInstance) => {
										handleMapReady(mapInstance);
									}}
									className="h-full w-full relative z-0"
								>
									{isMapReady && (
										<TouristSpotMarkers
											touristSpots={touristSpotList}
											selectedSpotId={selectedSpot?.touristSpotId}
											onSpotSelect={onSpotSelect}
											map={map || undefined}
											disableAutoCenter={true} // Disable auto-centering for mobile fullscreen
										/>
									)}
								</LeafletMapView>
							</MapErrorBoundary>
							{/* Enhanced Location Info Panel - Half screen on mobile/tablet */}
							<div className="absolute bottom-0 left-0 right-0 z-[9998] h-1/2 pointer-events-none">
								{/* Navigation buttons above the panel */}
								{displayedSelectedSpot && touristSpotList.length > 1 && (
									<div className="absolute -top-12 left-4 z-10 flex gap-1 pointer-events-auto">
										<button
											type="button"
											onClick={goToPreviousSpot}
											className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-colors"
											aria-label="Previous tourist spot"
										>
											<ChevronLeft className="w-4 h-4" />
										</button>

										<button
											type="button"
											onClick={goToNextSpot}
											className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-colors"
											aria-label="Next tourist spot"
										>
											<ChevronRight className="w-4 h-4" />
										</button>
									</div>
								)}
								{displayedSelectedSpot ? (
									<LocationInfoPanel
										selectedSpot={displayedSelectedSpot}
										isStatic={false}
										className="!relative !bottom-auto !left-auto !min-w-full !max-w-full h-full w-full pointer-events-auto"
										touristSpotList={touristSpotList}
										onPreviousSpot={goToPreviousSpot}
										onNextSpot={goToNextSpot}
										showNavigation={false}
									/>
								) : (
									<div className="h-full flex items-center justify-center p-4 pointer-events-none">
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl pointer-events-auto"
											onClick={(e) => {
												// Prevent closing when clicking on the message itself
												e.stopPropagation();
											}}
										>
											<div className="text-center text-charcoal">
												<div className="text-lg font-medium mb-2">
													Select a Tourist Spot
												</div>
												<div className="text-sm">
													Tap on any marker to see details
												</div>
											</div>
										</motion.div>
									</div>
								)}
							</div>
						</div>
					</dialog>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const DesktopMapHeader: React.FC<{
	modelRoute: ModelRouteResponseDto;
}> = ({ modelRoute }) => {
	const titleWords = "Route Details".split(" ");

	return (
		<motion.div
			className="pt-8 pb-4 mx-auto w-full flex items-center justify-center"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: false, amount: 0.5 }}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				className="text-sm font-bold tracking-widest text-charcoal uppercase"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: false }}
				transition={{ duration: 0.5 }}
			>
				{titleWords.map((word, i) => (
					<motion.span
						key={`header-${word}`}
						className="inline-block mr-[0.25em]"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false }}
						transition={{
							duration: 0.4,
							delay: 0.05 + i * 0.05,
							ease: [0.6, 0.05, 0.01, 0.9],
						}}
					>
						{word}
					</motion.span>
				))}
			</motion.div>
		</motion.div>
	);
};

const MapContainer: React.FC<{
	mapCenter: [number, number];
	onMapReady: (mapInstance: L.Map) => void;
	isMapReady: boolean;
	map: L.Map | null;
	touristSpotList: ModelRouteResponseDto["touristSpotList"];
	selectedTouristSpotId: string | undefined;
	onSpotSelect: (id: string | undefined) => void;
	displayedSelectedSpot:
		| ModelRouteResponseDto["touristSpotList"][number]
		| undefined;
}> = ({
	mapCenter,
	onMapReady,
	isMapReady,
	map,
	touristSpotList,
	selectedTouristSpotId,
	onSpotSelect,
	displayedSelectedSpot,
}) => {
	// Navigation functions for desktop
	const goToPreviousSpot = () => {
		const currentIndex = touristSpotList.findIndex(
			(spot) => spot.touristSpotId === selectedTouristSpotId,
		);
		const previousIndex =
			currentIndex > 0 ? currentIndex - 1 : touristSpotList.length - 1;
		onSpotSelect(touristSpotList[previousIndex]?.touristSpotId);
	};

	const goToNextSpot = () => {
		const currentIndex = touristSpotList.findIndex(
			(spot) => spot.touristSpotId === selectedTouristSpotId,
		);
		const nextIndex =
			currentIndex < touristSpotList.length - 1 ? currentIndex + 1 : 0;
		onSpotSelect(touristSpotList[nextIndex]?.touristSpotId);
	};

	const currentSpotIndex = touristSpotList.findIndex(
		(spot) => spot.touristSpotId === selectedTouristSpotId,
	);
	const currentSpotNumber = currentSpotIndex >= 0 ? currentSpotIndex + 1 : 1;

	return (
		<motion.div
			className="lg:col-span-2 relative h-full rounded-3xl border-mustard border-2 overflow-hidden"
			{...ANIMATIONS.map}
		>
			<MapErrorBoundary>
				<LeafletMapView
					center={mapCenter}
					zoom={DEFAULT_ZOOM}
					onMapReady={onMapReady}
					className="h-full w-full relative z-0"
				>
					{isMapReady && map && (
						<TouristSpotMarkers
							touristSpots={touristSpotList}
							selectedSpotId={selectedTouristSpotId}
							onSpotSelect={onSpotSelect}
							map={map}
						/>
					)}
				</LeafletMapView>
			</MapErrorBoundary>

			{/* Desktop Navigation Controls - Floating style like mobile */}
			{touristSpotList.length > 1 && (
				<div className="absolute top-4 left-4 z-[1001]">
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="flex items-center gap bg-red border-mustard border-2 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
					>
						<button
							type="button"
							onClick={goToPreviousSpot}
							className="p-1 hover:bg-mustard rounded-full transition-colors"
							aria-label="Previous tourist spot"
						>
							<ChevronLeft className="w-4 h-4 text-mustard hover:text-red" />
						</button>

						<span className="text-xs font-semibold text-mustard tracking-widest min-w-[60px] text-center">
							{currentSpotNumber} of {touristSpotList.length}
						</span>

						<button
							type="button"
							onClick={goToNextSpot}
							className="p-1 hover:bg-mustard rounded-full transition-colors"
							aria-label="Next tourist spot"
						>
							<ChevronRight className="w-4 h-4 text-mustard hover:text-red" />
						</button>
					</motion.div>
				</div>
			)}

			<LocationInfoPanel selectedSpot={displayedSelectedSpot} />
		</motion.div>
	);
};
const SidebarContainer: React.FC<{
	selectedSpot: ModelRouteResponseDto["touristSpotList"][number] | undefined;
	touristSpotList: ModelRouteResponseDto["touristSpotList"];
	onSpotSelect: (id: string | undefined) => void;
}> = ({ selectedSpot, touristSpotList, onSpotSelect }) => (
	<motion.div
		className="lg:col-span-1  h-full overflow-hidden"
		{...ANIMATIONS.sidebar}
	>
		<SpotDetailSidebar
			selectedSpot={selectedSpot}
			touristSpotList={touristSpotList}
			onSpotSelect={onSpotSelect}
			className="border-0 shadow-none rounded-none h-full"
		/>
	</motion.div>
);

const ModelRouteMapWrapper: React.FC<ModelRouteMapWrapperProps> = ({
	modelRoute,
	className = "",
}) => {
	const [isMapModalOpen, setIsMapModalOpen] = useState(false);

	const { isMobileTablet, isInitialized } = useResponsiveDetection();
	const {
		selectedTouristSpotId,
		setSelectedTouristSpotId,
		selectedSpot,
		displayedSelectedSpot,
		selectFirstSpot,
	} = useTouristSpotSelection(modelRoute.touristSpotList);
	const { map, isMapReady, handleMapReady } = useMapInitialization(
		modelRoute.touristSpotList,
	);

	const mapCenter = getMapCenter(modelRoute);

	// Mobile/Tablet View - Show spot details with fullscreen map
	// Only use mobile view if responsive detection is initialized and it's actually mobile/tablet
	if (isInitialized && isMobileTablet) {
		return (
			<>
				<MobileTabletView
					modelRoute={modelRoute}
					onOpenModal={() => setIsMapModalOpen(true)}
					selectedSpot={selectedSpot}
					touristSpotList={modelRoute.touristSpotList}
					onSpotSelect={setSelectedTouristSpotId}
					className={className}
				/>
				<FullscreenMapView
					isOpen={isMapModalOpen}
					onClose={() => setIsMapModalOpen(false)}
					modelRoute={modelRoute}
					selectedSpot={selectedSpot}
					touristSpotList={modelRoute.touristSpotList}
					onSpotSelect={setSelectedTouristSpotId}
					map={map}
					isMapReady={isMapReady}
					handleMapReady={handleMapReady}
					mapCenter={mapCenter}
				/>
			</>
		);
	}

	// Desktop View - Full map layout
	return (
		<motion.div
			{...ANIMATIONS.main}
			className={`bg-warmGrey2 rounded-s-3xl overflow-hidden pb-10 min-h-[600px] ${className}`}
		>
			<DesktopMapHeader modelRoute={modelRoute} />

			{/* Main Content */}
			{modelRoute.touristSpotList.length > 0 ? (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-[80vh] my-2 mx-10">
					<MapContainer
						mapCenter={mapCenter}
						onMapReady={handleMapReady}
						isMapReady={isMapReady}
						map={map}
						touristSpotList={modelRoute.touristSpotList}
						selectedTouristSpotId={selectedTouristSpotId}
						onSpotSelect={(spotId) => {
							if (!selectedTouristSpotId) selectFirstSpot(); // Auto-select first on first interaction
							setSelectedTouristSpotId(spotId);
						}}
						displayedSelectedSpot={displayedSelectedSpot}
					/>

					<SidebarContainer
						selectedSpot={selectedSpot}
						touristSpotList={modelRoute.touristSpotList}
						onSpotSelect={(spotId) => {
							if (!selectedTouristSpotId) selectFirstSpot(); // Auto-select first on first interaction
							setSelectedTouristSpotId(spotId);
						}}
					/>
				</div>
			) : (
				<div className="flex items-center justify-center h-[400px] mx-10">
					<div className="text-center text-charcoal">
						{modelRoute.touristSpotList.length === 0 ? (
							<>
								<div className="text-lg font-medium mb-2">
									No Tourist Spots Available
								</div>
								<div className="text-sm opacity-70">
									This route doesn't have any tourist spots to display.
								</div>
							</>
						) : !map ? (
							<>
								<div className="text-lg font-medium mb-2">Loading Map...</div>
								<div className="text-sm opacity-70">
									Please wait while the map initializes.
								</div>
							</>
						) : null}
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default ModelRouteMapWrapper;
