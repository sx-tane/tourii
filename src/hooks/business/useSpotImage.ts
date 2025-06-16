import type { TouristSpotResponseDto } from "@/api/generated";
import { useLocationInfo } from "../api/useLocationInfo";

/**
 * Custom hook to get the best image source for a tourist spot
 * Prioritizes Google images from location info, falls back to original image
 */
export const useSpotImage = (
  touristSpot: TouristSpotResponseDto,
  enabled: boolean = true
) => {
  const { data: locationInfo, isLoading: isLoadingLocationInfo } = useLocationInfo({
    query: touristSpot?.touristSpotName ?? "",
    latitude: touristSpot?.touristSpotLatitude?.toString(),
    longitude: touristSpot?.touristSpotLongitude?.toString(),
    address: touristSpot?.address ?? "",
    enabled: enabled, // Control when API calls are made
  });

  // Helper function to validate image URLs
  const isValidImageUrl = (url: string | undefined | null): url is string => {
    return typeof url === "string" && url.trim() !== "";
  };

  // Process Google images
  const googleImages = locationInfo?.images || [];
  const validGoogleImages = (googleImages as Array<{ url: string }>).filter(
    (img) => isValidImageUrl(img?.url),
  );
  const hasGoogleImages = validGoogleImages.length > 0;
  const googleImageUrl = hasGoogleImages ? validGoogleImages[0]?.url : null;

  // Fallback to original image
  const originalImageUrl = touristSpot?.imageSet?.main;
  const hasValidOriginalImage = isValidImageUrl(originalImageUrl);

  // Determine the best image source
  const bestImageUrl =
    googleImageUrl || (hasValidOriginalImage ? originalImageUrl : null);
  const usingGoogleImage = Boolean(googleImageUrl);

  return {
    imageUrl: bestImageUrl,
    usingGoogleImage,
    isLoading: isLoadingLocationInfo,
    hasValidImage: Boolean(bestImageUrl),
  };
};