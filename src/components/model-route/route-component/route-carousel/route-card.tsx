"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type React from "react";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
// import { WeatherDisplay } from "@/components/model-route/common"; // No longer directly used
import { useRef, useEffect, useState, useLayoutEffect, useMemo } from "react";
import Image from "next/image";
import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
// import { ActionButton, MotionButton } from "@/components/common"; // MotionButton no longer directly used
// import router from "next/router"; // No longer directly used
import LocationInfo from "@/components/model-route/route-component/hero-section/location-info";

// Add this interface before RouteCardProps
interface CardSizeConfig {
	collapsed: {
		width: string | number;
		height: string | number;
	};
	expanded: {
		width: string | number;
		height: string | number;
	};
}

export interface RouteCardProps {
	route: ModelRouteResponseDto;
	routeIndex: number;
	isExpanded?: boolean;
	onSelect?: () => void;
	className?: string;
	onExpansionAnimationComplete?: () => void;
	// Dynamic size props
	collapsedWidth?: string | number;
	collapsedHeight?: string | number;
	expandedWidth?: string | number;
	expandedHeight?: string | number;
	// Alternative: size configuration object
	sizeConfig?: CardSizeConfig;
}

const RouteCard: React.FC<RouteCardProps> = ({
	route,
	routeIndex,
	isExpanded = false,
	onSelect,
	className = "",
	onExpansionAnimationComplete,
	collapsedWidth = "280px",
	collapsedHeight = "400px",
	expandedWidth = "100%",
	expandedHeight = "100%",
	sizeConfig,
}) => {
	const handleClick = () => {
		onSelect?.();
	};

	const [isAnimatingToExpanded, setIsAnimatingToExpanded] = useState(false);
	const prevIsExpanded = useRef(isExpanded);
	const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
		"mobile",
	);

	// Track screen size changes
	useLayoutEffect(() => {
		const checkScreenSize = () => {
			const width = window.innerWidth;
			if (width < 768) {
				setScreenSize("mobile");
			} else if (width < 1024) {
				setScreenSize("tablet");
			} else {
				setScreenSize("desktop");
			}
		};
		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	// Dynamic styling based on screen size and expansion state
	const dynamicStyles = useMemo(() => {
		const baseConfig = {
			mobile: {
				routeNumber: {
					expanded: "text-4xl md:text-5xl",
					collapsed: "text-lg",
				},
				regionTag: "text-[10px] px-2 py-0.5 mb-2",
				routeName: "text-xs",
				spacing: {
					top: "top-2",
					right: "right-2",
					bottom: "bottom-2",
					left: "left-3",
					padding: "px-2 py-0.5",
				},
			},
			tablet: {
				routeNumber: {
					expanded: "text-5xl md:text-6xl",
					collapsed: "text-xl",
				},
				regionTag: "text-xs px-3 py-1 mb-3",
				routeName: "text-base",
				spacing: {
					top: "top-3",
					right: "right-3",
					bottom: "bottom-3",
					left: "left-3",
					padding: "px-3 py-1",
				},
			},
			desktop: {
				routeNumber: {
					expanded: "text-6xl",
					collapsed: "text-2xl",
				},
				regionTag: "text-xs px-3 py-1 mb-3",
				routeName: "text-lg",
				spacing: {
					top: "top-4",
					right: "right-4",
					bottom: "bottom-4",
					left: "left-4",
					padding: "px-3 py-1",
				},
			},
		};

		return baseConfig[screenSize];
	}, [screenSize]);

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
				width: isExpanded
					? sizeConfig?.expanded.width || expandedWidth
					: sizeConfig?.collapsed.width || collapsedWidth,
				height: isExpanded
					? sizeConfig?.expanded.height || expandedHeight
					: sizeConfig?.collapsed.height || collapsedHeight,
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
				className={`absolute ${dynamicStyles.spacing.top} ${dynamicStyles.spacing.right} text-warmGrey font-bold tracking-widest ${
					isExpanded
						? dynamicStyles.routeNumber.expanded
						: dynamicStyles.routeNumber.collapsed
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
				className={`absolute ${dynamicStyles.spacing.bottom} ${dynamicStyles.spacing.left} ${dynamicStyles.spacing.right} text-white max-w-md`}
				layout="position"
				transition={{ duration: 0.5, ease: "easeInOut" }}
			>
				{/* Region Tag */}
				{isExpanded === false && (
					<motion.div
						className={`${dynamicStyles.regionTag} inline-block bg-red text-warmGrey uppercase tracking-widest font-normal rounded-full`}
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
					className={`${dynamicStyles.routeName} font-semibold text-warmGrey tracking-widest uppercase line-clamp-2`}
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
