/**
 * Standardized hook types for consistent patterns across the codebase
 */

export interface UseApiHookResult<T> {
	data: T | undefined;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	mutate: () => Promise<T | undefined>;
}

export interface UseApiHookOptions {
	enabled?: boolean;
	shouldRetryOnError?: boolean;
}

export interface UseResponsiveResult {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	isMobileTablet: boolean;
	isInitialized: boolean;
}

export interface UseIntersectionObserverOptions {
	rootMargin?: string;
	threshold?: number | number[];
	freezeOnceVisible?: boolean;
}

export interface UseMapInitializationResult {
	map: L.Map | null;
	isMapReady: boolean;
	handleMapReady: (mapInstance: L.Map) => void;
}
