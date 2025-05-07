import useSWR from "swr";
import type { Story } from "@/app/v2/(stories)/types";
import { proxyFetcher, type StructuredError } from "@/lib/swr/fetcher";

export function getSagas() {
	// This key now points to your Next.js API proxy route
	const swrKey = "/api/stories/sagas";

	const { data, error, isLoading, mutate } = useSWR<
		Story[], // Use the application-defined Story type
		StructuredError
	>(swrKey, proxyFetcher<Story[]>);

	return {
		// Data should be Story[] or undefined
		sagas: data,
		isLoading,
		isError: error, // error is StructuredError or undefined
		mutateSagas: mutate,
	};
}
