import { useProxySWR } from "@/lib/swr/useProxySWR";
import { LocationInfoResponseDto } from "@/api/generated";
import { useMemo } from "react";

interface LocationQueryOptions {
	query: string;
	latitude?: string;
	longitude?: string;
	address?: string;
	enabled?: boolean;
}

interface LocationInfoResult {
	locationInfo?: LocationInfoResponseDto;
	isLoadingLocationInfo: boolean;
	isErrorLocationInfo: boolean;
	errorLocationInfo?: any;
	mutateLocationInfo: () => Promise<LocationInfoResponseDto | undefined>;
	hasLocationInfo: boolean;
	isValidQuery: boolean;
}

export const getLocationInfo = (
	options: string | LocationQueryOptions
): LocationInfoResult => {
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
		return `/api/routes/location-info-panel?${params.toString()}`;
	}, [query, latitude, longitude, address, enabled]);

	const { data, error, isLoading, mutate } = useProxySWR<LocationInfoResponseDto>(
		swrKey,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: true,
			dedupingInterval: 30000, // 30 seconds deduping
		}
	);

	const isValidQuery = Boolean(query?.trim());
	const hasLocationInfo = Boolean(data && !error);

	return {
		locationInfo: data,
		isLoadingLocationInfo: isLoading,
		isErrorLocationInfo: Boolean(error),
		errorLocationInfo: error,
		mutateLocationInfo: mutate,
		hasLocationInfo,
		isValidQuery,
	};
};