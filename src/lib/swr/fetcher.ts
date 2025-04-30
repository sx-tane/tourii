import { ApiError } from "@/lib/errors"; // Import custom error

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    let errorPayload: any = { message: `Request failed with status ${res.status}` };
    try {
      // Attempt to parse backend JSON error response
      const jsonResponse = await res.json();
      // Assume backend might send { error: { message: ..., code: ..., details: ... } } or similar
      if (typeof jsonResponse === 'object' && jsonResponse !== null) {
         if ('error' in jsonResponse && typeof jsonResponse.error === 'object' && jsonResponse.error !== null) {
            // Prefer structured error if available
            errorPayload = {
              message: jsonResponse.error.message || errorPayload.message,
              code: jsonResponse.error.code,
              details: jsonResponse.error.details,
            };
         } else if ('message' in jsonResponse) {
           // Fallback to top-level message if present
           errorPayload.message = jsonResponse.message || errorPayload.message;
         }
      }
    } catch (e) {
      // If response is not JSON or parsing fails, use the basic message
      console.warn(`Failed to parse error response body from ${url}:`, e);
    }

    // Throw the custom ApiError
    throw new ApiError(errorPayload.message, res.status, {
      code: errorPayload.code,
      details: errorPayload.details,
      responseBody: errorPayload, // Include the parsed/attempted body for context
    });
  }

  return res.json();
}; 