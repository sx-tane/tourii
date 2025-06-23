"use client";

import { motion } from "framer-motion";
import type { CheckinResponseDto } from "@/hooks/api/useCheckins";

export interface MapMarkerProps {
	checkin: CheckinResponseDto;
	onClick: (checkin: CheckinResponseDto) => void;
	className?: string;
}

// Marker icons and colors based on checkin type
const markerStyles = {
	story: {
		icon: "⛩️",
		bgColor: "bg-purple-500",
		borderColor: "border-purple-600",
		shadowColor: "shadow-purple-200",
	},
	quest: {
		icon: "🏢",
		bgColor: "bg-blue-500",
		borderColor: "border-blue-600",
		shadowColor: "shadow-blue-200",
	},
	route: {
		icon: "💎",
		bgColor: "bg-green-500",
		borderColor: "border-green-600",
		shadowColor: "shadow-green-200",
	},
} as const;

const MapMarker: React.FC<MapMarkerProps> = ({
	checkin,
	onClick,
	className = "",
}) => {
	const style = markerStyles[checkin.type];

	const handleClick = () => {
		onClick(checkin);
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onClick(checkin);
		}
	};

	return (
		<motion.button
			type="button"
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			className={`relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 20,
			}}
			aria-label={`Check-in at ${checkin.touristSpot.name}`}
		>
			{/* Marker shadow/glow effect */}
			<motion.div
				className={`absolute inset-0 rounded-full ${style.shadowColor} blur-md opacity-30`}
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				whileHover={{ scale: 1.2, opacity: 0.5 }}
				transition={{ duration: 0.3 }}
			/>

			{/* Main marker body */}
			<motion.div
				className={`relative w-10 h-10 ${style.bgColor} ${style.borderColor} border-2 rounded-full shadow-lg flex items-center justify-center`}
				whileHover={{
					y: -2,
					boxShadow:
						"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
				}}
				transition={{ type: "spring", stiffness: 400, damping: 25 }}
			>
				<span className="text-lg leading-none">{style.icon}</span>
			</motion.div>

			{/* Marker stem/pointer */}
			<motion.div
				className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent ${style.borderColor.replace("border-", "border-t-")}`}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1, duration: 0.2 }}
			/>

			{/* Pulse animation for active state */}
			<motion.div
				className={`absolute inset-0 rounded-full ${style.bgColor} opacity-20`}
				animate={{
					scale: [1, 1.5, 1],
					opacity: [0.2, 0, 0.2],
				}}
				transition={{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			/>

			{/* Tooltip on hover */}
			<motion.div
				className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none z-10"
				whileHover={{ opacity: 1 }}
				transition={{ duration: 0.2 }}
			>
				{checkin.touristSpot.name}
				<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-900" />
			</motion.div>
		</motion.button>
	);
};

export default MapMarker;
