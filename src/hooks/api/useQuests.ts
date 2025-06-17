import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { QuestListResponseDto } from "@/api/generated";
import type { UseApiHookResult } from "../types";

/**
 * Hook to fetch quests using SWR.
 * Standardized API hook following the consistent pattern.
 * 
 * @param query - The API query string/endpoint
 * @returns Standardized hook result with quests data
 */
export function useQuests(
  query: string
): UseApiHookResult<QuestListResponseDto> & {
  quests: QuestListResponseDto | undefined;
} {
  const { data, error, isLoading, mutate } = useProxySWR<QuestListResponseDto>(query);
  
  return {
    // Standardized properties
    data,
    isLoading,
    isError: !!error,
    error,
    mutate,
    // Legacy property for backward compatibility
    quests: data,
  };
}