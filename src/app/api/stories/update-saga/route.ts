import { StoriesService } from "@/api/generated";
import { touriiErrorResponse, executeValidatedServiceCall } from "../../lib/route-helper";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        return executeValidatedServiceCall(
            (apiKey: string, apiVersion: string) =>
                StoriesService.touriiBackendControllerUpdateStory(apiVersion, apiKey, body),
            "POST /api/stories/update-saga"
        );
    } catch (error) {
        return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
    }
}
