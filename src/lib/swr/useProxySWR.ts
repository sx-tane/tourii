"use client";
import useSWR, { type SWRConfiguration } from "swr";
import { proxyFetcher, type StructuredError } from "./fetcher";

export function useProxySWR<T>(
	key: string | null,
	options?: SWRConfiguration<T, StructuredError>,
) {
	return useSWR<T, StructuredError>(key, key ? proxyFetcher<T> : null, options);
}
