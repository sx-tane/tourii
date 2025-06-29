import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { LocationInfoResponseDto } from "@/api/generated";
import { useMemo } from "react";
import type { UseApiHookResult } from "../types";

interface LocationQueryOptions {
	query: string;
	latitude?: string;
	longitude?: string;
	address?: string;
	enabled?: boolean;
}

interface UseLocationInfoResult
	extends UseApiHookResult<LocationInfoResponseDto> {
	locationInfo?: LocationInfoResponseDto; // Legacy compatibility
	hasLocationInfo: boolean;
	isValidQuery: boolean;
}

/**
 * Hook to fetch location information using SWR.
 * Standardized API hook following the consistent pattern.
 *
 * @param options - Location query options or simple string query
 * @returns Standardized hook result with location info data
 */
export function useLocationInfo(
	options: string | LocationQueryOptions,
): UseLocationInfoResult {
	// Handle both string and object inputs for backward compatibility
	const queryOptions = useMemo(() => {
		if (typeof options === "string") {
			return {
				query: options,
				enabled: true,
			};
		}
		return {
			...options,
			enabled: options.enabled !== false,
		};
	}, [options]);

	const { query, latitude, longitude, address, enabled } = queryOptions;

	// Build the API URL with query parameters
	const swrKey = useMemo(() => {
		if (!enabled || !query?.trim()) return null;

		const params = new URLSearchParams({
			query: query.trim(),
		});

		if (latitude) params.set("latitude", latitude);
		if (longitude) params.set("longitude", longitude);
		if (address) params.set("address", address);
		return `/api/location-services/info?${params.toString()}`;
	}, [query, latitude, longitude, address, enabled]);

	const { data, error, isLoading, mutate } =
		useProxySWR<LocationInfoResponseDto>(swrKey, {
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			revalidateOnMount: true,
			dedupingInterval: 300000, // 5 minutes deduping
			focusThrottleInterval: 60000, // 1 minute focus throttle
			errorRetryInterval: 30000, // 30 seconds retry interval
			errorRetryCount: 1, // Only retry once to reduce API calls
		});

	const isValidQuery = Boolean(query?.trim());
	const hasLocationInfo = Boolean(data && !error);

	return {
		// Standardized properties
		data,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate,
		// Additional computed properties
		hasLocationInfo,
		isValidQuery,
		// Legacy compatibility
		locationInfo: data,
	};
}
