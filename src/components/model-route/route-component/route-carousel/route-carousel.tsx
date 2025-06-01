"use client";

import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { motion } from "framer-motion";
import type React from "react";
import { useState, useCallback, useEffect } from "react";
import RouteCard from "./route-card";

export interface RouteCarouselProps {
	routes: ModelRouteResponseDto[];
	className?: string;
}

const RouteCarousel: React.FC<RouteCarouselProps> = ({
	routes,
	className = "",
}) => {
	const [expandedIndex, setExpandedIndex] = useState(0);

	useEffect(() => {
		if (routes && routes.length > 0) {
			setExpandedIndex(0);
		}
	}, [routes]);

	const handleExpand = useCallback((index: number) => {
		setExpandedIndex(index);
	}, []);

	if (!routes || routes.length === 0) {
		return (
			<div className="flex items-center justify-center h-64 text-warmGrey">
				No routes available
			</div>
		);
	}

	const expandedRoute = routes[expandedIndex];
	if (!expandedRoute) return null;

	const dockRoutes = routes.filter((_, idx) => idx !== expandedIndex);

	return (
		<div
			className={`relative w-full h-full flex items-start justify-center overflow-hidden ${className}`}
		>
			{/* Expanded Card */}
			<motion.div
				layout
				key={`expanded-${expandedRoute.modelRouteId}`}
				className="relative w-full h-full rounded-3xl overflow-hidden bg-charcoal flex-shrink-0 z-20"
				transition={{ duration: 0.5 }}
			>
				<RouteCard
					route={expandedRoute}
					routeIndex={expandedIndex}
					isExpanded={true}
					className="w-full h-full"
				/>
			</motion.div>

			{/* Docked Carousel */}
			<motion.div
				layout
				className="absolute bottom-8 right-8 flex flex-row gap-6 z-50"
			>
				{dockRoutes.map((route, idx) => {
					const realIndex = routes.findIndex(
						(r) => r.modelRouteId === route.modelRouteId,
					);
					return (
						<motion.div
							layout
							key={route.modelRouteId}
							transition={{ duration: 0.5 }}
						>
							<RouteCard
								route={route}
								routeIndex={realIndex}
								isExpanded={false}
								onSelect={() => handleExpand(realIndex)}
								className="w-[160px] h-[200px] cursor-pointer"
							/>
						</motion.div>
					);
				})}
			</motion.div>
		</div>
	);
};

export default RouteCarousel;
