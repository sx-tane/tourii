import useSWR from "swr";
import {
	StoriesService,
	ApiError,
	// Import the specific response type for chapters if needed explicitly.
	// type GetStoryChaptersResponse = Awaited<ReturnType<typeof StoriesService.touriiBackendControllerGetStoryChaptersByStoryId>>;
} from "@/api/generated";
import { env } from "@/env.js";
import type { BackendStoryChapter } from "@/app/v2/(stories)/types";

// Types from `types.ts` and the generic `fetcher` are no longer directly used here if relying on SDK types.
// import type { BackendStoryChapter, Story } from "@/app/v2/(stories)/types";
// import type { ApiError } from "@/lib/errors";
// import { fetcher } from "@/lib/swr/fetcher";

// Define a type for the structured error for better type safety
interface StructuredError {
	message: string;
	status?: number;
	code?: string;
	details?: unknown;
}

/**
 * Hook to fetch a single story (saga) by its ID using SWR.
 * Assumes the API endpoint returns the full Story object including chapterList.
 * @param storyId The ID of the story to fetch.
 * @returns SWR response object containing the story data, loading state, error state, and mutation function.
 */
export const useSagaById = (storyId: string | undefined) => {
	// Ensure the SWR key is null if storyId is undefined to prevent fetching.
	// Using a more descriptive key reflecting the actual API call.
	const swrKey = storyId ? `GET /api/stories/sagas/${storyId}/chapters` : null;

	const { data, error, isLoading, mutate } = useSWR<
		BackendStoryChapter[],
		StructuredError
	>(
		swrKey,
		async () => {
			if (!storyId) {
				// This case should ideally not be reached if swrKey is null and SWR doesn't call the fetcher.
				// However, as a safeguard or if key logic changes:
				throw {
					message: "Story ID is required to fetch chapters.",
					status: 400,
					code: "StoryIdMissing",
				} as StructuredError;
			}

			const apiKey = env.NEXT_PUBLIC_BACKEND_API_KEY;
			const acceptVersion = "1.0.0";

			if (!apiKey) {
				console.error(
					`API key is not available for getStoryChaptersByStoryId (storyId: ${storyId}).`,
				);
				throw {
					message: "API key is not configured",
					status: 401,
					code: "ApiKeyMissing",
				} as StructuredError;
			}

			try {
				const chaptersData = await StoriesService.touriiBackendControllerGetStoryChaptersByStoryId(
					storyId,
					acceptVersion,
					apiKey,
				);
				return chaptersData as unknown as BackendStoryChapter[];
			} catch (err) {
				let structuredError: StructuredError = {
					message: `An unexpected error occurred while fetching chapters for story ${storyId}.`,
					status: 500,
					code: "UnknownError",
					details: err,
				};

				if (err instanceof ApiError) {
					structuredError = {
						message: err.message || `Failed to fetch chapters (status: ${err.status})`,
						status: err.status,
						code: typeof err.body === 'object' && err.body !== null && 'code' in err.body && typeof (err.body as { code: unknown }).code === 'string' ? (err.body as { code: string }).code : 'BackendError',
						details: err.body,
					};
				} else if (err instanceof Error) {
					structuredError.message = err.message;
				}
				console.error(`Error in useSagaById fetcher (storyId: ${storyId}):`, err);
				throw structuredError;
			}
		},
		{
			shouldRetryOnError: false,
			// suspense: true, 
		},
	);

	return {
		storyChapter: data, // data is BackendStoryChapter[] or undefined
		isLoadingSaga: isLoading,
		isErrorSaga: error, // error is now StructuredError
		mutateSaga: mutate,
	};
};
