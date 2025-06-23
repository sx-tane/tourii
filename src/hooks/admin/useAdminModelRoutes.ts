import type {
	ModelRouteCreateRequestDto,
	TouristSpotCreateRequestDto,
} from "@/api/generated";
import useSWRMutation from "swr/mutation";

// Model Route Mutations
export function useCreateModelRoute(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/routes/create-model-route",
		async (url: string, { arg }: { arg: ModelRouteCreateRequestDto }) => {
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arg),
			});
			if (!response.ok) throw new Error("Failed to create model route");
			return response.json();
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to create model route:", error);
				alert("Failed to create model route. Please try again.");
			},
		},
	);
}

export function useUpdateModelRoute(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/routes/update-model-route",
		async (
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
		) => {
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arg),
			});
			if (!response.ok) throw new Error("Failed to update model route");
			return response.json();
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to update model route:", error);
				alert("Failed to update model route. Please try again.");
			},
		},
	);
}

export function useDeleteModelRoute(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/routes",
		async (url: string, { arg }: { arg: { routeId: string } }) => {
			const response = await fetch(`${url}/${arg.routeId}`, {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("Failed to delete model route");
			return { success: true };
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to delete model route:", error);
				alert(
					`Failed to delete model route: ${error instanceof Error ? error.message : String(error)}`,
				);
			},
		},
	);
}

// Tourist Spot Mutations
export function useCreateTouristSpot(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/routes/create-tourist-spot",
		async (
			url: string,
			{ arg }: { arg: TouristSpotCreateRequestDto & { modelRouteId: string } },
		) => {
			const { modelRouteId, ...touristSpotData } = arg;
			const response = await fetch(`${url}/${modelRouteId}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(touristSpotData),
			});
			if (!response.ok) throw new Error("Failed to create tourist spot");
			return response.json();
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to create tourist spot:", error);
				alert("Failed to create tourist spot. Please try again.");
			},
		},
	);
}

export function useUpdateTouristSpot(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/routes/update-tourist-spot",
		async (
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
		) => {
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arg),
			});
			if (!response.ok) throw new Error("Failed to update tourist spot");
			return response.json();
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to update tourist spot:", error);
				alert("Failed to update tourist spot. Please try again.");
			},
		},
	);
}

export function useDeleteTouristSpot(onSuccess?: () => void) {
	return useSWRMutation(
		"/api/routes/delete-tourist-spot",
		async (url: string, { arg }: { arg: { spotId: string } }) => {
			const response = await fetch(`${url}/${arg.spotId}`, {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("Failed to delete tourist spot");
			return { success: true };
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (error) => {
				console.error("Failed to delete tourist spot:", error);
				alert(
					`Failed to delete tourist spot: ${error instanceof Error ? error.message : String(error)}`,
				);
			},
		},
	);
}
