// Standardized error structure for SWR hooks when using proxied API calls
export interface StructuredError {
	message: string;
	status?: number;
	code?: string;
	details?: unknown;
}

// Generic fetcher for SWR, designed to call Next.js API proxy routes
export async function proxyFetcher<T>(url: string): Promise<T> {
	const res = await fetch(url);

	if (!res.ok) {
		let errorPayload: StructuredError = {
			message: `An error occurred while fetching from proxy: ${res.statusText}`,
			status: res.status,
			code: "ProxyFetchError",
		};
		try {
			// Attempt to parse the JSON error response from the Next.js API proxy route
			const errorData = await res.json();
			// Assumes proxy routes return errors in a structure like: { error: { message, code, details } }
			// or directly { message, code, details }
			errorPayload = {
				message:
					errorData?.error?.message || errorData?.message || res.statusText,
				status: res.status, // Always use the actual response status
				code:
					errorData?.error?.code ||
					errorData?.code ||
					`ProxyError_${res.status}`,
				details: errorData?.error?.details || errorData?.details || errorData,
			};
		} catch (e) {
			// If parsing the error response body fails, stick with the initial payload
			console.error(
				`Failed to parse error JSON from proxy endpoint ${url}:`,
				e,
			);
		}
		throw errorPayload;
	}

	// If response is OK, parse and return data
	try {
		return (await res.json()) as T;
	} catch (e) {
		console.error(
			`Failed to parse success JSON from proxy endpoint ${url}:`,
			e,
		);
		// Throw a structured error if JSON parsing of a successful response fails
		throw {
			message: "Invalid JSON response from a successful proxy request.",
			status: res.status, // Still use original status
			code: "ProxySuccessInvalidJSON",
			details: await res.text().catch(() => "Could not read response text."), // Attempt to get body as text
		} as StructuredError;
	}
}
