import useSWRMutation from "swr/mutation";

/**
 * Response type for available hashtags endpoint
 */
export interface AvailableHashtagsResponse {
	topHashtags: Array<{
		hashtag: string;
		count: number;
	}>;
	totalCount: number;
	region?: string;
}

/**
 * Request type for available hashtags endpoint
 */
export interface AvailableHashtagsRequest {
	region?: string;
}

/**
 * Hook to fetch available hashtags for AI route discovery using SWR mutation.
 * Supports optional region filtering.
 *
 * @returns SWR mutation hook for fetching hashtags
 */
export function useAvailableHashtags() {
	return useSWRMutation(
		"/api/ai/routes/hashtags/available",
		async (url: string, { arg }: { arg?: AvailableHashtagsRequest }) => {
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arg || {}),
			});
			if (!response.ok) throw new Error("Failed to fetch available hashtags");
			return response.json() as Promise<AvailableHashtagsResponse>;
		},
		{
			onError: (error) => {
				console.error("Failed to fetch hashtags:", error);
			},
		},
	);
}