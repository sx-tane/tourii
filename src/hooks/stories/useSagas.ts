import useSWR from "swr";
import {
	StoriesService,
	ApiError,
	// You might need to import the specific response type if you want to use it explicitly,
	// e.g., type GetSagasResponse = Awaited<ReturnType<typeof StoriesService.touriiBackendControllerGetSagas>>;
	// However, SWR can infer it.
} from "@/api/generated";
import { env } from "@/env.js"; // Import env for API key
import type { Story } from "@/app/v2/(stories)/types";

// The old fetcher and Story type are no longer needed here as the SDK provides them.
// import { fetcher } from "@/lib/swr/fetcher";
// import type { Story } from "@/app/v2/(stories)/types";

// Define a type for the structured error for better type safety
interface StructuredError {
	message: string;
	status?: number;
	code?: string;
	details?: unknown;
}

export function useSagas() {
	const swrKey = "/api/stories/sagas";

	const { data, error, isLoading, mutate } = useSWR<Story[], StructuredError>(
		swrKey,
		async () => {
			const apiKey = env.NEXT_PUBLIC_BACKEND_API_KEY;
			const acceptVersion = "1.0.0";

			if (!apiKey) {
				console.error("API key is not available for getSagas.");
				throw {
					message: "API key is not configured",
					status: 401,
					code: "ApiKeyMissing",
				} as StructuredError;
			}

			try {
				// The SDK method should return the correctly typed data directly
				const sagasData = await StoriesService.touriiBackendControllerGetSagas(
					acceptVersion,
					apiKey,
				);
				return sagasData as unknown as Story[]; // Reverted to 'as unknown as' to match original behavior pending clarification
			} catch (err) {
				let structuredError: StructuredError = {
					message: "An unexpected error occurred while fetching sagas.",
					status: 500,
					code: "UnknownError",
					details: err,
				};

				if (err instanceof ApiError) {
					structuredError = {
						message: err.message || `Failed to fetch sagas (status: ${err.status})`,
						status: err.status,
						code: typeof err.body === 'object' && err.body !== null && 'code' in err.body && typeof (err.body as { code: unknown }).code === 'string' ? (err.body as { code: string }).code : 'BackendError',
						details: err.body,
					};
				} else if (err instanceof Error) {
					structuredError.message = err.message;
				}
				console.error("Error in useSagas fetcher:", err); 
				throw structuredError;
			}
		},
		{
			// suspense: true, // Optional: if you want to use SWR with Suspense
			// shouldRetryOnError: false, // From your original hook, re-add if needed
		},
	);

	return {
		// data will be typed automatically by the generated SDK.
		// It should be an array of objects matching the response schema for /stories/sagas
		sagas: data,
		isLoading,
		isError: error,
		mutateSagas: mutate,
	};
}
