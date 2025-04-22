import { NextResponse } from "next/server";
import { env } from "@/env.js"; // Import the validated env object
import { AppError, ApiError } from "@/lib/errors"; // Import custom errors
import { logger } from "@/utils/logger"; // Assuming logger exists

// Read validated & typed env variables
const BACKEND_URL = env.BACKEND_URL;
const API_KEY = env.BACKEND_API_KEY;
// Use a default if the optional version isn't set
const API_VERSION = env.BACKEND_API_VERSION || "1.0.0";

// Helper to create standard JSON error responses
function touriiErrorResponse(message: string, status: number, code?: string, details?: unknown) {
	return NextResponse.json(
		{ error: { message, code, details } },
		{ status }
	);
}

export async function GET() {
	// No need for manual checks here, t3-env handles it

	try {
		const response = await fetch(`${BACKEND_URL}/stories/sagas`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": API_KEY, // Use validated API_KEY
				"accept-version": API_VERSION, // Use validated/defaulted API_VERSION
			},
			cache: "no-store",
		});

		if (!response.ok) {
			let errorBody: any;
			try {
				errorBody = await response.json();
			} catch (parseError) {
				try {
					errorBody = { message: await response.text() };
				} catch (textError) {
					errorBody = { message: "Could not read error response body." };
				}
			}

			const errorMessage =
				typeof errorBody === "object" && errorBody !== null && "message" in errorBody && typeof errorBody.message === "string"
					? errorBody.message
					: response.statusText || "Unknown backend error";

			// Log the detailed error from backend
			logger.error(
				`Backend error fetching sagas: ${response.status} ${response.statusText}`,
				{ status: response.status, responseBody: errorBody }
			);

			// Throw an ApiError to be caught by the main catch block
			throw new ApiError(
				`Failed to fetch sagas from backend (${response.status}): ${errorMessage}`,
				response.status, // Use backend status
				{ details: errorBody } // Pass backend response details
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		// Log the error with more structure
		logger.error("API Route Error fetching sagas:", { error });

		if (error instanceof ApiError) {
			// If it's an ApiError (likely from the fetch block above), re-use its status and details
			return touriiErrorResponse(error.message, error.status, error.code, error.details);
		} else if (error instanceof AppError) {
			// Handle other custom app errors if needed
			return touriiErrorResponse(error.message, 500, error.name, error.context);
		} else if (error instanceof Error) {
			// Generic error
			return touriiErrorResponse(error.message, 500, "InternalServerError");
		} else {
			// Unknown error type
			return touriiErrorResponse("An unexpected error occurred", 500, "UnknownError");
		}
	}
}
