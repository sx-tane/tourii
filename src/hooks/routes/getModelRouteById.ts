import { ModelRouteResponseDto, TouristSpotResponseDto } from "@/api/generated";
import { useProxySWR } from "@/lib/swr/useProxySWR";

export const getModelRouteById = (modelRouteId: string | undefined) => {
	const swrKey = modelRouteId ? `/api/routes/${modelRouteId}/tourist-spot` : null;
	const { data, error, isLoading, mutate } =
		useProxySWR<TouristSpotResponseDto[]>(swrKey);
	return {
		touristSpotList: data,
		isLoadingTouristSpotList: isLoading,
		isErrorTouristSpotList: error,
		mutateTouristSpotList: mutate,
	};
};
