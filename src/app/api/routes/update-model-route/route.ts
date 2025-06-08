import { RoutesService } from "@/api/generated";
import { executeValidatedServiceCall, touriiErrorResponse } from "../../lib/route-helper";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        return executeValidatedServiceCall(
            (apiKey: string, apiVersion: string) =>
                RoutesService.touriiBackendControllerUpdateModelRoute(apiVersion, apiKey, body),
            "POST /api/routes/update-model-route"
        );
    } catch {
        return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
    }
}
