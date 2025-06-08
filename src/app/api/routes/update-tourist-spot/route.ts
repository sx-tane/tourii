import { RoutesService } from "@/api/generated";
import { executeValidatedServiceCall, touriiErrorResponse } from "../../lib/route-helper";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        return executeValidatedServiceCall(
            (apiKey: string, apiVersion: string) =>
                RoutesService.touriiBackendControllerUpdateTouristSpot(apiVersion, apiKey, body),
            "POST /api/routes/update-tourist-spot"
        );
    } catch {
        return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
    }
}
