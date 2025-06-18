import React from "react";
import type { ModelRouteResponseDto } from "@/api/generated";

interface RouteDetailsProps {
	route: ModelRouteResponseDto;
}

export function RouteDetails({ route }: RouteDetailsProps) {
	return (
		<div className="rounded-lg bg-gray-50 p-4">
			<h3 className="text-lg font-semibold text-charcoal mb-4">
				📊 Complete Route Data
			</h3>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">🆔 Identifiers</h4>
					<div className="text-sm space-y-1">
						<div>
							<span className="font-medium">Route ID:</span>{" "}
							{route.modelRouteId}
						</div>
						<div>
							<span className="font-medium">Story ID:</span> {route.storyId}
						</div>
						<div>
							<span className="font-medium">Region:</span> {route.region}
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">🌍 Location</h4>
					<div className="text-sm space-y-1">
						{route.regionLatitude !== undefined && (
							<div>
								<span className="font-medium">Latitude:</span>{" "}
								{route.regionLatitude}°
							</div>
						)}
						{route.regionLongitude !== undefined && (
							<div>
								<span className="font-medium">Longitude:</span>{" "}
								{route.regionLongitude}°
							</div>
						)}
						{route.regionWeatherInfo?.temperatureCelsius !== undefined && (
							<div>
								<span className="font-medium">Temperature:</span>{" "}
								{route.regionWeatherInfo.temperatureCelsius}°C
							</div>
						)}
						{route.regionWeatherInfo?.weatherName && (
							<div>
								<span className="font-medium">Weather:</span>{" "}
								{route.regionWeatherInfo.weatherName}
							</div>
						)}
					</div>
				</div>
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">🖼️ Media</h4>
					<div className="text-sm space-y-1">
						{route.regionBackgroundMedia && (
							<div>
								<span className="font-medium">Background:</span>
								<div className="truncate text-blue-600">
									{route.regionBackgroundMedia}
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">📅 Metadata</h4>
					<div className="text-sm space-y-1">
						{route.insDateTime && (
							<div>
								<span className="font-medium">Created:</span>{" "}
								{route.insDateTime && !Number.isNaN(Date.parse(route.insDateTime))
									? new Date(route.insDateTime).toLocaleString()
									: route.insDateTime || "N/A"}
							</div>
						)}
						{route.updDateTime && (
							<div>
								<span className="font-medium">Updated:</span>{" "}
								{route.updDateTime && !Number.isNaN(Date.parse(route.updDateTime))
									? new Date(route.updDateTime).toLocaleString()
									: route.updDateTime || "N/A"}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Tourist Spots List */}
			{route.touristSpotList && route.touristSpotList.length > 0 && (
				<div className="mt-4">
					<h4 className="font-medium text-charcoal mb-2">
						📍 Tourist Spots ({route.touristSpotList.length})
					</h4>
					<div className="max-h-40 overflow-y-auto bg-white rounded border p-3">
						{route.touristSpotList.map((spot, idx) => (
							<div
								key={`spot-${route.modelRouteId}-${spot.touristSpotId || idx}`}
								className="flex justify-between py-1 border-b last:border-b-0"
							>
								<span className="text-sm">{spot.touristSpotName}</span>
								<span className="text-xs text-gray-500">
									ID: {spot.touristSpotId}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Recommendations */}
			{route.recommendation && route.recommendation.length > 0 && (
				<div className="mt-4">
					<h4 className="font-medium text-charcoal mb-2">
						💡 Recommendations ({route.recommendation.length})
					</h4>
					<div className="max-h-40 overflow-y-auto bg-white rounded border p-3">
						{route.recommendation.map((rec, idx) => (
							<div
								key={`rec-${route.modelRouteId}-${idx}`}
								className="py-1 border-b last:border-b-0"
							>
								<span className="text-sm">{rec}</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Raw JSON Data */}
			<details className="mt-4">
				<summary className="font-medium text-purple-600 cursor-pointer">
					🔍 Raw JSON Data
				</summary>
				<pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60 border">
					{JSON.stringify(route, null, 2)}
				</pre>
			</details>
		</div>
	);
}