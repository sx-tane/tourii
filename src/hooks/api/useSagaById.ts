import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { StoryChapterResponseDto } from "@/api/generated";
import type { UseApiHookResult } from "../types";

/**
 * Hook to fetch story chapters by saga ID using SWR.
 * Standardized API hook following the consistent pattern.
 *
 * @param storyId - The ID of the story to fetch chapters for
 * @returns Standardized hook result with story chapters data
 */
export function useSagaById(storyId: string | undefined): UseApiHookResult<
	StoryChapterResponseDto[]
> & {
	storyChapterList: StoryChapterResponseDto[] | undefined;
} {
	const swrKey = storyId ? `/api/stories/${storyId}/chapters` : null;
	const { data, error, isLoading, mutate } = useProxySWR<
		StoryChapterResponseDto[]
	>(swrKey, { shouldRetryOnError: false });

	return {
		// Standardized properties
		data,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate,
		// Legacy property for backward compatibility
		storyChapterList: data,
	};
}
