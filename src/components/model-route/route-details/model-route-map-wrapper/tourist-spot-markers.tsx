"use client";
import type { TouristSpotResponseDto } from "@/api/generated";
import type { Map as LeafletMap } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { validateTouristSpots } from "@/utils/validation-utils";
import { logger } from "@/utils/logger";

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
	disableAutoCenter?: boolean; // Disable automatic centering (for mobile fullscreen)
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
					? "bg-red border-mustard text-mustard"
					: "bg-warmGrey border-charcoal text-charcoal"
			} font-bold text-sm shadow-lg">
				${index + 1}
			</div>
		`,
		iconSize: [32, 32],
		iconAnchor: [16, 16],
	});
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
	disableAutoCenter?: boolean,
) => {
	const markersRef = useRef<import("leaflet").Marker[]>([]);

	const createAndAddMarkers = () => {
		if (!map || !L || !touristSpots.length) return;

		// Validate tourist spots data
		const validation = validateTouristSpots(touristSpots);
		if (!validation.isValid) {
			logger.error("Invalid tourist spots data:", validation.errors);
			return;
		}

		// Clear existing markers
		for (const marker of markersRef.current) {
			map.removeLayer(marker);
		}
		markersRef.current = [];

		// Add new markers with validation
		touristSpots.forEach((spot, index) => {
			// Validate spot data
			if (
				!spot ||
				typeof spot.touristSpotLatitude !== "number" ||
				typeof spot.touristSpotLongitude !== "number"
			) {
				logger.warn(`Invalid tourist spot data at index ${index}`, { spot });
				return;
			}

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

			// Add click event
			marker.on("click", () => {
				onSpotSelect(spot.touristSpotId);
			});

			marker.addTo(map);
			markersRef.current.push(marker);
		});

		// Auto-fit bounds to show all markers when no spot is selected
		if (touristSpots.length > 1 && !selectedSpotId) {
			const group = L.featureGroup(markersRef.current);
			map.fitBounds(group.getBounds().pad(MAP_CONFIG.boundsPadding));
		}
	};

	const updateMarkerStyles = () => {
		if (!L || !markersRef.current.length || !map) return;

		// Ensure arrays are in sync before updating
		if (markersRef.current.length !== touristSpots.length) {
			logger.warn("Marker-spot array mismatch detected, recreating markers", {
				markersCount: markersRef.current.length,
				spotsCount: touristSpots.length,
			});
			createAndAddMarkers();
			return;
		}

		// Update marker icons with safe array access
		markersRef.current.forEach((marker, index) => {
			const spot = touristSpots[index];
			if (!spot) {
				logger.warn(`Tourist spot missing at index ${index}`);
				return;
			}
			const isSelected = selectedSpotId === spot.touristSpotId;
			marker.setIcon(createMarkerIcon(L, index, isSelected));
		});

		// Auto-center and zoom to selected spot when user selects a spot (only for desktop)
		if (selectedSpotId && !disableAutoCenter) {
			const selectedSpot = touristSpots.find(
				(spot) => spot.touristSpotId === selectedSpotId,
			);
			if (selectedSpot) {
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
	disableAutoCenter = false,
}) => {
	const L = useLeafletLoader();
	const { createAndAddMarkers, updateMarkerStyles, cleanupMarkers } =
		useLeafletMarkers(
			L,
			map,
			touristSpots,
			selectedSpotId,
			onSpotSelect,
			disableAutoCenter,
		);

	// Create markers only when map, L, or touristSpots change (not on selection change)
	// biome-ignore lint/correctness/useExhaustiveDependencies: useEffect dependencies are intentionally not exhaustive
	useEffect(() => {
		createAndAddMarkers();
		return cleanupMarkers;
	}, [map, L, touristSpots, onSpotSelect]); // Removed selectedSpotId

	// Update marker styles when selection changes (optimized - no recreation)
	// biome-ignore lint/correctness/useExhaustiveDependencies: useEffect dependencies are intentionally not exhaustive
	useEffect(() => {
		updateMarkerStyles();
	}, [selectedSpotId]); // Only listen to selection changes

	return null;
};

export default TouristSpotMarkers;
