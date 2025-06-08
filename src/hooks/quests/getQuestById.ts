import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { QuestResponseDto } from "@/api/generated";

export function getQuestById(questId: string | undefined) {
    const swrKey = questId ? `/api/quests/${questId}` : null;
    const { data, error, isLoading, mutate } = useProxySWR<QuestResponseDto>(swrKey);
    return {
        quest: data,
        isLoadingQuest: isLoading,
        isErrorQuest: error,
        mutateQuest: mutate,
    };
}
