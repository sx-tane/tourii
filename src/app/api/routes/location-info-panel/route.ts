import { LocationQueryDto, RoutesService } from "@/api/generated";
import { executeValidatedServiceCall } from "../../lib/route-helper";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const address = searchParams.get("address");

    // The backend expects flat query parameters, but the generated client nests the object
    // Let's build the proper LocationQueryDto object and let the client handle it


    return executeValidatedServiceCall(
        (apiKey: string, apiVersion: string) =>
            RoutesService.touriiBackendControllerGetLocationInfo(
                query ?? "",
                apiVersion,
                apiKey,
                address ?? "",
                longitude ?? "",
                latitude ?? "",
            ),
        "GET /api/routes/location-info-panel/",
    );
}

//