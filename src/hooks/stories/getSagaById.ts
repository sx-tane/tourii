import useSWR from "swr";
import type { BackendStoryChapter } from "@/app/v2/(stories)/types";
import { proxyFetcher, type StructuredError } from "@/lib/swr/fetcher";

/**
 * Hook to fetch a single story (saga) by its ID using SWR.
 * Assumes the API endpoint returns the full Story object including chapterList.
 * @param storyId The ID of the story to fetch.
 * @returns SWR response object containing the story data, loading state, error state, and mutation function.
 */
export const getSagaById = (storyId: string | undefined) => {
	const swrKey = storyId ? `/api/stories/${storyId}/chapters` : null;

	const { data, error, isLoading, mutate } = useSWR<
		BackendStoryChapter[],
		StructuredError
	>(
		swrKey,
		storyId ? proxyFetcher<BackendStoryChapter[]> : null, // Use imported proxyFetcher
		{
			shouldRetryOnError: false,
			// suspense: true, // Optional
		},
	);

	return {
		storyChapter: data, // data is BackendStoryChapter[] or undefined
		isLoadingSaga: isLoading,
		isErrorSaga: error, // error is StructuredError or undefined
		mutateSaga: mutate,
	};
};
