"use client";
import type { ModelRouteResponseDto } from "@/api/generated";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import LeafletMapView from "./leaflet-map-view";
import TouristSpotMarkers from "./tourist-spot-markers";
import LocationInfoPanel from "./location-info-panel";

interface MapModalProps {
	isOpen: boolean;
	onClose: () => void;
	modelRoute: ModelRouteResponseDto;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, modelRoute }) => {
	const [selectedTouristSpotId, setSelectedTouristSpotId] = useState<
		string | undefined
	>();
	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
	const [map, setMap] = useState<any>(null);

	const selectedSpot = modelRoute.touristSpotList.find(
		(spot) => spot.touristSpotId === selectedTouristSpotId,
	);

	const mapCenter: [number, number] = [
		modelRoute.regionLatitude,
		modelRoute.regionLongitude,
	];

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
					onClick={onClose}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
							<h2 className="text-lg font-bold text-charcoal">
								{modelRoute.routeName} - Map View
							</h2>
							<button
								type="button"
								onClick={onClose}
								className="p-2 hover:bg-gray-100 rounded-full transition-colors"
							>
								<X className="w-5 h-5 text-gray-500" />
							</button>
						</div>

						{/* Map Container */}
						<div className="relative h-[calc(100%-80px)]">
							<LeafletMapView
								center={mapCenter}
								zoom={12}
								onMapReady={setMap}
								className="h-full w-full"
							>
								<TouristSpotMarkers
									touristSpots={modelRoute.touristSpotList}
									selectedSpotId={selectedTouristSpotId}
									onSpotSelect={setSelectedTouristSpotId}
									map={map}
								/>
								<LocationInfoPanel selectedSpot={selectedSpot} />
							</LeafletMapView>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default MapModal;
