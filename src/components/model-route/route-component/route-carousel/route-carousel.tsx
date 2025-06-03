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

const ANIMATION_DURATION_MS = 700; // animation duration for previous card cleanup

const RouteCarousel: React.FC<RouteCarouselProps> = ({
	routes,
	className = "",
}) => {
	const [expandedIndex, setExpandedIndex] = useState<number>(0);
	const [previousExpandedIndex, setPreviousExpandedIndex] = useState<
		number | null
	>(null);
	const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

	const carouselWrapperRef = useRef<HTMLDivElement>(null);
	const draggableContentRef = useRef<HTMLDivElement>(null);

	// Whenever `routes` changes, reset to the first card expanded
	React.useEffect(() => {
		if (routes && routes.length > 0) {
			setExpandedIndex(0);
			setPreviousExpandedIndex(null);
		}
	}, [routes]);

	// Compute which cards should be in the "dock" (exclude both current and previous expanded)
	const dockRoutes = useMemo(() => {
		return routes.filter(
			(_, idx) => idx !== expandedIndex && idx !== previousExpandedIndex,
		);
	}, [routes, expandedIndex, previousExpandedIndex]);

	//
	// ─────────────── MEASURE & SET DRAG CONSTRAINTS ───────────────
	// We useLayoutEffect so measurements happen after DOM is laid out,
	// ensuring offsetWidth/scrollWidth reflect final sizes (including gap-6 and pr-1).
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useLayoutEffect(() => {
		const calculateConstraints = () => {
			if (
				carouselWrapperRef.current instanceof HTMLElement &&
				draggableContentRef.current instanceof HTMLElement
			) {
				// 1) Visible width of the wrapper:
				const containerWidth = carouselWrapperRef.current.offsetWidth;

				// 2) Total scrollable width of the inner flex (all thumbnails + gap + pr-1):
				const contentWidth = draggableContentRef.current.scrollWidth;

				// 3) If contentWidth > containerWidth, leftValue is negative; otherwise 0.
				const leftValue =
					contentWidth > containerWidth ? containerWidth - contentWidth : 0;

				setDragConstraints({ left: leftValue, right: 0 });
			}
		};

		// Measure immediately after paint:
		calculateConstraints();

		// And re-measure on window resize:
		window.addEventListener("resize", calculateConstraints);
		return () => {
			window.removeEventListener("resize", calculateConstraints);
		};
	}, [dockRoutes]); // re-run whenever `dockRoutes` (the thumbnail list) changes

	//
	// ─────────────── HANDLE "EXPAND A THUMBNAIL" ───────────────
	//
	const handleExpand = useCallback(
		(index: number) => {
			if (index === expandedIndex) return;

			// 1) Remember the old expanded as "previousExpandedIndex":
			setPreviousExpandedIndex(expandedIndex);

			// 2) Immediately set the new expandedIndex:
			setExpandedIndex(index);

			// 3) After 500 ms, clear previousExpandedIndex so the old card docks:
			setTimeout(() => {
				setPreviousExpandedIndex(null);
			}, ANIMATION_DURATION_MS);
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
	const previousExpandedRoute =
		previousExpandedIndex !== null ? routes[previousExpandedIndex] : null;

	// Safeguard: if expandedIndex is out of range
	if (!expandedRoute) return null;

	return (
		<div
			className={`relative w-full h-full flex items-start justify-center ${className}`}
		>
			{/* ───────── Expanded Card Container ───────── */}
			<motion.div
				layout
				className="relative w-screen h-[90vh] rounded-3xl z-20"
			>
				{/* ─── Previously Expanded (underneath, for 500 ms) ─── */}
				{previousExpandedRoute !== null && (
					<motion.div
						key={`expanded-prev-${previousExpandedRoute?.modelRouteId}`}
						className="absolute inset-0 w-full h-full rounded-3xl z-10"
					>
						<RouteCard
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							route={previousExpandedRoute!}
							routeIndex={previousExpandedIndex ?? 0}
							isExpanded={true}
						/>
					</motion.div>
				)}

				{/* ─── Current Expanded (on top) ─── */}
				<motion.div
					layout
					key={`expanded-curr-${expandedRoute.modelRouteId}`}
					className="absolute inset-0 w-full h-full rounded-3xl z-20"
				>
					<RouteCard
						route={expandedRoute}
						routeIndex={expandedIndex}
						isExpanded={true}
					/>
				</motion.div>
			</motion.div>

			{/* ───────── Docked Carousel (thumbnails) & Navigation ───────── */}
			<div className="absolute top-1/4 translate-y-1/4 right-8 z-50 flex flex-col items-end">
				<div ref={carouselWrapperRef} className="max-w-[800px] overflow-hidden">
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
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }} // Follows route name animation
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

				{/* ───────── Navigation Buttons (New Position) ───────── */}
				{routes && routes.length > 1 && (
					<CarouselNavigationButtons
						onPrevious={handlePrevious}
						onNext={handleNext}
					/>
				)}
			</div>
		</div>
	);
};

export default RouteCarousel;
