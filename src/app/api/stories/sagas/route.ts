import { StoriesService } from "@/api/generated";
import { executeValidatedServiceCall } from "../../lib/route-helper"; // Corrected import path

export async function GET() {
	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			StoriesService.touriiBackendControllerGetSagas(apiVersion, apiKey),
		"GET /api/stories/sagas",
	);
}
