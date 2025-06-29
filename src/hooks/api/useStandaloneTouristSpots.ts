import { useProxySWR } from "@/lib/swr/useProxySWR";
import { proxyMutationFetcher, type StructuredError } from "@/lib/swr/fetcher";
import type { 
	TouristSpotResponseDto, 
	TouristSpotCreateRequestDto,
	ModelRouteResponseDto 
} from "@/api/generated";
import type { UseApiHookResult } from "../types";
import useSWRMutation from "swr/mutation";

/**
 * Hook to fetch all tourist spots (including standalone ones) using SWR.
 * Returns all tourist spots from all routes.
 *
 * @returns Standardized hook result with tourist spots data
 */
export function useAllTouristSpots(): UseApiHookResult<TouristSpotResponseDto[]> {
	const swrKey = "/api/tourist-spots";
	const { data, error, isLoading, mutate } =
		useProxySWR<TouristSpotResponseDto[]>(swrKey);

	return {
		data,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate,
	};
}

/**
 * Hook to fetch a specific tourist spot by ID.
 *
 * @param spotId - The tourist spot ID
 * @returns Standardized hook result with tourist spot data
 */
export function useTouristSpotById(spotId: string | undefined): UseApiHookResult<TouristSpotResponseDto> {
	const swrKey = spotId ? `/api/tourist-spots/${spotId}` : null;
	const { data, error, isLoading, mutate } =
		useProxySWR<TouristSpotResponseDto>(swrKey);

	return {
		data,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate,
	};
}

/**
 * Hook to fetch all routes containing a specific tourist spot.
 *
 * @param spotId - The tourist spot ID
 * @returns Standardized hook result with routes data
 */
export function useTouristSpotRoutes(spotId: string | undefined): UseApiHookResult<ModelRouteResponseDto[]> {
	const swrKey = spotId ? `/api/tourist-spots/${spotId}/routes` : null;
	const { data, error, isLoading, mutate } =
		useProxySWR<ModelRouteResponseDto[]>(swrKey);

	return {
		data,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate,
	};
}

/**
 * Hook to create a standalone tourist spot using the new backend endpoint.
 *
 * @param onSuccess - Optional callback to execute on successful creation
 * @param onError - Optional callback to execute on error
 * @returns SWR mutation hook for creating tourist spots
 */
export function useCreateStandaloneTouristSpot(
	onSuccess?: (data: TouristSpotResponseDto) => void,
	onError?: (error: StructuredError) => void
) {
	return useSWRMutation(
		"/api/tourist-spots",
		(url: string, { arg }: { arg: TouristSpotCreateRequestDto }) =>
			proxyMutationFetcher<TouristSpotResponseDto, TouristSpotCreateRequestDto>(url, { arg, method: "POST" }),
		{
			onSuccess: (data) => {
				onSuccess?.(data);
			},
			onError: (error: StructuredError) => {
				console.error("Failed to create standalone tourist spot:", error);
				onError?.(error);
			},
		},
	);
}

/**
 * Hook to add an existing tourist spot to a route.
 *
 * @param onSuccess - Optional callback to execute on success
 * @returns SWR mutation hook for adding spots to routes
 */
export function useAddSpotToRoute(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/routes/add-spot",
		async (_url: string, { arg }: { arg: { routeId: string; touristSpotId: string } }) => {
			const { routeId, touristSpotId } = arg;
			const response = await fetch(`/api/routes/${routeId}/add-spot`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ touristSpotId }),
			});
			if (!response.ok) throw new Error("Failed to add tourist spot to route");
			return response.json();
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to add tourist spot to route:", error);
				alert("Failed to add tourist spot to route. Please try again.");
			},
		},
	);
}

/**
 * Hook to remove a tourist spot from a route (without deleting the spot).
 *
 * @param onSuccess - Optional callback to execute on success
 * @returns SWR mutation hook for removing spots from routes
 */
export function useRemoveSpotFromRoute(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/routes/remove-spot",
		async (_url: string, { arg }: { arg: { routeId: string; touristSpotId: string } }) => {
			const { routeId, touristSpotId } = arg;
			const response = await fetch(`/api/routes/${routeId}/remove-spot`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ touristSpotId }),
			});
			if (!response.ok) throw new Error("Failed to remove tourist spot from route");
			return { success: true };
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to remove tourist spot from route:", error);
				alert("Failed to remove tourist spot from route. Please try again.");
			},
		},
	);
}

/**
 * Hook to update an existing standalone tourist spot.
 *
 * @param onSuccess - Optional callback to execute on successful update
 * @param onError - Optional callback to execute on error
 * @returns SWR mutation hook for updating tourist spots
 */
export function useUpdateStandaloneTouristSpot(
	onSuccess?: (data: TouristSpotResponseDto) => void,
	onError?: (error: Error) => void
) {
	return useSWRMutation(
		"/api/tourist-spots/update",
		async (_url: string, { arg }: { arg: { spotId: string; data: Partial<TouristSpotCreateRequestDto> } }) => {
			const { spotId, data } = arg;
			const response = await fetch(`/api/tourist-spots/${spotId}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Failed to update tourist spot: ${errorText}`);
			}
			
			return response.json();
		},
		{
			onSuccess: (data) => {
				onSuccess?.(data);
			},
			onError: (error) => {
				console.error("Failed to update tourist spot:", error);
				onError?.(error);
			},
		},
	);
}

/**
 * Hook to delete a standalone tourist spot.
 *
 * @param onSuccess - Optional callback to execute on successful deletion
 * @param onError - Optional callback to execute on error
 * @returns SWR mutation hook for deleting tourist spots
 */
export function useDeleteStandaloneTouristSpot(
	onSuccess?: () => void,
	onError?: (error: Error) => void
) {
	return useSWRMutation(
		"/api/tourist-spots/delete",
		async (_url: string, { arg }: { arg: { spotId: string } }) => {
			const { spotId } = arg;
			const response = await fetch(`/api/tourist-spots/${spotId}`, {
				method: "DELETE",
			});
			
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Failed to delete tourist spot: ${errorText}`);
			}
			
			return { success: true };
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to delete tourist spot:", error);
				onError?.(error);
			},
		},
	);
}

/**
 * Hook to search tourist spots with filters.
 *
 * @param searchParams - Search parameters (name, location, hashtags)
 * @returns Standardized hook result with filtered tourist spots
 */
export function useSearchTouristSpots(searchParams: {
	query?: string;
	location?: string;
	hashtags?: string[];
}): UseApiHookResult<TouristSpotResponseDto[]> {
	const searchQuery = new URLSearchParams();
	if (searchParams.query) searchQuery.set('q', searchParams.query);
	if (searchParams.location) searchQuery.set('location', searchParams.location);
	if (searchParams.hashtags?.length) searchQuery.set('hashtags', searchParams.hashtags.join(','));
	
	const swrKey = searchQuery.toString() ? `/api/tourist-spots/search?${searchQuery.toString()}` : null;
	const { data, error, isLoading, mutate } = useProxySWR<TouristSpotResponseDto[]>(swrKey);

	return {
		data,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate,
	};
}

/**
 * Hook to create a user tourist route from existing tourist spots.
 *
 * @param userId - User ID for route ownership
 * @param onSuccess - Optional callback to execute on successful creation
 * @param onError - Optional callback to execute on error
 * @returns SWR mutation hook for creating user tourist routes
 */
export function useCreateUserTouristRoute(
	userId: string,
	onSuccess?: (data: ModelRouteResponseDto) => void,
	onError?: (error: Error) => void
) {
	return useSWRMutation(
		"/api/user-routes",
		async (url: string, { arg }: { 
			arg: {
				routeName: string;
				regionDesc: string;
				recommendations: string[];
				touristSpotIds: string[];
			}
		}) => {
			const response = await fetch(url, {
				method: "POST",
				headers: { 
					"Content-Type": "application/json",
					"x-user-id": userId
				},
				body: JSON.stringify(arg),
			});
			
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Failed to create user tourist route: ${errorText}`);
			}
			
			return response.json();
		},
		{
			onSuccess: (data) => {
				onSuccess?.(data);
			},
			onError: (error) => {
				console.error("Failed to create user tourist route:", error);
				onError?.(error);
			},
		},
	);
}