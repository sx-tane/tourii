import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { UserService } from "@/api/generated";

/**
 * GET /api/passport
 * 
 * Fetches current user's passport data from the backend.
 * Returns user profile information including digital passport details.
 */
export async function GET() {
  return executeValidatedServiceCall<any>(
    (apiKey: string, apiVersion: string) =>
      UserService.touriiBackendControllerMe(apiVersion, apiKey),
    "GET /api/passport"
  );
}