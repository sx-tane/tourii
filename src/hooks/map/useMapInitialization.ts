import { useState, useEffect } from "react";
import type { ModelRouteResponseDto } from "@/api/generated";
import type { UseMapInitializationResult } from "../types";

/**
 * Custom hook for Leaflet map initialization
 * Handles map setup, bounds fitting, and zoom controls
 */
export const useMapInitialization = (
  touristSpotList: ModelRouteResponseDto["touristSpotList"]
): UseMapInitializationResult => {
  // biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
  const [map, setMap] = useState<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [shouldFitBounds, setShouldFitBounds] = useState(false);

  // biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
  const handleMapReady = (mapInstance: any) => {
    setMap(mapInstance);
    setIsMapReady(true);

    // Set zoom limits to prevent excessive zooming
    try {
      mapInstance.setMinZoom(8);
      mapInstance.setMaxZoom(16);
      setShouldFitBounds(true);
    } catch (error) {
      console.log('Map initialization error (safe to ignore):', error);
    }
  };

  // Handle fitBounds after map and markers are ready - disabled to prevent auto-jumping
  // This functionality can be enabled if needed by uncommenting the useEffect below
  // useEffect(() => {
  //   if (map && isMapReady && shouldFitBounds && touristSpotList.length > 1) {
  //     const timer = setTimeout(() => {
  //       try {
  //         if (map && map.getContainer && map.getContainer()) {
  //           const bounds: [number, number][] = touristSpotList.map(spot => [
  //             spot.touristSpotLatitude,
  //             spot.touristSpotLongitude
  //           ]);
  //           
  //           map.fitBounds(bounds, { 
  //             padding: [50, 50],
  //             maxZoom: 14
  //           });
  //           setShouldFitBounds(false);
  //         }
  //       } catch (error) {
  //         console.log('FitBounds error (safe to ignore):', error);
  //       }
  //     }, 1000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [map, isMapReady, shouldFitBounds, touristSpotList]);

  return { map, isMapReady, handleMapReady };
};