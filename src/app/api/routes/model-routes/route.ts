import { RoutesTouristSpotsService } from "@/api/generated";
import { executeValidatedServiceCall } from "../../lib/route-helper";

export async function GET() {
	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			RoutesTouristSpotsService.touriiBackendControllerGetRoutes(apiVersion, apiKey),
		"GET /api/routes/model-routes",
	);
}
