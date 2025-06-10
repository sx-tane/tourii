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

interface ModelRouteMapWrapperProps {
	modelRoute: ModelRouteResponseDto;
	className?: string;
}

const ModelRouteMapWrapper: React.FC<ModelRouteMapWrapperProps> = ({
	modelRoute,
	className = "",
}) => {
	const [selectedTouristSpotId, setSelectedTouristSpotId] = useState<
		string | undefined
	>();
	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
	const [map, setMap] = useState<any>(null);
	const [isMapReady, setIsMapReady] = useState(false);
	const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	// Check if mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Auto-select first tourist spot immediately
	useEffect(() => {
		if (modelRoute.touristSpotList.length > 0 && !selectedTouristSpotId) {
			setSelectedTouristSpotId(modelRoute.touristSpotList[0]?.touristSpotId);
		}
	}, [modelRoute.touristSpotList, selectedTouristSpotId]);

	const selectedSpot = modelRoute.touristSpotList.find(
		(spot) => spot.touristSpotId === selectedTouristSpotId,
	);

	// Ensure we always have a selected spot for the info panel
	const displayedSelectedSpot = selectedSpot || modelRoute.touristSpotList[0];

	// Center map on first tourist spot if available, otherwise use region center
	const firstSpot = modelRoute.touristSpotList[0];
	const mapCenter: [number, number] = firstSpot
		? [firstSpot.touristSpotLatitude, firstSpot.touristSpotLongitude]
		: [modelRoute.regionLatitude, modelRoute.regionLongitude];

	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
	const handleMapReady = (mapInstance: any) => {
		setMap(mapInstance);
		setIsMapReady(true);
	};

	// Mobile View - Show button to open modal
	if (isMobile) {
		return (
			<>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: false }}
					transition={{ duration: 0.5 }}
					className={`bg-warmGrey2 rounded-3xl p-6 ${className}`}
				>
					<div className="text-center">
						<motion.div
							className="mx-4 text-xs sm:text-sm lg:text-sm font-bold tracking-widest text-charcoal uppercase mb-6"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
						>
							Interactive Map
						</motion.div>

						<button
							type="button"
							onClick={() => setIsMobileModalOpen(true)}
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
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: false }}
			transition={{ duration: 0.5 }}
			className={`bg-warmGrey2 rounded-3xl overflow-hidden ${className}`}
		>
			{/* Header */}
			<motion.div
				className="px-6 py-4 border-b border-gray-200/50"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: false }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				<div className="flex items-center justify-between">
					<h2 className="text-sm font-bold tracking-widest text-charcoal uppercase">
						Interactive Route Map
					</h2>
					<span className="text-xs text-gray-600">
						{modelRoute.touristSpotList.length} Destinations
					</span>
				</div>
			</motion.div>

			{/* Main Content */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-full">
				{/* Map Section */}
				<motion.div
					className="lg:col-span-2 relative"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: false }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<LeafletMapView
						center={mapCenter}
						zoom={12}
						onMapReady={handleMapReady}
						className="h-full w-full"
					>
						{isMapReady && (
							<TouristSpotMarkers
								touristSpots={modelRoute.touristSpotList}
								selectedSpotId={selectedTouristSpotId}
								onSpotSelect={setSelectedTouristSpotId}
								map={map}
							/>
						)}
						<LocationInfoPanel selectedSpot={displayedSelectedSpot} />
					</LeafletMapView>
				</motion.div>

				{/* Sidebar */}
				<motion.div
					className="bg-white border-l border-gray-200/50 overflow-y-auto"
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: false }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<SpotDetailSidebar
						selectedSpot={selectedSpot}
						className="border-0 shadow-none rounded-none h-full"
					/>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default ModelRouteMapWrapper;
