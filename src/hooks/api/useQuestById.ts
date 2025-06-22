import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { QuestResponseDto } from "@/api/generated";
import type { UseApiHookResult } from "../types";

/**
 * Hook to fetch a specific quest by ID using SWR.
 * Standardized API hook following the consistent pattern.
 *
 * @param questId - The ID of the quest to fetch
 * @returns Standardized hook result with quest data
 */
export function useQuestById(
	questId: string | undefined,
): UseApiHookResult<QuestResponseDto> & {
	quest: QuestResponseDto | undefined;
} {
	const swrKey = questId ? `/api/quests/${questId}` : null;
	const { data, error, isLoading, mutate } =
		useProxySWR<QuestResponseDto>(swrKey);

	return {
		// Standardized properties
		data,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate,
		// Legacy property for backward compatibility
		quest: data,
	};
}
