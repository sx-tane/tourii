import { UserService } from "@/api/generated";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";

/**
 * GET /api/passport
 *
 * Fetches current user's passport data from the backend.
 * Returns user profile information including digital passport details.
 */
export async function GET(): Promise<Response> {
	const userId = "TSU202506-ae8a85-222006-4bdd44-BAAA"; // TODO: Get from session/auth

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			UserService.touriiBackendControllerMe(apiVersion, userId, apiKey),
		"GET /api/passport",
	);
}
