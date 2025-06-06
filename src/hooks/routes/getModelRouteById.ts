import { ModelRouteResponseDto, TouristSpotResponseDto } from "@/api/generated";
import { StructuredError, proxyFetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";

export const getModelRouteById = (modelRouteId: string | undefined) => {
    const swrKey = modelRouteId ? `/api/routes/${modelRouteId}/tourist-spot` : null;

    const { data, error, isLoading, mutate } = useSWR<
        TouristSpotResponseDto[],
        StructuredError
    >(swrKey, proxyFetcher<TouristSpotResponseDto[]>);

    return {
        touristSpotList: data,
        isLoadingTouristSpotList: isLoading,
        isErrorTouristSpotList: error,
        mutateTouristSpotList: mutate,
    };
}
