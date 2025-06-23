import type { TouristSpotResponseDto } from "@/api/generated";

interface TouristSpotDataDisplayProps {
	spot: TouristSpotResponseDto;
}

export default function TouristSpotDataDisplay({
	spot,
}: TouristSpotDataDisplayProps) {
	return (
		<div className="mb-6 rounded-lg bg-gray-50 p-4">
			<h3 className="text-lg font-semibold text-charcoal mb-4">
				📊 Complete Tourist Spot Data
			</h3>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">🆔 Identifiers</h4>
					<div className="text-sm space-y-1">
						<div>
							<span className="font-medium">Spot ID:</span> {spot.touristSpotId}
						</div>
						<div>
							<span className="font-medium">Chapter ID:</span>{" "}
							{spot.storyChapterId}
						</div>
						<div>
							<span className="font-medium">Best Visit:</span>{" "}
							{spot.bestVisitTime || "Anytime"}
						</div>
						{spot.address && (
							<div>
								<span className="font-medium">Address:</span> {spot.address}
							</div>
						)}
					</div>
				</div>
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">🌍 Location & Weather</h4>
					<div className="text-sm space-y-1">
						{spot.touristSpotLatitude !== undefined && (
							<div>
								<span className="font-medium">Latitude:</span>{" "}
								{spot.touristSpotLatitude}°
							</div>
						)}
						{spot.touristSpotLongitude !== undefined && (
							<div>
								<span className="font-medium">Longitude:</span>{" "}
								{spot.touristSpotLongitude}°
							</div>
						)}
						{spot.weatherInfo?.temperatureCelsius !== undefined && (
							<div>
								<span className="font-medium">Temperature:</span>{" "}
								{spot.weatherInfo.temperatureCelsius}°C
							</div>
						)}
						{spot.weatherInfo?.weatherName && (
							<div>
								<span className="font-medium">Weather:</span>{" "}
								{spot.weatherInfo.weatherName}
							</div>
						)}
						{spot.weatherInfo?.weatherDesc && (
							<div>
								<span className="font-medium">Description:</span>{" "}
								{spot.weatherInfo.weatherDesc}
							</div>
						)}
					</div>
				</div>
				<div className="space-y-2">
					<h4 className="font-medium text-charcoal">📅 Timestamps</h4>
					<div className="text-sm space-y-1">
						{spot.insDateTime && (
							<div>
								<span className="font-medium">Created:</span>{" "}
								{spot.insDateTime || "N/A"}
							</div>
						)}
						{spot.updDateTime && (
							<div>
								<span className="font-medium">Updated:</span>{" "}
								{spot.updDateTime || "N/A"}
							</div>
						)}
						{spot.insUserId && (
							<div>
								<span className="font-medium">Created By:</span>{" "}
								{spot.insUserId}
							</div>
						)}
						{spot.updUserId && (
							<div>
								<span className="font-medium">Updated By:</span>{" "}
								{spot.updUserId}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Images Section */}
			<div className="mt-4 space-y-2">
				<h4 className="font-medium text-charcoal">🖼️ Images</h4>
				<div className="text-sm space-y-1">
					{spot.imageSet?.main && (
						<div>
							<span className="font-medium">Main Image:</span>
							<div className="truncate text-green-600">
								{spot.imageSet.main}
							</div>
						</div>
					)}
					{spot.imageSet?.small && spot.imageSet.small.length > 0 && (
						<div>
							<span className="font-medium">
								Small Images ({spot.imageSet.small.length}):
							</span>
							<div className="max-h-24 overflow-y-auto space-y-1 mt-1">
								{spot.imageSet.small.map((img, idx) => (
									<div
										key={`spot-img-${spot.touristSpotId}-${idx}`}
										className="truncate text-blue-600 text-xs"
									>
										{idx + 1}. {img}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Hashtags */}
			{spot.touristSpotHashtag && spot.touristSpotHashtag.length > 0 && (
				<div className="mt-4">
					<h4 className="font-medium text-charcoal mb-2">
						🏷️ Hashtags ({spot.touristSpotHashtag.length})
					</h4>
					<div className="flex flex-wrap gap-2">
						{spot.touristSpotHashtag.map((tag, idx) => (
							<span
								key={`spot-tag-${spot.touristSpotId}-${tag}-${idx}`}
								className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
							>
								#{tag}
							</span>
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
					{JSON.stringify(spot, null, 2)}
				</pre>
			</details>
		</div>
	);
}
