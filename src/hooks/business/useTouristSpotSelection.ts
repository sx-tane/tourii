import { useState } from "react";
import type { ModelRouteResponseDto } from "@/api/generated";

/**
 * Custom hook for managing tourist spot selection state
 * Handles selected spot logic and provides helper functions
 */
export const useTouristSpotSelection = (
	touristSpotList: ModelRouteResponseDto["touristSpotList"],
) => {
	const [selectedTouristSpotId, setSelectedTouristSpotId] = useState<
		string | undefined
	>();

	// Auto-select first tourist spot only when user interacts or opens mobile modal
	const selectFirstSpot = () => {
		if (touristSpotList.length > 0 && !selectedTouristSpotId) {
			setSelectedTouristSpotId(touristSpotList[0]?.touristSpotId);
		}
	};

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
		selectFirstSpot,
	};
};
