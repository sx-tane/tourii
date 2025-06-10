"use client";
import { useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";

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
	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
	onMapReady?: (map: any) => void;
}

const LeafletMapView: React.FC<LeafletMapViewProps> = ({
	center,
	zoom = 13,
	children,
	className = "h-full w-full",
	onMapReady,
}) => {
	const mapRef = useRef<HTMLDivElement>(null);
	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
	const mapInstanceRef = useRef<any>(null);
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally avoiding recreation
	useEffect(() => {
		if (!mapRef.current || mapInstanceRef.current) return;

		// Wait for Leaflet to be available
		const initMapWhenReady = () => {
			if (!L) {
				setTimeout(initMapWhenReady, 50);
				return;
			}

			try {
				// Initialize map
				const map = L.map(mapRef.current, {
					center,
					zoom,
					zoomControl: true,
					attributionControl: false,
				});

				// Add CartoDB Positron tile layer
				L.tileLayer(
					"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
					{
						attribution:
							'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
						subdomains: "abcd",
						maxZoom: 20,
					},
				).addTo(map);

				mapInstanceRef.current = map;

				// Call onMapReady callback
				if (onMapReady) {
					onMapReady(map);
				}
			} catch (error) {
				console.warn("Failed to initialize Leaflet map:", error);
			}
		};

		// Start initialization
		initMapWhenReady();

		// Cleanup function
		return () => {
			if (mapInstanceRef.current) {
				try {
					mapInstanceRef.current.remove();
				} catch (error) {
					console.warn("Error cleaning up map:", error);
				}
				mapInstanceRef.current = null;
			}
		};
	}, []); // Remove dependencies to avoid recreation

	// Update map center when prop changes
	useEffect(() => {
		if (mapInstanceRef.current && L) {
			try {
				mapInstanceRef.current.setView(center, zoom);
			} catch (error) {
				console.warn("Error updating map view:", error);
			}
		}
	}, [center, zoom]);

	return (
		<div className={className}>
			<div
				ref={mapRef}
				className="h-full w-full rounded-lg bg-warmGrey flex items-center justify-center"
			>
				{!L && (
					<div className="text-gray-500 text-center">
						<div className="text-2xl mb-2">🗺️</div>
						<div>Loading map...</div>
					</div>
				)}
			</div>
			{children}
		</div>
	);
};

export default LeafletMapView;
