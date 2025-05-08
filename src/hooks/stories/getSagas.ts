import useSWR from "swr";
import { proxyFetcher, type StructuredError } from "@/lib/swr/fetcher";
import type { StoryResponseDto } from "@/api/generated/models/StoryResponseDto";

export function getSagas() {
	// This key now points to your Next.js API proxy route
	const swrKey = "/api/stories/sagas";

	const { data, error, isLoading, mutate } = useSWR<
		StoryResponseDto[], // Use the application-defined Story type
		StructuredError
	>(swrKey, proxyFetcher<StoryResponseDto[]>);

	return {
		// Data should be Story[] or undefined
		sagas: data,
		isLoading,
		isError: error, // error is StructuredError or undefined
		mutateSagas: mutate,
	};
}
