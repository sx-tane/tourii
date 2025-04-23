import type { BackendStoryChapter, Story } from "@/app/v2/(stories)/types";
import type { ApiError } from "@/lib/errors";
import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";

/**
 * Hook to fetch a single story (saga) by its ID using SWR.
 * Assumes the API endpoint returns the full Story object including chapterList.
 * @param storyId The ID of the story to fetch.
 * @returns SWR response object containing the story data, loading state, error state, and mutation function.
 */
export const useSagaById = (storyId: string | undefined) => {
	// Construct the API endpoint URL. Only fetch if storyId is valid.
	const apiUrl = storyId ? `/api/stories/${storyId}` : null;

	// Fetch the combined Story object
	const { data, error, isLoading, mutate } = useSWR<
		BackendStoryChapter[],
		ApiError
	>(apiUrl, fetcher, {
		shouldRetryOnError: false,
	});

	return {
		// Return the combined data under the 'storyChapter' key as originally expected by the component
		storyChapter: data,
		isLoadingSaga: isLoading,
		isErrorSaga: error,
		mutateSaga: mutate,
	};
};
