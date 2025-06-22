import { useEffect, useState } from "react";

/**
 * Custom hook to dynamically load Leaflet to avoid SSR issues
 * Provides a centralized way to handle Leaflet loading across components
 */
export const useLeafletLoader = () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [leaflet, setLeaflet] = useState<any>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		// Only load on client side
		if (typeof window === "undefined") return;

		// If already loaded globally, use it
		// @ts-ignore - global L from Leaflet
		if (window.L) {
			// @ts-ignore
			setLeaflet(window.L);
			setIsLoaded(true);
			return;
		}

		// Dynamically import Leaflet
		import("leaflet")
			.then((L) => {
				setLeaflet(L.default);
				setIsLoaded(true);
			})
			.catch((err) => {
				console.error("Failed to load Leaflet:", err);
				setError(err);
			});
	}, []);

	return {
		leaflet,
		isLoaded,
		error,
	};
};
