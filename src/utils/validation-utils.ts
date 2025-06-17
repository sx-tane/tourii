import type { TouristSpotResponseDto } from "@/api/generated";

/**
 * Validation utilities for tourist spot data and coordinates
 */

export interface ValidationResult {
	isValid: boolean;
	errors: string[];
}

export function isValidLatitude(lat: number): boolean {
	return typeof lat === 'number' && !Number.isNaN(lat) && lat >= -90 && lat <= 90;
}

export function isValidLongitude(lng: number): boolean {
	return typeof lng === 'number' && !Number.isNaN(lng) && lng >= -180 && lng <= 180;
}

export function sanitizeHtml(unsafe: string): string {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

export function validateTouristSpot(spot: TouristSpotResponseDto): ValidationResult {
	const errors: string[] = [];

	// Check required fields exist
	if (!spot) {
		return { isValid: false, errors: ["Tourist spot data is null or undefined"] };
	}

	if (!spot.touristSpotId) {
		errors.push("Missing touristSpotId");
	}

	// Validate coordinates
	if (!isValidLatitude(spot.touristSpotLatitude)) {
		errors.push(`Invalid latitude: ${spot.touristSpotLatitude}`);
	}

	if (!isValidLongitude(spot.touristSpotLongitude)) {
		errors.push(`Invalid longitude: ${spot.touristSpotLongitude}`);
	}

	// Validate text fields
	if (!spot.touristSpotName || spot.touristSpotName.trim().length === 0) {
		errors.push("Missing or empty touristSpotName");
	}

	if (!spot.address || spot.address.trim().length === 0) {
		errors.push("Missing or empty address");
	}

	// Check for potentially dangerous content
	if (spot.touristSpotName && (spot.touristSpotName.includes('<') || spot.touristSpotName.includes('>'))) {
		errors.push("Tourist spot name contains potentially unsafe HTML characters");
	}

	if (spot.address && (spot.address.includes('<') || spot.address.includes('>'))) {
		errors.push("Address contains potentially unsafe HTML characters");
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}

export function validateTouristSpots(spots: TouristSpotResponseDto[]): ValidationResult {
	const errors: string[] = [];

	if (!Array.isArray(spots)) {
		return { isValid: false, errors: ["Tourist spots data is not an array"] };
	}

	if (spots.length === 0) {
		return { isValid: false, errors: ["No tourist spots provided"] };
	}

	// Validate each spot
	spots.forEach((spot, index) => {
		const spotValidation = validateTouristSpot(spot);
		if (!spotValidation.isValid) {
			errors.push(`Spot ${index}: ${spotValidation.errors.join(', ')}`);
		}
	});

	// Check for duplicate IDs
	const ids = spots.map(spot => spot.touristSpotId).filter(Boolean);
	const uniqueIds = new Set(ids);
	if (ids.length !== uniqueIds.size) {
		errors.push("Duplicate tourist spot IDs detected");
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}