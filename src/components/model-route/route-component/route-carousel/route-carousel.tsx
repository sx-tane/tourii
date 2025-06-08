"use client";

import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { motion } from "framer-motion";
import React, {
	useState,
	useCallback,
	useLayoutEffect,
	useRef,
	useMemo,
} from "react";
import RouteCard from "./route-card";
import CarouselNavigationButtons from "./carousel-navigation-buttons";

export interface RouteCarouselProps {
	routes: ModelRouteResponseDto[];
	className?: string;
}

const RouteCarousel: React.FC<RouteCarouselProps> = ({
	routes,
	className = "",
}) => {
	const [expandedIndex, setExpandedIndex] = useState<number>(0);
	const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

	const carouselWrapperRef = useRef<HTMLDivElement>(null);
	const draggableContentRef = useRef<HTMLDivElement>(null);
	const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
		"mobile",
	);

	// Whenever `routes` changes, reset to the first card expanded
	React.useEffect(() => {
		if (routes && routes.length > 0) {
			setExpandedIndex(0);
		}
	}, [routes]);

	// Dock = all routes except the current expanded
	const dockRoutes = useMemo(() => {
		return routes.filter((_, idx) => idx !== expandedIndex);
	}, [routes, expandedIndex]);

	// Track screen size changes with three breakpoints
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

	// Dynamic card sizes and layout configurations
	const layoutConfig = useMemo(() => {
		switch (screenSize) {
			case "mobile":
				return {
					cardSizes: {
						expanded: { width: "100%", height: "100%" },
						collapsed: { width: "120px", height: "25vh" },
					},
					expandedContainer: {
						className: "relative w-[90vw] h-[75vh] rounded-b-3xl z-20 mb-2",
					},
					dockContainer: {
						className: "w-[90vw] overflow-hidden mb-3",
					},
				};
			case "tablet":
				return {
					cardSizes: {
						expanded: { width: "100%", height: "100%" },
						collapsed: { width: "180px", height: "280px" },
					},
					expandedContainer: {
						className: "relative w-full h-[90vh] rounded-3xl z-20 mb-4",
					},
					dockContainer: {
						className: "w-full overflow-hidden mb-4",
					},
				};
			case "desktop":
				return {
					cardSizes: {
						expanded: { width: "100%", height: "100%" },
						collapsed: { width: "280px", height: "400px" },
					},
					expandedContainer: {
						className: "relative w-screen h-[85vh] rounded-3xl z-20",
					},
					dockContainer: {
						className: "max-w-[700px] overflow-hidden",
					},
				};
		}
	}, [screenSize]);

	//
	// ─── Measure & set drag‐constraints on the thumbnail row ───
	//
	useLayoutEffect(() => {
		const calculateConstraints = () => {
			if (
				carouselWrapperRef.current instanceof HTMLElement &&
				draggableContentRef.current instanceof HTMLElement
			) {
				const containerWidth = carouselWrapperRef.current.offsetWidth;
				const contentWidth = draggableContentRef.current.scrollWidth;
				const leftValue =
					contentWidth > containerWidth ? containerWidth - contentWidth : 0;
				setDragConstraints({ left: leftValue, right: 0 });
			}
		};

		// measure once
		calculateConstraints();
		// re‐measure on resize
		window.addEventListener("resize", calculateConstraints);
		return () => window.removeEventListener("resize", calculateConstraints);
	}, []);

	//
	// ─── Handle "click a thumbnail to expand" ───
	//
	const handleExpand = useCallback(
		(index: number) => {
			if (index === expandedIndex) return;
			setExpandedIndex(index);
		},
		[expandedIndex],
	);

	const handlePrevious = useCallback(() => {
		if (!routes || routes.length <= 1) return;
		const newIndex = (expandedIndex - 1 + routes.length) % routes.length;
		handleExpand(newIndex);
	}, [expandedIndex, routes, handleExpand]);

	const handleNext = useCallback(() => {
		if (!routes || routes.length <= 1) return;
		const newIndex = (expandedIndex + 1) % routes.length;
		handleExpand(newIndex);
	}, [expandedIndex, routes, handleExpand]);

	if (!routes || routes.length === 0) {
		return (
			<div className="flex items-center justify-center h-64 text-charcoal">
				No routes available
			</div>
		);
	}

	const expandedRoute = routes[expandedIndex];
	if (!expandedRoute) return null;

	//
	// ─── Desktop Layout ───
	//
	const DesktopLayout = () => (
		<>
			{/* ─── Expanded card container ─── */}
			<motion.div layout className={layoutConfig.expandedContainer.className}>
				<motion.div
					layout
					key={expandedRoute.modelRouteId}
					className="absolute inset-0 w-full h-full rounded-3xl z-20"
				>
					<RouteCard
						route={expandedRoute}
						routeIndex={expandedIndex}
						isExpanded={true}
						sizeConfig={{
							collapsed: layoutConfig.cardSizes.collapsed,
							expanded: layoutConfig.cardSizes.expanded,
						}}
					/>
				</motion.div>
			</motion.div>

			{/* ─── Dock row + nav buttons ─── */}
			<div className="absolute top-40 translate-y-1/4 right-8 z-50 flex flex-col items-end">
				<div
					ref={carouselWrapperRef}
					className={layoutConfig.dockContainer.className}
				>
					<motion.div
						ref={draggableContentRef}
						className="flex flex-row gap-6 pr-1"
						drag="x"
						dragConstraints={dragConstraints}
						dragElastic={0.1}
						style={{ cursor: "grab" }}
						whileTap={{ cursor: "grabbing" }}
					>
						{dockRoutes.map((route) => {
							const realIndex = routes.findIndex(
								(r) => r.modelRouteId === route.modelRouteId,
							);
							return (
								<motion.div
									layout
									key={route.modelRouteId}
									className="flex-shrink-0"
									initial={false}
								>
									<RouteCard
										route={route}
										routeIndex={realIndex}
										isExpanded={false}
										onSelect={() => handleExpand(realIndex)}
										className="cursor-pointer"
										sizeConfig={{
											collapsed: layoutConfig.cardSizes.collapsed,
											expanded: layoutConfig.cardSizes.expanded,
										}}
									/>
								</motion.div>
							);
						})}
					</motion.div>
				</div>

				{/* ─── Navigation buttons ─── */}
				{routes.length > 1 && (
					<CarouselNavigationButtons
						onPrevious={handlePrevious}
						onNext={handleNext}
					/>
				)}
			</div>
		</>
	);

	//
	// ─── Mobile Layout ───
	//
	const MobileLayout = () => (
		<div className="w-full flex flex-col items-center">
			{/* Expanded card container */}
			<motion.div layout className={layoutConfig.expandedContainer.className}>
				<motion.div
					layout
					key={expandedRoute.modelRouteId}
					className="absolute inset-0 w-full h-full rounded-b-3xl md:rounded-3xl z-20"
				>
					<RouteCard
						route={expandedRoute}
						routeIndex={expandedIndex}
						isExpanded={true}
						sizeConfig={{
							collapsed: layoutConfig.cardSizes.collapsed,
							expanded: layoutConfig.cardSizes.expanded,
						}}
					/>
				</motion.div>
			</motion.div>

			{/* Dock row + nav buttons */}
			<div className="w-full flex flex-col items-center px-4">
				{dockRoutes.length > 0 && (
					<div
						ref={carouselWrapperRef}
						className={layoutConfig.dockContainer.className}
					>
						<motion.div
							ref={draggableContentRef}
							className="flex flex-row gap-3 p-1"
							drag="x"
							dragConstraints={dragConstraints}
							dragElastic={0.1}
							style={{ cursor: "grab" }}
							whileTap={{ cursor: "grabbing" }}
						>
							{dockRoutes.map((route) => {
								const realIndex = routes.findIndex(
									(r) => r.modelRouteId === route.modelRouteId,
								);
								return (
									<motion.div
										layout
										key={route.modelRouteId}
										className="flex-shrink-0"
										initial={false}
									>
										<RouteCard
											route={route}
											routeIndex={realIndex}
											isExpanded={false}
											onSelect={() => handleExpand(realIndex)}
											className="cursor-pointer"
											sizeConfig={{
												collapsed: layoutConfig.cardSizes.collapsed,
												expanded: layoutConfig.cardSizes.expanded,
											}}
										/>
									</motion.div>
								);
							})}
						</motion.div>
					</div>
				)}
			</div>
		</div>
	);

	return (
		<div
			className={`relative w-full h-full flex items-start ${
				screenSize === "mobile" ? "flex-col" : "justify-center"
			} ${className}`}
		>
			{screenSize === "mobile" ? <MobileLayout /> : <DesktopLayout />}
		</div>
	);
};

export default RouteCarousel;
