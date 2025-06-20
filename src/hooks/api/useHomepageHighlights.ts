import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { HomepageHighlightsResponseDto } from "@/api/generated";
import type { UseApiHookResult } from "../types";

/**
 * Hook to fetch homepage highlights using SWR.
 * Standardized API hook following the consistent pattern.
 *
 * @returns Standardized hook result with homepage highlights data
 */
export function useHomepageHighlights(): UseApiHookResult<HomepageHighlightsResponseDto> {
	const { data, error, isLoading, mutate } =
		useProxySWR<HomepageHighlightsResponseDto>("/api/homepage/highlights");

	return {
		data,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate,
	};
}