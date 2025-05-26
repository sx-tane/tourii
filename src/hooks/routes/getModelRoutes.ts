import useSWR from "swr";
import { proxyFetcher, type StructuredError } from "@/lib/swr/fetcher";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";

/**
 * Hook to fetch all model routes using SWR.
 * @returns SWR response object containing the model routes data, loading state, error state, and mutation function.
 */
export function getModelRoutes() {
    const swrKey = "/api/routes/model-routes";

    const { data, error, isLoading, mutate } = useSWR<
        ModelRouteResponseDto[],
        StructuredError
    >(swrKey, proxyFetcher<ModelRouteResponseDto[]>);

    return {
        modelRoutes: data,
        isLoadingModelRoutes: isLoading,
        isErrorModelRoutes: error,
        mutateModelRoutes: mutate,
    };
}