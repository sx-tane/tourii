import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { QuestListResponseDto } from "@/api/generated";

export function getQuests(query: string) {
    const { data, error, isLoading, mutate } = useProxySWR<QuestListResponseDto>(query);
    return {
        quests: data,
        isLoadingQuests: isLoading,
        isErrorQuests: error,
        mutateQuests: mutate,
    };
}
