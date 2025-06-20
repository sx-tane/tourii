import { executeValidatedServiceCall } from "@/app/api/lib/route-helper";
import { HomepageService } from "@/api/generated";

export async function GET(): Promise<Response> {
	return executeValidatedServiceCall(
		(apiKey, apiVersion) =>
			HomepageService.touriiBackendControllerGetHomepageHighlights(
				apiVersion,
				apiKey,
			),
		"GET /api/homepage/highlights",
	);
}