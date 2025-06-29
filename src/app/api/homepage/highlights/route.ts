import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { HomepageDataService } from "@/api/generated";

export async function GET(): Promise<Response> {
	return executeValidatedServiceCall(
		(apiKey, apiVersion) =>
			HomepageDataService.touriiBackendControllerGetHomepageHighlights(
				apiVersion,
				apiKey,
			),
		"GET /api/homepage/highlights",
	);
}
