import { UserService } from "@/api/generated";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { validateUserAccess } from "@/lib/auth/utils";
import { NextResponse } from "next/server";

/**
 * GET /api/passport
 *
 * Fetches current user's passport data from the backend.
 * Returns user profile information including digital passport details.
 * SECURITY: Now uses proper session-based authentication
 */
export async function GET(): Promise<Response> {
	// Validate user authentication and get user ID from session
	const { success, user, error } = await validateUserAccess("USER");
	
	if (!success || !user) {
		return NextResponse.json(
			{ error: error || "Authentication required" },
			{ status: 401 }
		);
	}

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			UserService.touriiBackendControllerMe(apiVersion, user.id, apiKey),
		"GET /api/passport",
	);
}
