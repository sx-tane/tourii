"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type React from "react";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
// import { WeatherDisplay } from "@/components/model-route/common"; // No longer directly used
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
// import { ActionButton, MotionButton } from "@/components/common"; // MotionButton no longer directly used
// import router from "next/router"; // No longer directly used
import LocationInfo from "@/components/model-route/route-component/hero-section/location-info";

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
				width: isExpanded ? "100%" : "280px",
				height: isExpanded ? "100%" : "400px",
			}}
			transition={{ type: "spring", stiffness: 230, damping: 30 }}
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
				className={`absolute inset-0 bg-gradient-to-t to-transparent before:absolute before:inset-0 before:bg-gradient-to-b before:from-charcoal/10 before:to-transparent ${isExpanded ? "from-charcoal/40 via-charcoal/40" : "from-charcoal/40 via-charcoal/40 "}`}
				layout
			/>

			{/* ─── Route Number ─── */}
			<motion.div
				className={`absolute top-4 right-4 text-warmGrey font-bold tracking-widest  ${
					isExpanded ? "text-6xl" : "text-2xl"
				}`}
				layout="position"
				variants={upToDownVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
				transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
			>
				{String(routeIndex + 1).padStart(2, "0")}
			</motion.div>

			{/* ─── Text content ─── */}
			<motion.div
				className="absolute bottom-4 left-4 right-4 text-white max-w-md"
				layout="position"
				transition={{ duration: 0.5, ease: "easeInOut" }}
			>
				{/* Region Tag */}
				{isExpanded === false && (
					<motion.div
						className="inline-block px-3 py-1 bg-red text-warmGrey uppercase tracking-widest font-normal rounded-full mb-3 text-xs"
						layout="position"
						variants={downToUpVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.5, ease: "easeInOut" }}
					>
						{route.region}
					</motion.div>
				)}

				{/* Route Name */}
				<motion.h3
					className="font-semibold text-warmGrey tracking-widest uppercase line-clamp-2 text-lg"
					style={{
						display: isExpanded ? "none" : "block",
					}}
					layout="position"
					variants={downToUpVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					transition={{ duration: 0.5, ease: "easeInOut" }}
				>
					{route.routeName}
				</motion.h3>
				<motion.div
					className="w-full ml-5 mb-5"
					style={{
						display: isExpanded ? "block" : "none",
					}}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.3 }}
				>
					{isExpanded && <LocationInfo route={route} />}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default RouteCard;
