"use client";
import type { ModelRouteResponseDto } from "@/api/generated";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
import LeafletMapView from "./leaflet-map-view";
import TouristSpotMarkers from "./tourist-spot-markers";
import LocationInfoPanel from "./location-info-panel";
import SpotDetailSidebar from "./spot-detail-sidebar";

// Constants
const DESKTOP_BREAKPOINT = 1024; // Tailwind lg breakpoint
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
		className={`bg-warmGrey2 rounded-3xl overflow-hidden ${className}`}
	>
		{/* Header with Map Button */}
		<div className="px-4 py-3 bg-white border-b border-gray-200/50 flex items-center justify-between">
			<motion.div
				className="text-xs sm:text-sm font-bold tracking-widest text-charcoal uppercase"
				{...ANIMATIONS.header}
			>
				Route Details ({touristSpotList.length} stops)
			</motion.div>
			<button
				type="button"
				onClick={onOpenModal}
				className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
			>
				<MapIcon className="w-4 h-4" />
				<span className="hidden sm:inline">View Map</span>
				<Maximize2 className="w-3 h-3" />
			</button>
		</div>

		{/* Spot Details */}
		<div className="h-[70vh] sm:h-[60vh]">
			<SpotDetailSidebar
				selectedSpot={selectedSpot}
				touristSpotList={touristSpotList}
				onSpotSelect={onSpotSelect}
				className="border-0 shadow-none rounded-none h-full"
			/>
		</div>
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
	// - When spot selected: use selected spot's coordinates with offset to avoid location panel
	const adjustedMapCenter: [number, number] = selectedSpot
		? [
				selectedSpot.touristSpotLatitude + 0.03, // Shift selected spot north to avoid location panel
				selectedSpot.touristSpotLongitude,
			]
		: mapCenter; // Show all markers when no spot is selected

	console.log('FullscreenMapView render - isOpen:', isOpen);
	
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-[99999] bg-white"
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						width: "100vw",
						height: "100vh",
						margin: 0,
						padding: 0,
					}}
				>
						{/* Cross Button */}
						<motion.button
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ delay: 0.2 }}
							type="button"
							onClick={onClose}
							className="absolute top-4 right-4 z-[99999] bg-white/95 backdrop-blur-sm shadow-xl rounded-full p-3 hover:bg-white hover:shadow-2xl transition-all duration-200"
							aria-label="Close map"
						>
							<X className="w-6 h-6 text-gray-700" />
						</motion.button>

						{/* Fullscreen Map */}
						<div
							className="relative w-full h-full z-0"
							style={{ width: "100vw", height: "100vh" }}
						>
							<LeafletMapView
								center={adjustedMapCenter}
								zoom={12}
								onMapReady={handleMapReady}
								className="h-full w-full relative z-0"
							>
								{isMapReady && (
									<TouristSpotMarkers
										touristSpots={touristSpotList}
										selectedSpotId={selectedSpot?.touristSpotId}
										onSpotSelect={onSpotSelect}
										map={map || undefined}
									/>
								)}
							</LeafletMapView>

							{/* Enhanced Location Info Panel */}
							<div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-[9999] pointer-events-auto">
								{displayedSelectedSpot ? (
									<LocationInfoPanel
										selectedSpot={displayedSelectedSpot}
										isStatic={true}
										className="max-w-none shadow-2xl"
										touristSpotList={touristSpotList}
										onPreviousSpot={goToPreviousSpot}
										onNextSpot={goToNextSpot}
										showNavigation={touristSpotList.length > 1}
									/>
								) : (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-200"
									>
										<div className="text-center text-gray-600">
											<div className="text-lg font-medium mb-2">
												Select a Tourist Spot
											</div>
											<div className="text-sm">
												Tap on any marker to see details
											</div>
										</div>
									</motion.div>
								)}
							</div>
						</div>
					</motion.div>
				)}
		</AnimatePresence>
	);
};

const DesktopMapHeader: React.FC<{
	touristSpotCount: number;
}> = ({ touristSpotCount }) => (
	<motion.div
		className="px-6 py-4 border-b border-gray-200/50"
		{...ANIMATIONS.header}
	>
		<div className="flex items-center justify-between">
			<h2 className="text-sm font-bold tracking-widest text-charcoal uppercase">
				Interactive Route Map
			</h2>
			<span className="text-xs text-gray-600">
				{touristSpotCount} Destinations
			</span>
		</div>
	</motion.div>
);

const MapContainer: React.FC<{
	mapCenter: [number, number];
	onMapReady: (mapInstance: L.Map) => void;
	isMapReady: boolean;
	map: L.Map;
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
		<motion.div className="lg:col-span-5 relative h-full" {...ANIMATIONS.map}>
			<LeafletMapView
				center={mapCenter}
				zoom={DEFAULT_ZOOM}
				onMapReady={onMapReady}
				className="h-full w-full"
			>
				{isMapReady && (
					<TouristSpotMarkers
						touristSpots={touristSpotList}
						selectedSpotId={selectedTouristSpotId}
						onSpotSelect={onSpotSelect}
						map={map}
					/>
				)}
			</LeafletMapView>

			{/* Desktop Navigation Controls - Floating style like mobile */}
			{touristSpotList.length > 1 && (
				<div className="absolute top-4 left-4 z-[1001]">
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200"
					>
						<button
							type="button"
							onClick={goToPreviousSpot}
							className="p-1 hover:bg-gray-100 rounded-full transition-colors"
							aria-label="Previous tourist spot"
						>
							<ChevronLeft className="w-5 h-5 text-gray-700" />
						</button>

						<span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
							{currentSpotNumber} of {touristSpotList.length}
						</span>

						<button
							type="button"
							onClick={goToNextSpot}
							className="p-1 hover:bg-gray-100 rounded-full transition-colors"
							aria-label="Next tourist spot"
						>
							<ChevronRight className="w-5 h-5 text-gray-700" />
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
		className="lg:col-span-2 bg-white border-l border-gray-200/50 h-full overflow-hidden"
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

	const { isMobileTablet } = useResponsiveDetection();
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

	console.log('ModelRouteMapWrapper - isMobileTablet:', isMobileTablet, 'isMapModalOpen:', isMapModalOpen);

	// Mobile/Tablet View - Show spot details with fullscreen map
	if (isMobileTablet) {
		return (
			<>
				<MobileTabletView
					modelRoute={modelRoute}
					onOpenModal={() => {
						console.log('Opening map modal...');
						setIsMapModalOpen(true);
					}}
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
			className={`bg-warmGrey2 rounded-3xl overflow-hidden ${className}`}
		>
			<DesktopMapHeader touristSpotCount={modelRoute.touristSpotList.length} />

			{/* Main Content */}
			{modelRoute.touristSpotList.length > 0 && (
				<div className="grid grid-cols-1 lg:grid-cols-7 gap-0 h-[80vh]">
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
			)}
		</motion.div>
	);
};

export default ModelRouteMapWrapper;
