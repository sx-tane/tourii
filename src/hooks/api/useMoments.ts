import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { MomentListResponseDto } from "@/api/generated";
import type { UseApiHookResult } from "../types";

/**
 * Hook to fetch moments using SWR.
 * Standardized API hook following the consistent pattern.
 * 
 * @param query - The API query string/endpoint
 * @returns Standardized hook result with moments data
 */
export function useMoments(
  query: string
): UseApiHookResult<MomentListResponseDto> & {
  moments: MomentListResponseDto | undefined;
} {
  const { data, error, isLoading, mutate } = useProxySWR<MomentListResponseDto>(query);
  
  return {
    // Standardized properties
    data,
    isLoading,
    isError: !!error,
    error,
    mutate,
    // Legacy property for backward compatibility
    moments: data,
  };
}