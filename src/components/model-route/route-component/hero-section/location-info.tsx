import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { motion } from "framer-motion";
import { MapPin, Users, Star } from "lucide-react";
import type React from "react";

export interface LocationInfoProps {
	route: ModelRouteResponseDto;
	className?: string;
}

const LocationInfo: React.FC<LocationInfoProps> = ({
	route,
	className = "",
}) => {
	return (
		<motion.div
			className={`text-white space-y-3 ${className}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			{/* Region */}
			<motion.div
				className="flex items-center gap-2 text-white/80"
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.1, duration: 0.3 }}
			>
				<MapPin className="w-4 h-4" />
				<span className="text-sm font-medium">{route.region}</span>
			</motion.div>

			{/* Route Name */}
			<motion.h1
				className="text-3xl lg:text-4xl font-bold leading-tight"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.4 }}
			>
				{route.routeName}
			</motion.h1>

			{/* Route Description */}
			<motion.p
				className="text-white/90 text-base lg:text-lg max-w-2xl leading-relaxed"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.4 }}
			>
				{route.regionDesc}
			</motion.p>

			{/* Route Stats */}
			<motion.div
				className="flex items-center gap-6 pt-2"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4, duration: 0.4 }}
			>
				{/* Tourist Spots Count */}
				<div className="flex items-center gap-2 text-white/80">
					<Star className="w-4 h-4" />
					<span className="text-sm">
						{route.touristSpotList?.length || 0} spots
					</span>
				</div>

				{/* Recommendations Count */}
				{route.recommendation && route.recommendation.length > 0 && (
					<div className="flex items-center gap-2 text-white/80">
						<Users className="w-4 h-4" />
						<span className="text-sm">{route.recommendation.length} tips</span>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
};

export default LocationInfo;
