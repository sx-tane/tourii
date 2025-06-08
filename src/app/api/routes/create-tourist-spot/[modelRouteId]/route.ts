import { RoutesService } from "@/api/generated";
import { NextRequest } from "next/server";
import { executeValidatedServiceCall, touriiErrorResponse } from "../../../lib/route-helper";

export async function POST(request: NextRequest, { params }: { params: Promise<{ modelRouteId: string }> }) {
    const { modelRouteId } = await params;
    if (!modelRouteId) return touriiErrorResponse("Missing modelRouteId", 400, "BadRequest");
    try {
        const body = await request.json();
        return executeValidatedServiceCall(
            (apiKey: string, apiVersion: string) =>
                RoutesService.touriiBackendControllerCreateTouristSpot(modelRouteId, apiVersion, apiKey, body),
            `POST /api/routes/create-tourist-spot/${modelRouteId}`
        );
    } catch {
        return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
    }
}
