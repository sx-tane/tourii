import type { ModelRouteResponseDto } from "@/api/generated";
import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { UseApiHookResult } from "../types";

/**
 * Hook to fetch a specific model route by ID using SWR.
 * Standardized API hook following the consistent pattern.
 * 
 * @param modelRouteId - The ID of the model route to fetch
 * @returns Standardized hook result with model route data
 */
export function useModelRouteById(
  modelRouteId: string | undefined
): UseApiHookResult<ModelRouteResponseDto> & {
  modelRoute: ModelRouteResponseDto | undefined;
} {
  const swrKey = modelRouteId ? `/api/routes/${modelRouteId}` : null;
  const { data, error, isLoading, mutate } = useProxySWR<ModelRouteResponseDto>(swrKey);
  
  return {
    // Standardized properties
    data,
    isLoading,
    isError: !!error,
    error,
    mutate,
    // Legacy property for backward compatibility
    modelRoute: data,
  };
}