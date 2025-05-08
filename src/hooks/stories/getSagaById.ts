import useSWR from "swr";
import { proxyFetcher, type StructuredError } from "@/lib/swr/fetcher";
import type { StoryChapterResponseDto } from "@/api/generated";

/**
 * Hook to fetch a single story (saga) by its ID using SWR.
 * Assumes the API endpoint returns the full Story object including chapterList.
 * @param storyId The ID of the story to fetch.
 * @returns SWR response object containing the story data, loading state, error state, and mutation function.
 */
export const getSagaById = (storyId: string | undefined) => {
	const swrKey = storyId ? `/api/stories/${storyId}/chapters` : null;

	const { data, error, isLoading, mutate } = useSWR<
		StoryChapterResponseDto[],
		StructuredError
	>(
		swrKey,
		storyId ? proxyFetcher<StoryChapterResponseDto[]> : null, // Use imported proxyFetcher
		{
			shouldRetryOnError: false,
			// suspense: true, // Optional
		},
	);

	return {
		storyChapter: data,
		isLoadingSaga: isLoading,
		isErrorSaga: error, // error is StructuredError or undefined
		mutateSaga: mutate,
	};
};
