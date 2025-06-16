"use client";
import type { ModelRouteResponseDto } from "@/api/generated";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Map as MapIcon, Maximize2 } from "lucide-react";
import LeafletMapView from "./leaflet-map-view";
import TouristSpotMarkers from "./tourist-spot-markers";
import LocationInfoPanel from "./location-info-panel";
import SpotDetailSidebar from "./spot-detail-sidebar";
import MapModal from "./map-modal";

// Constants
const MOBILE_BREAKPOINT = 768;
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

// Custom hooks
const useMobileDetection = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return isMobile;
};

const useTouristSpotSelection = (
	touristSpotList: ModelRouteResponseDto["touristSpotList"],
) => {
	const [selectedTouristSpotId, setSelectedTouristSpotId] = useState<
		string | undefined
	>();

	// Auto-select first tourist spot immediately
	useEffect(() => {
		if (touristSpotList.length > 0 && !selectedTouristSpotId) {
			setSelectedTouristSpotId(touristSpotList[0]?.touristSpotId);
		}
	}, [touristSpotList, selectedTouristSpotId]);

	const selectedSpot = touristSpotList.find(
		(spot) => spot.touristSpotId === selectedTouristSpotId,
	);

	// Ensure we always have a selected spot for the info panel
	const displayedSelectedSpot = selectedSpot || touristSpotList[0];

	return {
		selectedTouristSpotId,
		setSelectedTouristSpotId,
		selectedSpot,
		displayedSelectedSpot,
	};
};

const useMapInitialization = () => {
	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
	const [map, setMap] = useState<any>(null);
	const [isMapReady, setIsMapReady] = useState(false);

	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
	const handleMapReady = (mapInstance: any) => {
		setMap(mapInstance);
		setIsMapReady(true);
	};

	return { map, isMapReady, handleMapReady };
};

const getMapCenter = (modelRoute: ModelRouteResponseDto): [number, number] => {
	const firstSpot = modelRoute.touristSpotList[0];
	return firstSpot
		? [firstSpot.touristSpotLatitude, firstSpot.touristSpotLongitude]
		: [modelRoute.regionLatitude, modelRoute.regionLongitude];
};

// Sub-components
const MobileMapButton: React.FC<{
	modelRoute: ModelRouteResponseDto;
	onOpenModal: () => void;
	className?: string;
}> = ({ modelRoute, onOpenModal, className }) => (
	<motion.div
		{...ANIMATIONS.main}
		className={`bg-warmGrey2 rounded-3xl p-6 ${className}`}
	>
		<div className="text-center">
			<motion.div
				className="mx-4 text-xs sm:text-sm lg:text-sm font-bold tracking-widest text-charcoal uppercase mb-6"
				{...ANIMATIONS.header}
			>
				Interactive Map
			</motion.div>

			<button
				type="button"
				onClick={onOpenModal}
				className="inline-flex items-center gap-3 bg-charcoal hover:bg-charcoal/90 text-white px-6 py-4 rounded-full font-medium transition-colors"
			>
				<MapIcon className="w-5 h-5" />
				<span>Explore Route Map</span>
				<Maximize2 className="w-4 h-4" />
			</button>

			<p className="text-sm text-gray-600 mt-3">
				View all {modelRoute.touristSpotList.length} tourist spots on an
				interactive map
			</p>
		</div>
	</motion.div>
);

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
}) => (
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
		<LocationInfoPanel selectedSpot={displayedSelectedSpot} />
	</motion.div>
);
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
	const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

	const isMobile = useMobileDetection();
	const {
		selectedTouristSpotId,
		setSelectedTouristSpotId,
		selectedSpot,
		displayedSelectedSpot,
	} = useTouristSpotSelection(modelRoute.touristSpotList);
	const { map, isMapReady, handleMapReady } = useMapInitialization();

	const mapCenter = getMapCenter(modelRoute);

	// Mobile View - Show button to open modal
	if (isMobile) {
		return (
			<>
				<MobileMapButton
					modelRoute={modelRoute}
					onOpenModal={() => setIsMobileModalOpen(true)}
					className={className}
				/>
				<MapModal
					isOpen={isMobileModalOpen}
					onClose={() => setIsMobileModalOpen(false)}
					modelRoute={modelRoute}
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
						onSpotSelect={setSelectedTouristSpotId}
						displayedSelectedSpot={displayedSelectedSpot}
					/>

					<SidebarContainer
						selectedSpot={selectedSpot}
						touristSpotList={modelRoute.touristSpotList}
						onSpotSelect={setSelectedTouristSpotId}
					/>
				</div>
			)}
		</motion.div>
	);
};

export default ModelRouteMapWrapper;
