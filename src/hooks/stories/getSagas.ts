import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { StoryResponseDto } from "@/api/generated/models/StoryResponseDto";

/**
 * Hook to fetch all sagas using SWR.
 * @returns SWR response object containing the sagas data, loading state, error state, and mutation function.
 */
export function getSagas() {
	// This key now points to your Next.js API proxy route
	const swrKey = "/api/stories/sagas";
	const { data, error, isLoading, mutate } =
		useProxySWR<StoryResponseDto[]>(swrKey);
	return {
		sagas: data,
		isLoadingSagas: isLoading,
		isErrorSagas: error, // error is StructuredError or undefined
		mutateSagas: mutate,
	};
}
