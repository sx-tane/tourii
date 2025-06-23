import type { TouristSpotResponseDto } from "@/api/generated";
import { describe, expect, it } from "vitest";
import {
	isValidLatitude,
	isValidLongitude,
	sanitizeHtml,
	validateTouristSpot,
	validateTouristSpots,
} from "./validation-utils";

describe("validation-utils", () => {
	describe("isValidLatitude", () => {
		it("should accept valid latitudes", () => {
			expect(isValidLatitude(0)).toBe(true);
			expect(isValidLatitude(45.123)).toBe(true);
			expect(isValidLatitude(-45.123)).toBe(true);
			expect(isValidLatitude(90)).toBe(true);
			expect(isValidLatitude(-90)).toBe(true);
		});

		it("should reject invalid latitudes", () => {
			expect(isValidLatitude(91)).toBe(false);
			expect(isValidLatitude(-91)).toBe(false);
			expect(isValidLatitude(Number.NaN)).toBe(false);
			expect(isValidLatitude(Number.POSITIVE_INFINITY)).toBe(false);
		});
	});

	describe("isValidLongitude", () => {
		it("should accept valid longitudes", () => {
			expect(isValidLongitude(0)).toBe(true);
			expect(isValidLongitude(123.456)).toBe(true);
			expect(isValidLongitude(-123.456)).toBe(true);
			expect(isValidLongitude(180)).toBe(true);
			expect(isValidLongitude(-180)).toBe(true);
		});

		it("should reject invalid longitudes", () => {
			expect(isValidLongitude(181)).toBe(false);
			expect(isValidLongitude(-181)).toBe(false);
			expect(isValidLongitude(Number.NaN)).toBe(false);
			expect(isValidLongitude(Number.NEGATIVE_INFINITY)).toBe(false);
		});
	});

	describe("sanitizeHtml", () => {
		it("should escape HTML special characters", () => {
			expect(sanitizeHtml('<script>alert("xss")</script>')).toBe(
				"&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;",
			);
			expect(sanitizeHtml('Hello & "World" <tag>')).toBe(
				"Hello &amp; &quot;World&quot; &lt;tag&gt;",
			);
			expect(sanitizeHtml("It's a 'test'")).toBe(
				"It&#039;s a &#039;test&#039;",
			);
		});

		it("should handle empty strings", () => {
			expect(sanitizeHtml("")).toBe("");
		});

		it("should handle normal text", () => {
			expect(sanitizeHtml("Normal text")).toBe("Normal text");
		});
	});

	describe("validateTouristSpot", () => {
		const validSpot: TouristSpotResponseDto = {
			touristSpotId: "spot-1",
			touristSpotName: "Test Spot",
			address: "123 Test Street",
			touristSpotLatitude: 35.6762,
			touristSpotLongitude: 139.6503,
			touristSpotDesc: "A test spot",
			imageSet: {
				main: "https://example.com/image.jpg",
				small: ["https://example.com/image.jpg"],
			},
			weatherInfo: {
				temperatureCelsius: 20,
				weatherName: "Sunny",
				weatherDesc: "A test spot",
			},
			storyChapterId: "",
			bestVisitTime: "",
			touristSpotHashtag: [],
		};

		it("should validate a correct tourist spot", () => {
			const result = validateTouristSpot(validSpot);
			expect(result.isValid).toBe(true);
			expect(result.errors).toHaveLength(0);
		});

		it("should reject null/undefined spots", () => {
			const result = validateTouristSpot(null as any);
			expect(result.isValid).toBe(false);
			expect(result.errors).toContain("Tourist spot data is null or undefined");
		});

		it("should reject spots with invalid coordinates", () => {
			const invalidSpot = {
				...validSpot,
				touristSpotLatitude: 91, // Invalid latitude
				touristSpotLongitude: 181, // Invalid longitude
			};
			const result = validateTouristSpot(invalidSpot);
			expect(result.isValid).toBe(false);
			expect(result.errors).toContain("Invalid latitude: 91");
			expect(result.errors).toContain("Invalid longitude: 181");
		});

		it("should reject spots with missing required fields", () => {
			const invalidSpot = {
				...validSpot,
				touristSpotId: "",
				touristSpotName: "",
				address: "",
			};
			const result = validateTouristSpot(invalidSpot);
			expect(result.isValid).toBe(false);
			expect(result.errors).toContain("Missing touristSpotId");
			expect(result.errors).toContain("Missing or empty touristSpotName");
			expect(result.errors).toContain("Missing or empty address");
		});

		it("should detect potentially dangerous HTML in names and addresses", () => {
			const dangerousSpot = {
				...validSpot,
				touristSpotName: '<script>alert("xss")</script>',
				address: '<img src="x" onerror="alert(1)">',
			};
			const result = validateTouristSpot(dangerousSpot);
			expect(result.isValid).toBe(false);
			expect(result.errors).toContain(
				"Tourist spot name contains potentially unsafe HTML characters",
			);
			expect(result.errors).toContain(
				"Address contains potentially unsafe HTML characters",
			);
		});
	});

	describe("validateTouristSpots", () => {
		const validSpot1: TouristSpotResponseDto = {
			touristSpotId: "spot-1",
			touristSpotName: "Test Spot 1",
			address: "123 Test Street",
			touristSpotLatitude: 35.6762,
			touristSpotLongitude: 139.6503,
			touristSpotDesc: "A test spot",
			imageSet: {
				main: "https://example.com/image.jpg",
				small: ["https://example.com/image.jpg"],
			},
			weatherInfo: {
				temperatureCelsius: 20,
				weatherName: "Sunny",
				weatherDesc: "A test spot",
			},
			storyChapterId: "",
			bestVisitTime: "",
			touristSpotHashtag: [],
		};

		const validSpot2: TouristSpotResponseDto = {
			touristSpotId: "spot-2",
			touristSpotName: "Test Spot 2",
			address: "456 Test Avenue",
			touristSpotLatitude: 35.6863,
			touristSpotLongitude: 139.6616,
			touristSpotDesc: "Another test spot",
			imageSet: {
				main: "https://example.com/image.jpg",
				small: ["https://example.com/image.jpg"],
			},
			weatherInfo: {
				temperatureCelsius: 20,
				weatherName: "Sunny",
				weatherDesc: "A test spot",
			},
			storyChapterId: "",
			bestVisitTime: "",
			touristSpotHashtag: [],
		};

		it("should validate an array of correct tourist spots", () => {
			const result = validateTouristSpots([validSpot1, validSpot2]);
			expect(result.isValid).toBe(true);
			expect(result.errors).toHaveLength(0);
		});

		it("should reject non-array input", () => {
			const result = validateTouristSpots(
				null as unknown as TouristSpotResponseDto[],
			);
			expect(result.isValid).toBe(false);
			expect(result.errors).toContain("Tourist spots data is not an array");
		});

		it("should reject empty arrays", () => {
			const result = validateTouristSpots([]);
			expect(result.isValid).toBe(false);
			expect(result.errors).toContain("No tourist spots provided");
		});

		it("should detect individual spot validation errors", () => {
			const invalidSpot = {
				...validSpot1,
				touristSpotLatitude: 91, // Invalid latitude
			};
			const result = validateTouristSpots([validSpot1, invalidSpot]);
			expect(result.isValid).toBe(false);
			expect(result.errors[0]).toContain("Spot 1:");
			expect(result.errors[0]).toContain("Invalid latitude: 91");
		});

		it("should detect duplicate IDs", () => {
			const duplicateSpot = { ...validSpot2, touristSpotId: "spot-1" }; // Same ID as validSpot1
			const result = validateTouristSpots([validSpot1, duplicateSpot]);
			expect(result.isValid).toBe(false);
			expect(result.errors).toContain("Duplicate tourist spot IDs detected");
		});
	});
});
