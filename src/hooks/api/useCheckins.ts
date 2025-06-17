import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { UseApiHookResult } from "../types";

// Checkin data structure based on the API spec in the issue
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
  type: 'story' | 'quest' | 'route';
}

export interface CheckinsListResponseDto {
  checkins: CheckinResponseDto[];
  total: number;
  page: number;
  limit: number;
}

export interface CheckinsQuery {
  page?: number;
  limit?: number;
  userId?: string;
  questId?: string;
  touristSpotId?: string;
  startDate?: string;
  endDate?: string;
  type?: 'story' | 'quest' | 'route' | 'all';
}

/**
 * Hook to fetch user checkins using SWR.
 * Standardized API hook following the consistent pattern.
 * 
 * @param query - The checkins query parameters
 * @returns Standardized hook result with checkins data
 */
export function useCheckins(
  query: CheckinsQuery = {}
): UseApiHookResult<CheckinsListResponseDto> & {
  checkins: CheckinResponseDto[] | undefined;
} {
  // Build query string from parameters
  const queryParams = new URLSearchParams();
  if (query.page) queryParams.append('page', query.page.toString());
  if (query.limit) queryParams.append('limit', query.limit.toString());
  if (query.userId) queryParams.append('userId', query.userId);
  if (query.questId) queryParams.append('questId', query.questId);
  if (query.touristSpotId) queryParams.append('touristSpotId', query.touristSpotId);
  if (query.startDate) queryParams.append('startDate', query.startDate);
  if (query.endDate) queryParams.append('endDate', query.endDate);
  if (query.type && query.type !== 'all') queryParams.append('type', query.type);

  const queryString = queryParams.toString();
  const endpoint = `/api/checkins${queryString ? `?${queryString}` : ''}`;
  
  const { data, error, isLoading, mutate } = useProxySWR<CheckinsListResponseDto>(endpoint);
  
  return {
    // Standardized properties
    data,
    isLoading,
    isError: !!error,
    error,
    mutate,
    // Convenience property for checkins array
    checkins: data?.checkins,
  };
}