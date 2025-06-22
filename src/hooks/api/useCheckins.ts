import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { UseApiHookResult } from "../types";
import type { UserTravelLogListResponseDto } from "@/api/generated";
import type { KeyedMutator } from "swr";

// Frontend-friendly checkin data structure for components
export interface CheckinResponseDto {
	id: string;
	latitude: number;
	longitude: number;
	touristSpot: {
		id: string;
		name: string;
		description?: string;
		latitude: number;
		longitude: number;
	};
	quest?: {
		id: string;
		name: string;
		description?: string;
	};
	story?: {
		id: string;
		name: string;
		description?: string;
	};
	timestamp: string;
	rewards: Array<{
		id: string;
		name: string;
		type: string;
		imageUrl?: string;
	}>;
	type: "story" | "quest" | "route";
}

export interface CheckinsListResponseDto {
	checkins: CheckinResponseDto[];
	total: number;
	page: number;
	limit: number;
}

// Transform backend API response to frontend format
function transformBackendResponse(
	backendData: UserTravelLogListResponseDto,
): CheckinsListResponseDto {
	const transformedCheckins: CheckinResponseDto[] = backendData.checkins.map(
		(checkin) => ({
			id: checkin.userTravelLogId,
			latitude: checkin.userLatitude,
			longitude: checkin.userLongitude,
			touristSpot: {
				id: checkin.touristSpotId,
				name: `Tourist Spot ${checkin.touristSpotId}`, // We'll need to fetch more data for names
				latitude: checkin.userLatitude, // Using user location as fallback
				longitude: checkin.userLongitude,
			},
			quest: checkin.questId
				? {
						id: checkin.questId,
						name: `Quest ${checkin.questId}`, // We'll need to fetch more data for names
					}
				: undefined,
			timestamp: checkin.insDateTime || new Date().toISOString(),
			rewards: [], // Empty for now - would need separate API calls
			type: "route" as const, // Default type - could be enhanced with quest/story detection logic
		}),
	);

	return {
		checkins: transformedCheckins,
		total: backendData.pagination.totalItems,
		page: backendData.pagination.currentPage,
		limit:
			Math.ceil(
				backendData.pagination.totalItems / backendData.pagination.totalPages,
			) || 20,
	};
}

export interface CheckinsQuery {
	page?: number;
	limit?: number;
	userId?: string;
	questId?: string;
	touristSpotId?: string;
	startDate?: string;
	endDate?: string;
	type?: "story" | "quest" | "route" | "all";
}

/**
 * Hook to fetch user checkins using SWR.
 * Standardized API hook following the consistent pattern.
 *
 * @param query - The checkins query parameters
 * @returns Standardized hook result with checkins data
 */
export function useCheckins(
	query: CheckinsQuery = {},
): UseApiHookResult<CheckinsListResponseDto> & {
	checkins: CheckinResponseDto[] | undefined;
} {
	// Build query string from parameters
	const queryParams = new URLSearchParams();
	if (query.page) queryParams.append("page", query.page.toString());
	if (query.limit) queryParams.append("limit", query.limit.toString());
	if (query.userId) queryParams.append("userId", query.userId);
	if (query.questId) queryParams.append("questId", query.questId);
	if (query.touristSpotId)
		queryParams.append("touristSpotId", query.touristSpotId);
	if (query.startDate) queryParams.append("startDate", query.startDate);
	if (query.endDate) queryParams.append("endDate", query.endDate);
	if (query.type && query.type !== "all")
		queryParams.append("type", query.type);

	const queryString = queryParams.toString();
	const endpoint = `/api/checkins${queryString ? `?${queryString}` : ""}`;

	const {
		data: backendData,
		error,
		isLoading,
		mutate,
	} = useProxySWR<UserTravelLogListResponseDto>(endpoint);

	// Transform backend data to frontend format
	const transformedData = backendData
		? transformBackendResponse(backendData)
		: undefined;

	return {
		// Standardized properties
		data: transformedData,
		isLoading,
		isError: !!error,
		error: (error as Error) || null,
		mutate: mutate as unknown as KeyedMutator<CheckinsListResponseDto>,
		// Convenience property for checkins array
		checkins: transformedData?.checkins,
	};
}
