export interface Coordinates {
  latitude: number;
  longitude: number;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Calculate the great-circle distance between two coordinates using the Haversine formula.
 * The result is rounded to three decimals (kilometers).
 */
export function calculateDistanceKm(from: Coordinates, to: Coordinates): number {
  const R = 6371; // Earth radius in km
  const dLat = toRadians(to.latitude - from.latitude);
  const dLon = toRadians(to.longitude - from.longitude);
  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(to.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return Math.round(distance * 1000) / 1000;
}

/**
 * Estimate the walking time in minutes for a given distance.
 * @param distanceKm Distance in kilometers
 * @param speedKmh Walking speed in km/h (default 5)
 */
export function estimateWalkingMinutes(
  distanceKm: number,
  speedKmh = 5,
): number {
  if (speedKmh <= 0) {
    throw new Error('Speed must be positive');
  }
  const hours = distanceKm / speedKmh;
  return Math.round(hours * 60);
}
