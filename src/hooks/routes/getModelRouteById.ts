import { ModelRouteResponseDto, TouristSpotResponseDto } from "@/api/generated";
import { useProxySWR } from "@/lib/swr/useProxySWR";

export const getModelRouteById = (modelRouteId: string | undefined) => {
	const swrKey = modelRouteId ? `/api/routes/${modelRouteId}` : null;
	const { data, error, isLoading, mutate } =
		useProxySWR<ModelRouteResponseDto>(swrKey);
	return {
		modelRoute: data,
		isLoadingModelRoute: isLoading,
		isErrorModelRoute: error,
		mutateModelRoute: mutate,
	};
};
