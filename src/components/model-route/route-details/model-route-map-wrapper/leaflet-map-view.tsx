"use client";
import { useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

// Constants
const TILE_LAYER_CONFIG = {
	url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: "abcd",
	maxZoom: 20,
};

const MAP_CONFIG = {
	defaultZoom: 13,
	zoomControl: false, // Remove zoom control buttons
	attributionControl: false,
	initDelay: 50,
	scrollWheelZoom: false, // Completely disable scroll wheel zoom
};

// Import Leaflet dynamically to avoid SSR issues
// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
let L: any;
if (typeof window !== "undefined") {
	import("leaflet").then((leaflet) => {
		L = leaflet.default;
		// Fix default markers
		// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
		(L.Icon.Default.prototype as any)._getIconUrl = undefined;
		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
			iconUrl: require("leaflet/dist/images/marker-icon.png"),
			shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
		});
	});
}

interface LeafletMapViewProps {
	center: [number, number];
	zoom?: number;
	children?: ReactNode;
	className?: string;
	onMapReady?: (map: L.Map) => void;
}

// Custom hooks
const useLeafletMap = (
	center: [number, number],
	zoom: number,
	onMapReady?: (map: L.Map) => void,
) => {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<L.Map | null>(null);

	const initializeMap = useCallback(() => {
		if (!mapRef.current || mapInstanceRef.current) return;

		const initMapWhenReady = () => {
			if (!L) {
				setTimeout(initMapWhenReady, MAP_CONFIG.initDelay);
				return;
			}

			try {
				// Initialize map
				const map = L.map(mapRef.current, {
					center,
					zoom,
					zoomControl: MAP_CONFIG.zoomControl,
					attributionControl: MAP_CONFIG.attributionControl,
					scrollWheelZoom: MAP_CONFIG.scrollWheelZoom,
				});

				// Add tile layer
				L.tileLayer(TILE_LAYER_CONFIG.url, {
					attribution: TILE_LAYER_CONFIG.attribution,
					subdomains: TILE_LAYER_CONFIG.subdomains,
					maxZoom: TILE_LAYER_CONFIG.maxZoom,
				}).addTo(map);

				mapInstanceRef.current = map;

				// Call onMapReady callback
				if (onMapReady) {
					onMapReady(map);
				}
			} catch (error) {
				console.warn("Failed to initialize Leaflet map:", error);
			}
		};

		initMapWhenReady();
	}, [center, zoom, onMapReady]);

	const updateMapView = useCallback(() => {
		if (mapInstanceRef.current && L) {
			try {
				mapInstanceRef.current.setView(center, zoom);
			} catch (error) {
				console.warn("Error updating map view:", error);
			}
		}
	}, [center, zoom]);

	const cleanupMap = useCallback(() => {
		if (mapInstanceRef.current) {
			try {
				mapInstanceRef.current.remove();
			} catch (error) {
				console.warn("Error cleaning up map:", error);
			}
			mapInstanceRef.current = null;
		}
	}, []);

	return {
		mapRef,
		mapInstanceRef,
		initializeMap,
		updateMapView,
		cleanupMap,
	};
};

const LeafletMapView: React.FC<LeafletMapViewProps> = ({
	center,
	zoom = MAP_CONFIG.defaultZoom,
	children,
	className = "h-full w-full",
	onMapReady,
}) => {
	const { mapRef, initializeMap, updateMapView, cleanupMap } = useLeafletMap(
		center,
		zoom,
		onMapReady,
	);

	// Initialize map
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally avoiding recreation
	useEffect(() => {
		initializeMap();
		return cleanupMap;
	}, []);

	// Update map view when center or zoom changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally avoiding recreation
	useEffect(() => {
		updateMapView();
	}, [center, zoom, updateMapView]);

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: false }}
			transition={{
				duration: 0.5,
				ease: [0.6, 0.05, 0.01, 0.9],
			}}
		>
			<motion.div
				ref={mapRef}
				className="h-full w-full rounded-lg bg-warmGrey flex items-center justify-center"
				initial={{ opacity: 0, scale: 0.95 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: false }}
				transition={{
					duration: 0.6,
					delay: 0.2,
					ease: [0.6, 0.05, 0.01, 0.9],
				}}
			>
				{!L && (
					<motion.div
						className="text-gray-500 text-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.4,
							ease: [0.6, 0.05, 0.01, 0.9],
						}}
					>
						<motion.div
							className="text-2xl mb-2"
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							transition={{
								duration: 0.5,
								delay: 0.1,
								ease: [0.6, 0.05, 0.01, 0.9],
							}}
						>
							🗺️
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 0.4,
								delay: 0.3,
								ease: [0.6, 0.05, 0.01, 0.9],
							}}
						>
							Loading map...
						</motion.div>
					</motion.div>
				)}
			</motion.div>
			{children}
		</motion.div>
	);
};

export default LeafletMapView;
