"use client";
import type { TouristSpotResponseDto } from "@/api/generated";
import { useEffect, useRef } from "react";

// Import Leaflet dynamically
// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
let L: any;
if (typeof window !== "undefined") {
	import("leaflet").then((leaflet) => {
		L = leaflet.default;
	});
}

interface TouristSpotMarkersProps {
	touristSpots: TouristSpotResponseDto[];
	selectedSpotId?: string;
	onSpotSelect: (spotId: string) => void;
	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
	map?: any;
}

const TouristSpotMarkers: React.FC<TouristSpotMarkersProps> = ({
	touristSpots,
	selectedSpotId,
	onSpotSelect,
	map,
}) => {
	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
	const markersRef = useRef<any[]>([]);

	// Create custom marker icon
	const createCustomIcon = (index: number, isSelected: boolean) => {
		if (!L) return null;

		return L.divIcon({
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: useEffect dependencies are intentionally not exhaustive
	useEffect(() => {
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
					icon: createCustomIcon(index, selectedSpotId === spot.touristSpotId),
				},
			);

			// Add popup
			marker.bindPopup(`
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
			`);

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

		// Fit map to show all markers
		if (touristSpots.length > 1) {
			const group = L.featureGroup(markersRef.current);
			map.fitBounds(group.getBounds().pad(0.1));
		}

		// Cleanup function
		return () => {
			for (const marker of markersRef.current) {
				map.removeLayer(marker);
			}
			markersRef.current = [];
		};
	}, [map, touristSpots, selectedSpotId, onSpotSelect]);

	// Update marker styles when selection changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: useEffect dependencies are intentionally not exhaustive
	useEffect(() => {
		if (!L || !markersRef.current.length) return;

		markersRef.current.forEach((marker, index) => {
			const spot = touristSpots[index];
			const isSelected = selectedSpotId === spot?.touristSpotId;
			marker.setIcon(createCustomIcon(index, isSelected));
		});
	}, [selectedSpotId, touristSpots]);

	return null;
};

export default TouristSpotMarkers;
