import type {
	ModelRouteCreateRequestDto,
	TouristSpotCreateRequestDto,
} from "@/api/generated";
import { proxyMutationFetcher, type StructuredError } from "@/lib/swr/fetcher";
import useSWRMutation from "swr/mutation";

// Model Route Mutations
export function useCreateModelRoute(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/routes",
		(url: string, { arg }: { arg: ModelRouteCreateRequestDto }) => 
			proxyMutationFetcher(url, { arg, method: "POST" }),
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error: StructuredError) => {
				console.error("Failed to create model route:", error);
				alert(`Failed to create model route: ${error.message}`);
			},
		},
	);
}

export function useUpdateModelRoute(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/routes",
		(
			url: string,
			{
				arg,
			}: {
				arg: ModelRouteCreateRequestDto & {
					modelRouteId: string;
					delFlag: boolean;
					updUserId: string;
				};
			},
		) => proxyMutationFetcher(`${url}/${arg.modelRouteId}`, { arg, method: "PUT" }),
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error: StructuredError) => {
				console.error("Failed to update model route:", error);
				alert(`Failed to update model route: ${error.message}`);
			},
		},
	);
}

export function useDeleteModelRoute(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/routes",
		(url: string, { arg }: { arg: { routeId: string } }) => 
			proxyMutationFetcher(`${url}/${arg.routeId}`, { arg, method: "DELETE" }),
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error: StructuredError) => {
				console.error("Failed to delete model route:", error);
				alert(`Failed to delete model route: ${error.message}`);
			},
		},
	);
}

// Tourist Spot Mutations
export function useCreateTouristSpot(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/routes",
		(
			url: string,
			{ arg }: { arg: TouristSpotCreateRequestDto & { modelRouteId: string } },
		) => {
			const { modelRouteId, ...touristSpotData } = arg;
			const createUrl = `${url}/${modelRouteId}/tourist-spots`;
			const payload = { ...touristSpotData, createNew: true };
			return proxyMutationFetcher(createUrl, { arg: payload, method: "POST" });
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error: StructuredError) => {
				console.error("Failed to create tourist spot:", error);
				alert(`Failed to create tourist spot: ${error.message}`);
			},
		},
	);
}

export function useUpdateTouristSpot(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/tourist-spots",
		(
			url: string,
			{
				arg,
			}: {
				arg: TouristSpotCreateRequestDto & {
					touristSpotId: string;
					delFlag: boolean;
					updUserId: string;
				};
			},
		) => proxyMutationFetcher(`${url}/${arg.touristSpotId}`, { arg, method: "POST" }),
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error: StructuredError) => {
				console.error("Failed to update tourist spot:", error);
				alert(`Failed to update tourist spot: ${error.message}`);
			},
		},
	);
}

export function useDeleteTouristSpot(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/tourist-spots",
		(url: string, { arg }: { arg: { spotId: string } }) => 
			proxyMutationFetcher(`${url}/${arg.spotId}`, { arg, method: "DELETE" }),
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error: StructuredError) => {
				console.error("Failed to delete tourist spot:", error);
				alert(`Failed to delete tourist spot: ${error.message}`);
			},
		},
	);
}
