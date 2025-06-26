import { useSWRMutation } from "swr";
import type { UseApiHookResult } from "../types";

// Types for AI Route Recommendations API
export interface RouteSearchRequest {
	keywords: string[];
	mode?: "all" | "any";
	region?: string;
	proximityRadiusKm?: number;
	minSpotsPerCluster?: number;
	maxSpotsPerCluster?: number;
	maxRoutes?: number;
}

export interface AiGeneratedRoute {
	routeId: string;
	routeName: string;
	routeDescription: string;
	estimatedDurationMinutes: number;
	totalDistanceKm: number;
	confidence: number;
	region: string;
	hashtags: string[];
	touristSpots: Array<{
		touristSpotId: string;
		name: string;
		latitude: number;
		longitude: number;
		description: string;
		imageUrl?: string;
	}>;
}

export interface RouteRecommendationResponse {
	generatedRoutes: AiGeneratedRoute[];
	summary: {
		totalSpotsFound: number;
		clustersFormed: number;
		routesGenerated: number;
		processingTimeMs: number;
		aiAvailable: boolean;
	};
	message: string;
}

export interface UseAIRouteRecommendationsResult {
	trigger: (searchRequest: RouteSearchRequest) => Promise<RouteRecommendationResponse>;
	data: RouteRecommendationResponse | undefined;
	error: Error | null;
	isMutating: boolean;
	reset: () => void;
}

/**
 * Hook for AI-powered route recommendations
 * Uses mutation pattern since this is a search operation with user input
 * 
 * @param options Configuration options for the hook
 * @returns AI route recommendations result with trigger function
 */
export function useAIRouteRecommendations(options?: {
	onSuccess?: (data: RouteRecommendationResponse) => void;
	onError?: (error: Error) => void;
}): UseAIRouteRecommendationsResult {
	const { trigger, data, error, isMutating, reset } = useSWRMutation(
		"/api/ai/routes/recommendations",
		async (url: string, { arg }: { arg: RouteSearchRequest }) => {
			// Get user ID from localStorage if available
			const userId = typeof window !== "undefined" 
				? localStorage.getItem("userId") || undefined 
				: undefined;

			const headers: Record<string, string> = {
				"Content-Type": "application/json",
				"accept-version": "1.0.0",
			};

			// Add user ID header if available for rate limiting
			if (userId) {
				headers["x-user-id"] = userId;
			}

			const response = await fetch(url, {
				method: "POST",
				headers,
				body: JSON.stringify(arg),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const error = new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
				(error as any).status = response.status;
				(error as any).code = errorData.code || `AIRouteError_${response.status}`;
				(error as any).details = errorData.details;
				throw error;
			}

			return (await response.json()) as RouteRecommendationResponse;
		},
		{
			onSuccess: options?.onSuccess,
			onError: (error) => {
				console.error("AI Route Recommendations Error:", error);
				options?.onError?.(error);
			},
		}
	);

	return {
		trigger,
		data,
		error,
		isMutating,
		reset,
	};
}

/**
 * Helper hook for caching and retrieving popular search terms
 * This could be used for autocomplete/suggestions in the keyword input
 */
export function usePopularKeywords(): UseApiHookResult<string[]> {
	// This would typically fetch from a dedicated endpoint
	// For now, return hardcoded popular terms based on the issue requirements
	const popularKeywords = [
		"animation", "traditional culture", "food & nightlife", 
		"nature", "adventure", "temples", "festivals", 
		"cherry blossoms", "hot springs", "mountain views",
		"coastal scenery", "historical sites", "modern architecture"
	];

	return {
		data: popularKeywords,
		isLoading: false,
		isError: false,
		error: null,
		mutate: async () => popularKeywords,
	};
}