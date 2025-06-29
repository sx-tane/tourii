import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import type { UseApiHookResult } from "../types";

interface ModelRoutesOptions {
	source?: 'ai' | 'manual' | 'all';
	region?: string;
	limit?: number;
	offset?: number;
	userId?: string;
}

/**
 * Hook to fetch model routes using SWR with optional filtering.
 * Standardized API hook following the consistent pattern.
 *
 * @param options - Optional filtering parameters
 * @returns Standardized hook result with model routes data
 */
export function useModelRoutes(options?: ModelRoutesOptions): UseApiHookResult<ModelRouteResponseDto[]> & {
	modelRoutes: ModelRouteResponseDto[] | undefined;
} {
	// Build query parameters
	const params = new URLSearchParams();
	if (options?.source) params.set('source', options.source);
	if (options?.region) params.set('region', options.region);
	if (options?.limit) params.set('limit', options.limit.toString());
	if (options?.offset) params.set('offset', options.offset.toString());
	if (options?.userId) params.set('userId', options.userId);

	const queryString = params.toString();
	const swrKey = queryString ? `/api/routes?${queryString}` : "/api/routes";

	const { data, error, isLoading, mutate } =
		useProxySWR<ModelRouteResponseDto[]>(swrKey);

	// Preserve original isAiGenerated values from backend
	// Only set default to false if the field is missing (backward compatibility)
	const processedData = data?.map(route => ({
		...route,
		isAiGenerated: route.isAiGenerated ?? false
	}));

	return {
		// Standardized properties with processed data
		data: processedData,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate,
		// Legacy property for backward compatibility
		modelRoutes: processedData,
	};
}
