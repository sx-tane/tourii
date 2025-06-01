import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import type React from "react";

export interface ModelRouteButtonProps {
	route: ModelRouteResponseDto;
	routeIndex: number;
	onExplore?: () => void;
	className?: string;
}

const ModelRouteButton: React.FC<ModelRouteButtonProps> = ({
	route,
	routeIndex,
	onExplore,
	className = "",
}) => {
	return (
		<motion.div
			className={`space-y-4 ${className}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			{/* Route Number Display */}
			<motion.div
				className="flex items-center gap-3"
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.1, duration: 0.3 }}
			>
				<div className="text-white/60 text-5xl lg:text-6xl font-bold tracking-wider">
					#{String(routeIndex + 1).padStart(2, "0")}
				</div>
				<div className="text-white/80 text-sm font-medium">Model Route</div>
			</motion.div>

			{/* Explore Button */}
			<motion.button
				type="button"
				className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 hover:shadow-lg"
				onClick={onExplore}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.4 }}
			>
				<MapPin className="w-5 h-5" />
				<span className="font-medium">Explore Route</span>
				<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
			</motion.button>

			{/* Quick Stats */}
			<motion.div
				className="flex items-center gap-4 text-white/70 text-sm"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.4 }}
			>
				<span>{route.touristSpotList?.length || 0} destinations</span>
				<span>•</span>
				<span className="capitalize">
					{route.regionWeatherInfo?.weatherDesc || "Good weather"}
				</span>
			</motion.div>
		</motion.div>
	);
};

export default ModelRouteButton;
