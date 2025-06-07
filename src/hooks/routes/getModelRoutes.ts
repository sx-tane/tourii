import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";

/**
 * Hook to fetch all model routes using SWR.
 * @returns SWR response object containing the model routes data, loading state, error state, and mutation function.
 */
export function getModelRoutes() {
	const swrKey = "/api/routes/model-routes";
	const { data, error, isLoading, mutate } =
		useProxySWR<ModelRouteResponseDto[]>(swrKey);
	return {
		modelRoutes: data,
		isLoadingModelRoutes: isLoading,
		isErrorModelRoutes: error,
		mutateModelRoutes: mutate,
	};
}
