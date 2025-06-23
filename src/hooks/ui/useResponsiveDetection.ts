import { useState, useEffect } from "react";
import type { UseResponsiveResult } from "../types";

// Constants
const MOBILE_BREAKPOINT = 768; // Tailwind sm breakpoint
const DESKTOP_BREAKPOINT = 1024; // Tailwind lg breakpoint

/**
 * Custom hook for responsive device detection
 * Provides standardized breakpoint detection across the app
 */
export const useResponsiveDetection = (): UseResponsiveResult => {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		const checkDevice = () => {
			const width = window.innerWidth;
			const mobile = width < MOBILE_BREAKPOINT;
			const tablet = width >= MOBILE_BREAKPOINT && width < DESKTOP_BREAKPOINT;
			const desktop = width >= DESKTOP_BREAKPOINT;

			setIsMobile(mobile);
			setIsTablet(tablet);
			setIsDesktop(desktop);

			if (!isInitialized) {
				setIsInitialized(true);
			}
		};

		// Only run on client side
		if (typeof window !== "undefined") {
			checkDevice();
			window.addEventListener("resize", checkDevice);
			return () => window.removeEventListener("resize", checkDevice);
		}
	}, [isInitialized]);

	// Return false during SSR and initial render to prevent hydration mismatches
	return {
		isMobile: isInitialized ? isMobile : false,
		isTablet: isInitialized ? isTablet : false,
		isDesktop: isInitialized ? isDesktop : false,
		isMobileTablet: isInitialized ? isMobile || isTablet : false,
		isInitialized,
	};
};
