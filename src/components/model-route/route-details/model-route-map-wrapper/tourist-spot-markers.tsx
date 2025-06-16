"use client";
import type { TouristSpotResponseDto } from "@/api/generated";
import type { Map as LeafletMap } from "leaflet";
import { useEffect, useRef, useState } from "react";

// Import Leaflet dynamically
type LeafletType = typeof import("leaflet");

// Constants
const MAP_CONFIG = {
	zoomLevel: 14,
	animationDuration: 0.8,
	easeLinearity: 0.2,
	boundsPadding: 0.1,
	delayTimeout: 100,
};

interface TouristSpotMarkersProps {
	touristSpots: TouristSpotResponseDto[];
	selectedSpotId?: string;
	onSpotSelect: (spotId: string) => void;
	map?: LeafletMap;
}

// Utility functions
const createMarkerIcon = (
	leaflet: LeafletType,
	index: number,
	isSelected: boolean,
) => {
	return leaflet.divIcon({
		className: "custom-div-icon",
		html: `
			<div class="flex items-center justify-center w-8 h-8 rounded-full border-2 ${
				isSelected
					? "bg-red border-red text-white"
					: "bg-white border-charcoal text-charcoal"
			} font-bold text-sm shadow-lg">
				${index + 1}
			</div>
		`,
		iconSize: [32, 32],
		iconAnchor: [16, 16],
	});
};

const createMarkerPopup = (spot: TouristSpotResponseDto) => {
	return `
		<div class="p-2">
			<h3 class="font-bold text-sm mb-1">${spot.touristSpotName}</h3>
			<p class="text-xs text-gray-600">${spot.address}</p>
			${
				spot.weatherInfo
					? `<div class="mt-2 text-xs">
						<span class="font-medium">${spot.weatherInfo.temperatureCelsius}°C</span> - 
						${spot.weatherInfo.weatherName}
					</div>`
					: ""
			}
		</div>
	`;
};

// Custom hooks
const useLeafletLoader = () => {
	const [L, setL] = useState<LeafletType | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			import("leaflet").then((leaflet) => {
				setL(leaflet);
			});
		}
	}, []);

	return L;
};

const useLeafletMarkers = (
	L: LeafletType | null,
	map: LeafletMap | undefined,
	touristSpots: TouristSpotResponseDto[],
	selectedSpotId: string | undefined,
	onSpotSelect: (spotId: string) => void,
) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const markersRef = useRef<any[]>([]);

	const createAndAddMarkers = () => {
		if (!map || !L || !touristSpots.length) return;

		// Clear existing markers
		for (const marker of markersRef.current) {
			map.removeLayer(marker);
		}
		markersRef.current = [];

		// Add new markers
		touristSpots.forEach((spot, index) => {
			const marker = L.marker(
				[spot.touristSpotLatitude, spot.touristSpotLongitude],
				{
					icon: createMarkerIcon(
						L,
						index,
						selectedSpotId === spot.touristSpotId,
					),
				},
			);

			// Add popup
			marker.bindPopup(createMarkerPopup(spot));

			// Add click event
			marker.on("click", () => {
				onSpotSelect(spot.touristSpotId);
			});

			// Add hover effects
			marker.on("mouseover", () => {
				marker.openPopup();
			});

			marker.addTo(map);
			markersRef.current.push(marker);
		});

		// Only fit map to show all markers if no specific spot is selected initially
		if (touristSpots.length > 1 && !selectedSpotId) {
			const group = L.featureGroup(markersRef.current);
			map.fitBounds(group.getBounds().pad(MAP_CONFIG.boundsPadding));
		}
	};

	const updateMarkerStyles = () => {
		if (!L || !markersRef.current.length || !map) return;

		console.log("Selected spot ID changed to:", selectedSpotId);

		// Update marker icons
		markersRef.current.forEach((marker, index) => {
			const spot = touristSpots[index];
			const isSelected = selectedSpotId === spot?.touristSpotId;
			marker.setIcon(createMarkerIcon(L, index, isSelected));
		});

		// Auto-center and zoom to selected spot
		if (selectedSpotId) {
			const selectedSpot = touristSpots.find(
				(spot) => spot.touristSpotId === selectedSpotId,
			);
			if (selectedSpot) {
				console.log("Centering map on:", selectedSpot.touristSpotName, [
					selectedSpot.touristSpotLatitude,
					selectedSpot.touristSpotLongitude,
				]);

				// Use setTimeout to ensure map is ready
				setTimeout(() => {
					// Smooth pan and zoom to the selected spot
					map.flyTo(
						[
							selectedSpot.touristSpotLatitude,
							selectedSpot.touristSpotLongitude,
						],
						MAP_CONFIG.zoomLevel,
						{
							animate: true,
							duration: MAP_CONFIG.animationDuration,
							easeLinearity: MAP_CONFIG.easeLinearity,
						},
					);
				}, MAP_CONFIG.delayTimeout);
			}
		}
	};

	const cleanupMarkers = () => {
		if (!map) return;
		for (const marker of markersRef.current) {
			map.removeLayer(marker);
		}
		markersRef.current = [];
	};

	return {
		markersRef,
		createAndAddMarkers,
		updateMarkerStyles,
		cleanupMarkers,
	};
};

const TouristSpotMarkers: React.FC<TouristSpotMarkersProps> = ({
	touristSpots,
	selectedSpotId,
	onSpotSelect,
	map,
}) => {
	const L = useLeafletLoader();
	const { createAndAddMarkers, updateMarkerStyles, cleanupMarkers } =
		useLeafletMarkers(L, map, touristSpots, selectedSpotId, onSpotSelect);

	// Create and add markers when dependencies change
	// biome-ignore lint/correctness/useExhaustiveDependencies: useEffect dependencies are intentionally not exhaustive
	useEffect(() => {
		createAndAddMarkers();
		return cleanupMarkers;
	}, [map, L, touristSpots, selectedSpotId, onSpotSelect]);

	// Update marker styles when selection changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: useEffect dependencies are intentionally not exhaustive
	useEffect(() => {
		updateMarkerStyles();
	}, [selectedSpotId, L, touristSpots, map]);

	return null;
};

export default TouristSpotMarkers;
