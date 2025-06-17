import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import type { UseApiHookResult } from "../types";

/**
 * Hook to fetch all model routes using SWR.
 * Standardized API hook following the consistent pattern.
 *
 * @returns Standardized hook result with model routes data
 */
export function useModelRoutes(): UseApiHookResult<ModelRouteResponseDto[]> & {
	modelRoutes: ModelRouteResponseDto[] | undefined;
} {
	const swrKey = "/api/routes/model-routes";
	const { data, error, isLoading, mutate } =
		useProxySWR<ModelRouteResponseDto[]>(swrKey);

	return {
		// Standardized properties
		data,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate,
		// Legacy property for backward compatibility
		modelRoutes: data,
	};
}
