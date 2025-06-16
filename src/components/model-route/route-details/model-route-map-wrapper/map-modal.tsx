"use client";
import type { ModelRouteResponseDto } from "@/api/generated";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapIcon, List } from "lucide-react";
import { useState, useEffect } from "react";
import LeafletMapView from "./leaflet-map-view";
import TouristSpotMarkers from "./tourist-spot-markers";
import LocationInfoPanel from "./location-info-panel";
import SpotDetailSidebar from "./spot-detail-sidebar";

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
	const [activeTab, setActiveTab] = useState<"map" | "details">("map");

	// Auto-select first tourist spot when modal opens
	useEffect(() => {
		if (
			isOpen &&
			modelRoute.touristSpotList.length > 0 &&
			!selectedTouristSpotId
		) {
			setSelectedTouristSpotId(modelRoute.touristSpotList[0]?.touristSpotId);
		}
	}, [isOpen, modelRoute.touristSpotList, selectedTouristSpotId]);

	const selectedSpot = modelRoute.touristSpotList.find(
		(spot) => spot.touristSpotId === selectedTouristSpotId,
	);

	const displayedSelectedSpot = selectedSpot || modelRoute.touristSpotList[0];
	const mapCenter: [number, number] =
		modelRoute.touristSpotList.length > 0 && modelRoute.touristSpotList[0]
			? [
					modelRoute.touristSpotList[0]?.touristSpotLatitude ??
						modelRoute.regionLatitude,
					modelRoute.touristSpotList[0]?.touristSpotLongitude ??
						modelRoute.regionLongitude,
				]
			: [modelRoute.regionLatitude, modelRoute.regionLongitude];

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
							<motion.h2
								className="text-lg font-bold text-charcoal"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								{modelRoute.routeName.split(" ").map((word, i) => (
									<motion.span
										key={`modal-title-${word}`}
										className="inline-block mr-[0.25em]"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.4,
											delay: 0.1 + i * 0.05,
											ease: [0.6, 0.05, 0.01, 0.9],
										}}
									>
										{word}
									</motion.span>
								))}
							</motion.h2>
							<motion.button
								type="button"
								onClick={onClose}
								className="p-2 hover:bg-gray-100 rounded-full transition-colors"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									duration: 0.4,
									delay: 0.3,
									ease: [0.6, 0.05, 0.01, 0.9],
								}}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
							>
								<X className="w-5 h-5 text-gray-500" />
							</motion.button>
						</div>

						{/* Tab Navigation */}
						<motion.div
							className="flex border-b border-gray-200 bg-white"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.4,
								delay: 0.4,
								ease: [0.6, 0.05, 0.01, 0.9],
							}}
						>
							<motion.button
								type="button"
								onClick={() => setActiveTab("map")}
								className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
									activeTab === "map"
										? "text-charcoal border-b-2 border-charcoal bg-gray-50"
										: "text-gray-600 hover:text-charcoal hover:bg-gray-50"
								}`}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.4,
									delay: 0.5,
									ease: [0.6, 0.05, 0.01, 0.9],
								}}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<MapIcon className="w-4 h-4" />
								<span>Map View</span>
							</motion.button>
							<motion.button
								type="button"
								onClick={() => setActiveTab("details")}
								className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
									activeTab === "details"
										? "text-charcoal border-b-2 border-charcoal bg-gray-50"
										: "text-gray-600 hover:text-charcoal hover:bg-gray-50"
								}`}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.4,
									delay: 0.6,
									ease: [0.6, 0.05, 0.01, 0.9],
								}}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<List className="w-4 h-4" />
								<span>Details ({modelRoute.touristSpotList.length})</span>
							</motion.button>
						</motion.div>

						{/* Content */}
						<div className="relative h-[calc(100%-140px)]">
							{activeTab === "map" ? (
								<div className="flex flex-col h-full">
									{/* Map - 3/4 of the height (top) */}
									<div className="h-3/4 relative">
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
										</LeafletMapView>
									</div>

									{/* Location Info Panel - 1/4 of the height (bottom), scrollable */}
									<div className="h-1/4 bg-white border-t border-gray-200 overflow-hidden">
										<div className="h-full overflow-y-auto p-3">
											<LocationInfoPanel
												selectedSpot={displayedSelectedSpot}
												isStatic={true}
											/>
										</div>
									</div>
								</div>
							) : (
								<div className="h-full bg-white">
									<SpotDetailSidebar
										selectedSpot={selectedSpot}
										touristSpotList={modelRoute.touristSpotList}
										onSpotSelect={setSelectedTouristSpotId}
										className="border-0 shadow-none rounded-none h-full"
									/>
								</div>
							)}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default MapModal;
