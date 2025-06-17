"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { logger } from "@/utils/logger";
import type { CheckinResponseDto } from "@/hooks/api/useCheckins";

// Fix 4: Improved Leaflet import pattern with proper hook
type LeafletType = typeof import("leaflet");

const useLeaflet = () => {
  const [leaflet, setLeaflet] = useState<LeafletType | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        // Fix default markers
        interface IconDefaultPrototype {
          _getIconUrl?: () => string;
        }
        (L.Icon.Default.prototype as IconDefaultPrototype)._getIconUrl = undefined;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        });
        
        setLeaflet(L);
        setLoading(false);
      }).catch((error) => {
        logger.error("Failed to load Leaflet", { error });
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);
  
  return { leaflet, loading };
};

export interface InteractiveMapProps {
  checkins: CheckinResponseDto[];
  onMarkerClick: (checkin: CheckinResponseDto) => void;
  className?: string;
}

// Map configuration
const MAP_CONFIG = {
  center: [35.6762, 139.6503] as [number, number], // Tokyo center
  defaultZoom: 6,
  maxZoom: 18,
  minZoom: 5,
  zoomControl: false,
  attributionControl: false,
  scrollWheelZoom: true,
  fadeAnimation: true,
  zoomAnimation: true,
  markerZoomAnimation: true,
};

const TILE_LAYER_CONFIG = {
  url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 20,
  tileSize: 256,
  zoomOffset: 0,
};

// Custom marker icons for different checkin types
const createCustomIcon = (type: CheckinResponseDto['type'], L: LeafletType | null) => {
  if (!L) return null;
  
  const iconMap = {
    story: '⛩️',
    quest: '🏢', 
    route: '💎',
  };

  const colorMap = {
    story: '#8B5CF6',
    quest: '#3B82F6',
    route: '#10B981',
  };

  const iconHtml = `
    <div style="
      width: 30px;
      height: 30px;
      background-color: ${colorMap[type]};
      border: 2px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      cursor: pointer;
      transition: transform 0.2s ease;
    " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
      ${iconMap[type]}
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-checkin-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  checkins,
  onMarkerClick,
  className = "h-full w-full",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<import("leaflet").Marker[]>([]);
  const { leaflet: L, loading: leafletLoading } = useLeaflet();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize map
  const initializeMap = useCallback(() => {
    if (!mapRef.current || mapInstanceRef.current || !L) return;

    try {
      const map = L.map(mapRef.current, {
        center: MAP_CONFIG.center,
        zoom: MAP_CONFIG.defaultZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        minZoom: MAP_CONFIG.minZoom,
        zoomControl: MAP_CONFIG.zoomControl,
        attributionControl: MAP_CONFIG.attributionControl,
        scrollWheelZoom: MAP_CONFIG.scrollWheelZoom,
        fadeAnimation: MAP_CONFIG.fadeAnimation,
        zoomAnimation: MAP_CONFIG.zoomAnimation,
        markerZoomAnimation: MAP_CONFIG.markerZoomAnimation,
      });

      // Add tile layer
      L.tileLayer(TILE_LAYER_CONFIG.url, {
        attribution: TILE_LAYER_CONFIG.attribution,
        subdomains: TILE_LAYER_CONFIG.subdomains,
        maxZoom: TILE_LAYER_CONFIG.maxZoom,
        tileSize: TILE_LAYER_CONFIG.tileSize,
        zoomOffset: TILE_LAYER_CONFIG.zoomOffset,
      }).addTo(map);

      mapInstanceRef.current = map;
      setIsLoading(false);

      // Add city labels
      const cities = [
        { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
        { name: 'Kyoto', lat: 35.0116, lng: 135.7681 },
        { name: 'Osaka', lat: 34.6937, lng: 135.5023 },
        { name: 'Yokohama', lat: 35.4437, lng: 139.6380 },
      ];

      cities.forEach(city => {
        const cityIcon = L.divIcon({
          html: `<div style="
            background: rgba(255,255,255,0.9);
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            color: #374151;
            border: 1px solid #D1D5DB;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            white-space: nowrap;
          ">${city.name}</div>`,
          className: 'city-label',
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        L.marker([city.lat, city.lng], { icon: cityIcon }).addTo(map);
      });

    } catch (error) {
      logger.error("Failed to initialize interactive map", { error });
      setIsLoading(false);
    }
  }, []);

  // Update markers when checkins change
  const updateMarkers = useCallback(() => {
    if (!mapInstanceRef.current || !L) return;

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];

    // Add new markers
    checkins.forEach(checkin => {
      const icon = createCustomIcon(checkin.type, L);
      if (!icon) return;

      const marker = L.marker([checkin.latitude, checkin.longitude], { icon })
        .addTo(map)
        .on('click', () => onMarkerClick(checkin));

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (checkins.length > 0) {
      const bounds = L.latLngBounds(
        checkins.map(checkin => [checkin.latitude, checkin.longitude])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [checkins, onMarkerClick]);

  // Zoom controls
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  // Fix 2: Initialize map when component mounts - wait for Leaflet to load
  useEffect(() => {
    if (L && !leafletLoading) {
      initializeMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [L, leafletLoading, initializeMap]); // Include L and leafletLoading in dependencies

  // Update markers when checkins change
  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={mapRef}
        className="h-full w-full bg-gray-100 rounded-lg overflow-hidden"
      />

      {/* Loading state */}
      {(isLoading || leafletLoading) && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg"
          initial={{ opacity: 1 }}
          animate={{ opacity: (isLoading || leafletLoading) ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <motion.div
              className="text-4xl mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              🗾
            </motion.div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </motion.div>
      )}

      {/* Zoom controls */}
      <motion.div
        className="absolute bottom-4 right-4 flex flex-col gap-2 z-[1000]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <motion.button
          type="button"
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Zoom in"
        >
          <Plus className="w-5 h-5 text-gray-700" />
        </motion.button>
        <motion.button
          type="button"
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Zoom out"
        >
          <Minus className="w-5 h-5 text-gray-700" />
        </motion.button>
      </motion.div>

      {/* Checkins count indicator */}
      {checkins.length > 0 && (
        <motion.div
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md z-[1000]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <p className="text-sm font-medium text-gray-700">
            {checkins.length} location{checkins.length !== 1 ? 's' : ''} visited
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InteractiveMap;