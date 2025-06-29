import { RoutesTouristSpotsService } from "@/api/generated";
import {
	touriiErrorResponse,
	executeValidatedServiceCall,
} from "../../lib/route-helper";
import { NextRequest } from "next/server";

/**
 * GET: Get specific route by ID
 * PUT: Update route
 * DELETE: Delete route
 */

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ routeId: string }> },
) {
	const { routeId } = await params;

	if (!routeId) {
		return touriiErrorResponse("Missing routeId", 400, "BadRequest");
	}

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			RoutesTouristSpotsService.touriiBackendControllerGetRouteById(
				routeId,
				apiVersion,
				apiKey,
			),
		`GET /api/routes/${routeId}`,
	);
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ routeId: string }> },
) {
	const { routeId } = await params;

	if (!routeId) {
		return touriiErrorResponse("Missing routeId", 400, "BadRequest");
	}

	try {
		const body = await request.json();
		return executeValidatedServiceCall(
			(apiKey: string, apiVersion: string) =>
				RoutesTouristSpotsService.touriiBackendControllerUpdateModelRoute(
					apiVersion,
					apiKey,
					body,
				),
			`PUT /api/routes/${routeId}`,
		);
	} catch {
		return touriiErrorResponse("Invalid JSON body", 400, "BadRequest");
	}
}

export async function DELETE(
	_request: Request,
	{ params }: { params: Promise<{ routeId: string }> },
) {
	const { routeId } = await params;

	if (!routeId) {
		return touriiErrorResponse("Missing routeId", 400, "BadRequest");
	}

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			RoutesTouristSpotsService.touriiBackendControllerDeleteModelRoute(
				routeId,
				apiVersion,
				apiKey,
			),
		`DELETE /api/routes/${routeId}`,
	);
}
