import type { TouristSpotResponseDto } from "@/api/generated";
import type { UseApiHookResult } from "@/hooks/types";
import { useProxySWR } from "@/lib/swr/useProxySWR";

/**
 * Fetches tourist spots by story chapter ID
 * @param storyChapterId - The story chapter ID to fetch tourist spots for
 * @returns Tourist spots linked to the story chapter
 */
export function useTouristSpotsByChapter(
	storyChapterId: string | undefined,
): UseApiHookResult<TouristSpotResponseDto[]> {
	const { data, error, isLoading, mutate } = useProxySWR<
		TouristSpotResponseDto[]
	>(
		storyChapterId ? `/api/routes/tourist-spots/${storyChapterId}` : null,
		storyChapterId
			? {
					shouldRetryOnError: false,
				}
			: undefined,
	);

	return {
		data,
		error: (error as Error) || null,
		isLoading,
		isError: Boolean(error),
		mutate,
	};
}