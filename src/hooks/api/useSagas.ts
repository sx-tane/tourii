import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { StoryResponseDto } from "@/api/generated/models/StoryResponseDto";
import type { UseApiHookResult } from "../types";

/**
 * Hook to fetch all sagas using SWR.
 * Standardized API hook following the consistent pattern.
 * 
 * @returns Standardized hook result with sagas data
 */
export function useSagas(): UseApiHookResult<StoryResponseDto[]> & {
  sagas: StoryResponseDto[] | undefined;
} {
  const swrKey = "/api/stories/sagas";
  const { data, error, isLoading, mutate } = useProxySWR<StoryResponseDto[]>(swrKey);
  
  return {
    // Standardized properties
    data,
    isLoading,
    isError: !!error,
    error,
    mutate,
    // Legacy property for backward compatibility
    sagas: data,
  };
}