import { NextResponse } from "next/server";
import { env } from "@/env.js";
import { OpenAPI, ApiError, type CancelablePromise } from "@/api/generated";
import { logger } from "@/utils/logger";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// Standardized JSON error response helper
export function touriiErrorResponse(
	message: string,
	status: number,
	code?: string,
	details?: unknown,
): NextResponse {
	return NextResponse.json({ error: { message, code, details } }, { status });
}

// For type-safe access to error.body properties from ApiError
export interface ErrorBodyWithCode {
	code?: string;
	message?: string;
}

export function isErrorBodyWithCode(body: unknown): body is ErrorBodyWithCode {
	return typeof body === "object" && body !== null;
}

/**
 * Higher-order function to wrap API route logic with common setup and error handling.
 * The serviceCall function will be provided with the apiKey and apiVersion.
 */
export async function executeValidatedServiceCall<T>(
	// The serviceCall function must accept apiKey and apiVersion
	serviceCall: (apiKey: string, apiVersion: string) => CancelablePromise<T>,
	routeNameForLogging: string,
): Promise<NextResponse> {
	// TODO: Uncomment this when we have a valid session
	// Cannot Request API without a valid session
	// const session = await getServerSession(authOptions);
	// if (!session || !session.accessToken) {
	//   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	// }

	OpenAPI.BASE = env.NEXT_PUBLIC_BACKEND_URL; // Set this for the scope of the SDK call
	// Attach user JWT to SDK calls TODO: Uncomment this when we have a valid session
	// OpenAPI.TOKEN = `Bearer ${session.accessToken}`;  // attach user JWT to SDK calls
	const apiKey = env.BACKEND_API_KEY;
	const apiVersion = env.BACKEND_API_VERSION || "1.0.0";

	if (!OpenAPI.BASE || !apiKey) {
		logger.error(
			`API Route ${routeNameForLogging}: Missing backend URL or API key in server environment.`,
		);
		return touriiErrorResponse(
			"Server configuration error for backend communication.",
			500,
			"InternalServerError_ProxyConfig",
		);
	}

	logger.info(
		`Executing ${routeNameForLogging} via generated SDK. Target: ${OpenAPI.BASE}`,
	);

	try {
		// Pass apiKey and apiVersion to the serviceCall function
		const data = await serviceCall(apiKey, apiVersion);
		logger.info(`${routeNameForLogging}: Successfully executed using SDK.`);
		return NextResponse.json(data);
	} catch (error) {
		logger.error(
			`${routeNameForLogging}: Error using SDK to fetch from backend.`,
			{ error },
		);

		if (error instanceof ApiError) {
			let errorCode: string | undefined = "ProxySDK_ApiError";
			let errorMessage =
				error.message ||
				"Error communicating with backend via proxy (ApiError).";

			if (isErrorBodyWithCode(error.body)) {
				if (typeof error.body.code === "string") {
					errorCode = error.body.code;
				}
				// Sometime backend might put detailed message in error.body.message
				if (typeof error.body.message === "string" && error.body.message) {
					errorMessage = error.body.message;
				}
			}
			return touriiErrorResponse(
				errorMessage,
				error.status || 502,
				errorCode,
				error.body,
			);
		}
		if (error instanceof Error) {
			return touriiErrorResponse(error.message, 500, "ProxySDK_GenericError");
		}
		return touriiErrorResponse(
			`An unexpected error occurred in ${routeNameForLogging}.`,
			500,
			"UnknownProxySDKError",
		);
	}
}
