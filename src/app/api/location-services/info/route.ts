import { LocationQueryDto, RoutesTouristSpotsService } from "@/api/generated";
import {
	executeValidatedServiceCall,
	touriiErrorResponse,
} from "../../lib/route-helper";

// Input validation utilities
function isValidLatitude(lat: string | null): boolean {
	if (!lat) return false;
	const num = Number.parseFloat(lat);
	return !Number.isNaN(num) && num >= -90 && num <= 90;
}

function isValidLongitude(lng: string | null): boolean {
	if (!lng) return false;
	const num = Number.parseFloat(lng);
	return !Number.isNaN(num) && num >= -180 && num <= 180;
}

function sanitizeInput(input: string | null, maxLength = 200): string {
	if (!input) return "";
	// Remove potentially dangerous characters and limit length
	return input
		.replace(/[<>"'&]/g, "")
		.trim()
		.substring(0, maxLength);
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("query");
	const latitude = searchParams.get("latitude");
	const longitude = searchParams.get("longitude");
	const address = searchParams.get("address");

	// Validate coordinates if provided
	if (latitude && !isValidLatitude(latitude)) {
		return touriiErrorResponse(
			"Invalid latitude value. Must be between -90 and 90.",
			400,
			"InvalidLatitude",
		);
	}

	if (longitude && !isValidLongitude(longitude)) {
		return touriiErrorResponse(
			"Invalid longitude value. Must be between -180 and 180.",
			400,
			"InvalidLongitude",
		);
	}

	// Sanitize text inputs
	const safeQuery = sanitizeInput(query);
	const safeAddress = sanitizeInput(address);

	// The backend expects flat query parameters, but the generated client nests the object
	// Let's build the proper LocationQueryDto object and let the client handle it

	return executeValidatedServiceCall(
		(apiKey: string, apiVersion: string) =>
			RoutesTouristSpotsService.touriiBackendControllerGetLocationInfo(
				safeQuery,
				apiVersion,
				apiKey,
				safeAddress,
				longitude ?? "",
				latitude ?? "",
			),
		"GET /api/routes/location-info-panel/",
	);
}

//
