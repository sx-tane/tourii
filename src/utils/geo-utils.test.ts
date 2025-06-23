import { describe, it, expect } from "vitest";
import { calculateDistanceKm, estimateWalkingMinutes } from "./geo-utils";

const tokyo = { latitude: 35.6895, longitude: 139.6917 };
const osaka = { latitude: 34.6937, longitude: 135.5023 };

describe("calculateDistanceKm", () => {
	it("returns zero for identical coordinates", () => {
		expect(calculateDistanceKm(tokyo, tokyo)).toBe(0);
	});

	it("calculates known distance between Tokyo and Osaka", () => {
		expect(calculateDistanceKm(tokyo, osaka)).toBeCloseTo(396.436, 3);
	});

	it("calculates distance along equator", () => {
		const a = { latitude: 0, longitude: 0 };
		const b = { latitude: 0, longitude: 1 };
		expect(calculateDistanceKm(a, b)).toBeCloseTo(111.195, 3);
	});
});

describe("estimateWalkingMinutes", () => {
	it("uses default speed", () => {
		expect(estimateWalkingMinutes(1)).toBe(12);
	});

	it("accepts custom speed", () => {
		expect(estimateWalkingMinutes(2, 6)).toBe(20);
	});
});
