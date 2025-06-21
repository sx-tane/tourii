import { UserService } from "@/api/generated";
import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";

/**
 * GET /api/passport
 *
 * Fetches current user's passport data from the backend.
 * Returns user profile information including digital passport details.
 */
export async function GET(): Promise<Response> {
	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			UserService.touriiBackendControllerMe(apiVersion, apiKey),
		"GET /api/passport",
	);
}
