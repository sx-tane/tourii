// components/RouteCard.tsx
"use client";

import { motion } from "framer-motion";
import type React from "react";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { WeatherDisplay } from "@/components/model-route/common";

export interface RouteCardProps {
	route: ModelRouteResponseDto;
	routeIndex: number; // 0-based index for displaying "#01, #02, …"
	isExpanded?: boolean; // whether to render as full-screen
	onSelect?: () => void; // called when clicking card (expand or collapse)
	className?: string; // optional extra classes
}

const RouteCard: React.FC<RouteCardProps> = ({
	route,
	routeIndex,
	isExpanded = false,
	onSelect,
	className = "",
}) => {
	const handleClick = () => {
		onSelect?.();
	};

	return (
		// ── OUTERMOST container uses layoutId so Framer Motion can morph it ──
		<motion.div
			layoutId={`card-container-${route.modelRouteId}`}
			onClick={handleClick}
			initial={false}
			animate={{
				width: isExpanded ? "100vw" : "280px",
				height: isExpanded ? "90vh" : "400px",
			}}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			className={`relative overflow-hidden ${
				isExpanded ? "" : "shadow-lg"
			} bg-white rounded-3xl cursor-pointer w-[280px] h-[400px] ${className}`}
		>
			{/* ─── Background (Image or Video) - This will scale with container ─── */}
			<motion.div className="absolute inset-0 w-full h-full" layout>
				{route.regionBackgroundMedia?.endsWith(".mp4") ? (
					<video
						src={route.regionBackgroundMedia}
						className="w-full h-full object-cover"
						muted
						loop
						playsInline
						autoPlay
					/>
				) : (
					<img
						src={route.regionBackgroundMedia || "/placeholder-image.jpg"}
						alt={`${route.routeName} route background`}
						className="w-full h-full object-cover"
					/>
				)}
			</motion.div>

			{/* ─── Gradient overlay ─── */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
				layout
			/>

			{/* ─── Weather Display (top-right) - Fixed size and position ─── */}
			<motion.div
				className="absolute top-4 right-4 z-40"
				layout="position"
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<WeatherDisplay
					weatherInfo={{
						weatherName: route.regionWeatherInfo?.weatherName,
					}}
					className="text-right flex flex-col text-sm text-warmGrey"
					iconSize={{
						small: "w-8 h-8",
						large: "lg:w-12 lg:h-12",
					}}
					needTemperature={false}
				/>
			</motion.div>

			{/* ─── Model Route Number (top-left) - Fixed size and position ─── */}
			<motion.div
				className="absolute top-4 left-4 text-white/90 font-bold tracking-wider text-base"
				layout="position"
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				#{String(routeIndex + 1).padStart(2, "0")}
			</motion.div>

			{/* ─── Text content (bottom) - Fixed size and position ─── */}
			<motion.div
				className="absolute bottom-4 left-4 right-4 text-white max-w-md"
				layout="position"
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				{/* Region Tag - Fixed size */}
				<motion.div
					className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full mb-3 text-sm"
					layout="position"
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					{route.region}
				</motion.div>

				{/* Route Name - Fixed size */}
				<motion.h3
					className="font-bold text-white mb-2 line-clamp-2 text-lg"
					layout="position"
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					{route.routeName}
				</motion.h3>

				{/* Description (only when expanded) - Fixed size */}
				{isExpanded && route.regionDesc && (
					<motion.p
						className="text-white/90 text-base leading-relaxed mt-4 max-w-2xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.5 }}
					>
						{route.regionDesc}
					</motion.p>
				)}

				{/* Expand indicator (only when not expanded) - Fixed size */}
				{!isExpanded && (
					<motion.div
						className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full mt-2"
						layout="position"
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.2 }}
					>
						<motion.div
							className="w-2 h-2 bg-white rounded-full"
							animate={{ scale: [1, 1.2, 1] }}
							transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
						/>
					</motion.div>
				)}
			</motion.div>
		</motion.div>
	);
};

export default RouteCard;
