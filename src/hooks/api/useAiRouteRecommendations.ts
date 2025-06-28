import type { AiRouteRecommendationRequestDto } from "@/api/generated/models/AiRouteRecommendationRequestDto";
import type { AiRouteRecommendationResponseDto } from "@/api/generated/models/AiRouteRecommendationResponseDto";
import useSWRMutation from "swr/mutation";

/**
 * Hook to fetch AI route recommendations using SWR mutation.
 * Provides unified route discovery combining existing and AI-generated routes.
 *
 * @returns SWR mutation hook for AI route recommendations
 */
export function useAiRouteRecommendations() {
	return useSWRMutation(
		"/api/ai/routes/recommendations",
		async (url: string, { arg }: { arg: AiRouteRecommendationRequestDto }) => {
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arg),
			});
			if (!response.ok) throw new Error("Failed to get AI route recommendations");
			return response.json() as Promise<AiRouteRecommendationResponseDto>;
		},
		{
			onError: (error) => {
				console.error("Failed to get AI route recommendations:", error);
			},
		},
	);
}