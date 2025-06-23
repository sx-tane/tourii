import { useCallback } from "react";
import type { StoryCompletionResponseDto } from "@/api/generated";

/**
 * Hook for completing story chapters and handling quest unlocks.
 *
 * This hook provides a function to complete story chapters via the API,
 * following the three-layer pattern: SWR Hook → Next.js API → Generated Client
 */
export function useStoryCompletion() {
	/**
	 * Complete a story chapter and return unlocked quests
	 */
	const completeStoryChapter = useCallback(
		async (
			chapterId: string,
			userId?: string,
		): Promise<StoryCompletionResponseDto> => {
			const body = userId ? JSON.stringify({ userId }) : undefined;

			const response = await fetch(
				`/api/stories/chapters/${chapterId}/complete`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body,
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message ||
						`Failed to complete story chapter: ${response.status}`,
				);
			}

			return response.json();
		},
		[],
	);

	return {
		completeStoryChapter,
	};
}
