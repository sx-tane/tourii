"use client";
import type { TouristSpotResponseDto } from "@/api/generated";
import { motion } from "framer-motion";
import { MapPin, Clock, Thermometer } from "lucide-react";

interface LocationInfoPanelProps {
	selectedSpot?: TouristSpotResponseDto;
	className?: string;
}

const LocationInfoPanel: React.FC<LocationInfoPanelProps> = ({
	selectedSpot,
	className = "",
}) => {
	if (!selectedSpot) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className={`absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 ${className}`}
			>
				<div className="text-sm text-gray-500">
					Select a tourist spot to view details
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className={`absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 min-w-[280px] max-w-[320px] ${className}`}
		>
			{/* Spot Name */}
			<motion.h3
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1 }}
				className="font-bold text-lg text-charcoal mb-2 line-clamp-2"
			>
				{selectedSpot.touristSpotName}
			</motion.h3>

			{/* Address */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.15 }}
				className="flex items-start gap-2 mb-3"
			>
				<MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
				<span className="text-sm text-gray-700 line-clamp-2">
					{selectedSpot.address}
				</span>
			</motion.div>

			{/* Best Visit Time */}
			{selectedSpot.bestVisitTime && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="flex items-center gap-2 mb-3"
				>
					<Clock className="w-4 h-4 text-gray-500" />
					<span className="text-sm text-gray-700">
						Best time: {selectedSpot.bestVisitTime}
					</span>
				</motion.div>
			)}

			{/* Weather Info */}
			{selectedSpot.weatherInfo && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.25 }}
					className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
				>
					<Thermometer className="w-4 h-4 text-blue-500" />
					<div className="text-sm">
						<span className="font-medium text-charcoal">
							{selectedSpot.weatherInfo.temperatureCelsius}°C
						</span>
						<span className="text-gray-600 ml-2">
							{selectedSpot.weatherInfo.weatherName}
						</span>
					</div>
				</motion.div>
			)}

			{/* Hashtags */}
			{selectedSpot.touristSpotHashtag &&
				selectedSpot.touristSpotHashtag.length > 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="mt-3 flex flex-wrap gap-1"
					>
						{selectedSpot.touristSpotHashtag.slice(0, 3).map((tag, index) => (
							<span
								key={tag}
								className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
							>
								#{tag}
							</span>
						))}
					</motion.div>
				)}
		</motion.div>
	);
};

export default LocationInfoPanel;
