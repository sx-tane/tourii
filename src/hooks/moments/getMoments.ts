import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { MomentsResponse, MomentsFilters } from "@/app/v2/(moments)/types";

export function getMoments(filters: MomentsFilters) {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.questId) queryParams.append('questId', filters.questId);
    if (filters.rewardType) queryParams.append('rewardType', filters.rewardType);
    if (filters.userId) queryParams.append('userId', filters.userId);
    
    const query = `/moments?${queryParams.toString()}`;
    
    const { data, error, isLoading, mutate } = useProxySWR<MomentsResponse>(query);
    
    return {
        moments: data,
        isLoadingMoments: isLoading,
        isErrorMoments: error,
        mutateMoments: mutate,
    };
}