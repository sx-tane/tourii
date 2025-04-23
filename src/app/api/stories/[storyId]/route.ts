import { NextResponse } from "next/server";
import { env } from "@/env.js";
import { AppError, ApiError } from "@/lib/errors";
import { logger } from "@/utils/logger";

// Read validated & typed env variables
const BACKEND_URL = env.BACKEND_URL;
const API_KEY = env.BACKEND_API_KEY;
const API_VERSION = env.BACKEND_API_VERSION || "1.0.0"; // Use a default if optional

// Helper to create standard JSON error responses (Copied from /sagas route)
function touriiErrorResponse(
	message: string,
	status: number,
	code?: string,
	details?: unknown,
) {
	return NextResponse.json({ error: { message, code, details } }, { status });
}

interface RouteParams {
	storyId: string;
}

/**
 * GET handler to fetch a single story by its ID from the backend service.
 */
export async function GET(
	request: Request,
	{ params }: { params: Promise<RouteParams> }, // params is a Promise
) {
	// Await params to resolve the promise
	const resolvedParams = await params;
	const { storyId } = resolvedParams;

	if (!storyId) {
		logger.warn(
			"API GET /api/stories/[storyId]/chapters: Missing storyId parameter",
		);
		// Use helper for consistency
		return touriiErrorResponse("Missing story ID", 400, "BadRequest");
	}

	const fetchUrl = `${BACKEND_URL}/stories/sagas/${storyId}/chapters`;
	logger.info(
		`API GET /api/stories/${storyId}/chapters: Fetching story chapters from ${fetchUrl}`,
	);

	try {
		const response = await fetch(fetchUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": API_KEY,
				"accept-version": API_VERSION,
			},
			cache: "no-store",
		});

		if (!response.ok) {
			// Use unknown for safety, then check type
			let errorBody: unknown;
			try {
				errorBody = await response.json();
			} catch (parseError) {
				try {
					// Read as text if JSON fails
					const textBody = await response.text();
					errorBody = {
						message: textBody || "Could not read error response body.",
					};
				} catch (textError) {
					errorBody = { message: "Could not read error response body." };
				}
			}

			// Type guard to safely access message property
			const errorMessage =
				typeof errorBody === "object" &&
				errorBody !== null &&
				"message" in errorBody &&
				typeof errorBody.message === "string"
					? errorBody.message
					: response.statusText || "Unknown backend error";

			logger.error(
				`Backend error fetching story ${storyId}: ${response.status} ${response.statusText}`,
				{ status: response.status, responseBody: errorBody },
			);

			// Throw ApiError like in /sagas route
			throw new ApiError(
				`Failed to fetch story ${storyId} from backend (${response.status}): ${errorMessage}`,
				response.status,
				// Pass the original unknown body as details
				{ details: errorBody },
			);
		}

		const data = await response.json();
		logger.info(
			`API GET /api/stories/${storyId}/chapters: Successfully fetched story chapters`,
		);
		return NextResponse.json(data);
	} catch (error) {
		// Log the error with more structure, checking type
		if (error instanceof Error) {
			logger.error(`API Route Error fetching story ${storyId}:`, {
				name: error.name,
				message: error.message,
				// Safely access cause if it exists and error is an Error instance
				cause: error.cause,
				stack: error.stack,
			});
		} else {
			logger.error(
				`API Route Error fetching story ${storyId} (unknown type):`,
				{ error },
			);
		}

		// Handle known error types and return standardized response
		if (error instanceof ApiError) {
			return touriiErrorResponse(
				error.message,
				error.status,
				error.code,
				error.details,
			);
		}
		if (error instanceof AppError) {
			return touriiErrorResponse(error.message, 500, error.name, error.context);
		}
		if (error instanceof Error) {
			return touriiErrorResponse(error.message, 500, "InternalServerError");
		}
		return touriiErrorResponse(
			"An unexpected error occurred",
			500,
			"UnknownError",
		);
	}
}
