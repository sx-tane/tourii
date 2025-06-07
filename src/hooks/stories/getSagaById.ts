import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { StoryChapterResponseDto } from "@/api/generated";

/**
 * Hook to fetch a single story (saga) by its ID using SWR.
 * Assumes the API endpoint returns the full Story object including chapterList.
 * @param storyId The ID of the story to fetch.
 * @returns SWR response object containing the story data, loading state, error state, and mutation function.
 */
export const getSagaById = (storyId: string | undefined) => {
	const swrKey = storyId ? `/api/stories/${storyId}/chapters` : null;
	const { data, error, isLoading, mutate } =
		useProxySWR<StoryChapterResponseDto[]>(swrKey, { shouldRetryOnError: false });
	return {
		storyChapterList: data,
		isLoadingStoryChapterList: isLoading,
		isErrorStoryChapterList: error, // error is StructuredError or undefined
		mutateStoryChapterList: mutate,
	};
};
