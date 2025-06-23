import { RoutesService } from "@/api/generated";
import { NextRequest } from "next/server";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../../lib/route-helper";

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ modelRouteId: string }> },
) {
	const { modelRouteId } = await params;
	if (!modelRouteId)
		return touriiErrorResponse("Missing modelRouteId", 400, "BadRequest");

	try {
		const body = await request.json();
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesService.touriiBackendControllerUpdateModelRoute(
					apiVersion,
					apiKey,
					{
						...body,
						modelRouteId,
					},
				),
			`PUT /api/routes/update-model-route/${modelRouteId}`,
		);
	} catch {
		return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
	}
}
