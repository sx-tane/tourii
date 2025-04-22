import useSWR from 'swr';
import { fetcher } from '@/lib/swr/fetcher';
import type { Story } from '@/app/v2/(stories)/types'; // Import the Story type

export function useSagas() {
  // Use the API route defined earlier
  const { data, error, isLoading, mutate } = useSWR<Story[]>('/api/stories/sagas', fetcher);

  // The 'mutate' function can be used to manually re-trigger a fetch or update local cache

  return {
    sagas: data, // The fetched data (array of Story objects)
    isLoading,
    isError: error, // The error object if the fetch failed
    mutateSagas: mutate, // Function to revalidate/mutate the data
  };
} 