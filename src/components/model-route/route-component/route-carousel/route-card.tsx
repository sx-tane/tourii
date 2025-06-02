"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type React from "react";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { WeatherDisplay } from "@/components/model-route/common";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export interface RouteCardProps {
	route: ModelRouteResponseDto;
	routeIndex: number;
	isExpanded?: boolean;
	onSelect?: () => void;
	className?: string;
	onExpansionAnimationComplete?: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({
	route,
	routeIndex,
	isExpanded = false,
	onSelect,
	className = "",
	onExpansionAnimationComplete,
}) => {
	const handleClick = () => {
		onSelect?.();
	};

	const [isAnimatingToExpanded, setIsAnimatingToExpanded] = useState(false);
	const prevIsExpanded = useRef(isExpanded);

	useEffect(() => {
		if (isExpanded && !prevIsExpanded.current) {
			setIsAnimatingToExpanded(true);
		} else if (!isExpanded && prevIsExpanded.current) {
			setIsAnimatingToExpanded(false);
		}
		prevIsExpanded.current = isExpanded;
	}, [isExpanded]);

	return (
		<motion.div
			layoutId={`card-container-${route.modelRouteId}`}
			onClick={handleClick}
			initial={false}
			animate={{
				width: isExpanded ? "" : "280px",
				height: isExpanded ? "90vh" : "400px",
			}}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			onAnimationComplete={() => {
				if (isAnimatingToExpanded && isExpanded) {
					onExpansionAnimationComplete?.();
					setIsAnimatingToExpanded(false);
				}
			}}
			className={`relative overflow-hidden ${isExpanded ? "" : "shadow-lg"}  rounded-3xl ${className}`}
		>
			{/* ─── Background (Image or Video) ─── */}
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
					<Image
						src={route.regionBackgroundMedia || "/placeholder-image.jpg"}
						alt={`${route.routeName} route background`}
						className="w-full h-full object-cover"
						width={1920}
						height={1080}
						quality={100}
						priority
					/>
				)}
			</motion.div>

			{/* ─── Gradient overlay ─── */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
				layout
			/>

			{/* ─── Weather Display ─── */}
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

			{/* ─── Route Number ─── */}
			<motion.div
				className="absolute top-4 left-4 text-white/90 font-bold tracking-wider text-base"
				layout="position"
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				#{String(routeIndex + 1).padStart(2, "0")}
			</motion.div>

			{/* ─── Text content ─── */}
			<motion.div
				className="absolute bottom-4 left-4 right-4 text-white max-w-md"
				layout="position"
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				{/* Region Tag */}
				<motion.div
					className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full mb-3 text-sm"
					layout="position"
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					{route.region}
				</motion.div>

				{/* Route Name */}
				<motion.h3
					className="font-bold text-white mb-2 line-clamp-2 text-lg"
					layout="position"
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					{route.routeName}
				</motion.h3>

				{/* Description (only when expanded) */}
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

				{/* Expand indicator (only when not expanded) */}
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
