import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import type { Story } from "@/app/v2/(stories)/types";

export function useSagas() {
	const { data, error, isLoading, mutate } = useSWR<Story[]>(
		"/api/stories/sagas",
		fetcher,
	);

	return {
		sagas: data,
		isLoading,
		isError: error,
		mutateSagas: mutate,
	};
}
