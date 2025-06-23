import { RoutesService } from "@/api/generated";
import {
	touriiErrorResponse,
	executeValidatedServiceCall,
} from "@/app/api/lib/route-helper";
import { logger } from "@/utils/logger";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ modelRouteId: string }> },
) {
	const { modelRouteId } = await params;

	if (!modelRouteId) {
		logger.warn(
			"API GET /api/routes/[modelRouteId]/tourist-spot: Missing modelRouteId parameter",
		);
		return touriiErrorResponse("Missing modelRouteId", 400, "BadRequest");
	}

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			RoutesService.touriiBackendControllerGetRouteById(
				modelRouteId,
				apiVersion,
				apiKey,
			),
		`GET /api/routes/${modelRouteId}/tourist-spot`,
	);
}

export async function DELETE(
	_request: Request,
	{ params }: { params: Promise<{ modelRouteId: string }> },
) {
	const { modelRouteId } = await params;

	if (!modelRouteId) {
		logger.warn(
			"API DELETE /api/routes/[modelRouteId]: Missing modelRouteId parameter",
		);
		return touriiErrorResponse("Missing modelRouteId", 400, "BadRequest");
	}

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			RoutesService.touriiBackendControllerDeleteModelRoute(
				modelRouteId,
				apiVersion,
				apiKey,
			),
		`DELETE /api/routes/${modelRouteId}`,
	);
}
