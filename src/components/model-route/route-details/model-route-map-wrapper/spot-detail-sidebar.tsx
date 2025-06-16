"use client";
import type { TouristSpotResponseDto } from "@/api/generated";
import { useSagaById } from "@/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";

// Constants
const INTERSECTION_CONFIG = {
	root: null,
	rootMargin: "-25% 0px -25% 0px",
	threshold: 0.6,
	debounceDelay: 300,
	minRatio: 0.5,
	scrollDelay: 800,
};

interface SpotDetailSidebarProps {
	selectedSpot?: TouristSpotResponseDto;
	touristSpotList?: TouristSpotResponseDto[];
	onSpotSelect?: (spotId: string) => void;
	className?: string;
}

// Utility functions
const isValidImageUrl = (url: string | undefined | null): url is string => {
	return typeof url === "string" && url.trim() !== "";
};

const extractStorySagaId = (
	storyChapterLink: string | undefined,
): string | undefined => {
	if (!storyChapterLink) return undefined;
	const match = storyChapterLink.match(/\/v2\/touriiverse\/(STO[^\/]+)\//);
	return match ? match[1] : undefined;
};

const extractChapterId = (
	storyChapterLink: string | undefined,
): string | undefined => {
	if (!storyChapterLink) return undefined;
	const match = storyChapterLink.match(/\/chapters\/(SCT[^\/]+)/);
	return match ? match[1] : undefined;
};

// Custom hooks
const useIntersectionObserver = (
	touristSpotList: TouristSpotResponseDto[],
	selectedSpot: TouristSpotResponseDto | undefined,
	onSpotSelect: ((spotId: string) => void) | undefined,
) => {
	const spotRefs = useRef<(HTMLDivElement | null)[]>([]);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isUserScrollingRef = useRef<boolean>(false);

	const handleIntersection = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}

			debounceTimeoutRef.current = setTimeout(() => {
				let maxRatio = INTERSECTION_CONFIG.minRatio;
				let visibleSpotId: string | null = null;

				for (const entry of entries) {
					if (entry.intersectionRatio > maxRatio) {
						maxRatio = entry.intersectionRatio;
						const spotIndex = Number(
							entry.target.getAttribute("data-spot-index"),
						);
						if (spotIndex >= 0 && spotIndex < touristSpotList.length) {
							visibleSpotId = touristSpotList[spotIndex]?.touristSpotId || null;
						}
					}
				}

				if (
					visibleSpotId &&
					visibleSpotId !== selectedSpot?.touristSpotId &&
					isUserScrollingRef.current
				) {
					onSpotSelect?.(visibleSpotId);
				}
			}, INTERSECTION_CONFIG.debounceDelay);
		},
		[touristSpotList, selectedSpot?.touristSpotId, onSpotSelect],
	);

	useEffect(() => {
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		isUserScrollingRef.current = true;

		observerRef.current = new IntersectionObserver(handleIntersection, {
			root: INTERSECTION_CONFIG.root,
			rootMargin: INTERSECTION_CONFIG.rootMargin,
			threshold: INTERSECTION_CONFIG.threshold,
		});

		for (const ref of spotRefs.current) {
			if (ref && observerRef.current) {
				observerRef.current.observe(ref);
			}
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}
		};
	}, [handleIntersection]);

	return {
		spotRefs,
		isUserScrollingRef,
	};
};

const useSpotSelection = (
	selectedSpot: TouristSpotResponseDto | undefined,
	spotRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
	isUserScrollingRef: React.MutableRefObject<boolean>,
) => {
	const selectedSpotRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (selectedSpot && selectedSpotRef.current) {
			isUserScrollingRef.current = false;
			selectedSpotRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
			setTimeout(() => {
				isUserScrollingRef.current = true;
			}, INTERSECTION_CONFIG.scrollDelay);
		}
	}, [selectedSpot, isUserScrollingRef]);

	return { selectedSpotRef };
};

// Sub-components
const SpotHeader: React.FC<{
	stopNumber: number;
	spotName: string;
	chapterTitle?: string;
	spotDesc: string;
}> = ({ stopNumber, spotName, chapterTitle, spotDesc }) => (
	<>
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.1 }}
			className="mb-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-gray-600"
		>
			STOP {stopNumber}
		</motion.div>

		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.15 }}
			className="text-lg sm:text-xl font-bold uppercase tracking-widest text-charcoal mb-1"
		>
			{spotName}
		</motion.div>

		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2 }}
			className="text-xs sm:text-sm font-medium tracking-widest text-gray-700 mb-3"
		>
			{chapterTitle || spotDesc}
		</motion.div>
	</>
);

const SpotImage: React.FC<{
	chapterImage?: string;
	mainImageSrc?: string;
	chapterTitle?: string;
	spotName: string;
	storyChapterLink?: string;
}> = ({
	chapterImage,
	mainImageSrc,
	chapterTitle,
	spotName,
	storyChapterLink,
}) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ delay: 0.25 }}
		className="relative mb-3"
	>
		{chapterImage || (mainImageSrc && isValidImageUrl(mainImageSrc)) ? (
			<div className="relative">
				{chapterImage && isValidImageUrl(chapterImage) ? (
					<Image
						src={chapterImage}
						alt={chapterTitle || spotName}
						width={300}
						height={300}
						className="mx-auto h-[12vh] sm:h-[15vh] w-8/12 sm:w-6/12 rounded-full object-cover brightness-90 xl:w-8/12"
					/>
				) : mainImageSrc && isValidImageUrl(mainImageSrc) ? (
					<Image
						src={mainImageSrc}
						alt={spotName}
						width={300}
						height={300}
						className="mx-auto h-[12vh] sm:h-[15vh] w-8/12 sm:w-6/12 rounded-full object-cover brightness-90 xl:w-8/12"
					/>
				) : null}
				{storyChapterLink && (
					<Link
						className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-charcoal px-3 py-1 text-xs font-semibold tracking-widest text-white transition-all duration-300 hover:bg-red"
						href={storyChapterLink}
						onClick={(e) => e.stopPropagation()}
					>
						Revisit the story
					</Link>
				)}
			</div>
		) : (
			<div className="mx-auto h-[12vh] sm:h-[15vh] w-8/12 sm:w-6/12 rounded-full bg-gray-200 flex items-center justify-center xl:w-8/12">
				<span className="text-gray-400 text-xs sm:text-sm">No Image</span>
			</div>
		)}
	</motion.div>
);

const SpotCard: React.FC<{
	spot: TouristSpotResponseDto;
	index: number;
	selectedSpot?: TouristSpotResponseDto;
	onSpotSelect?: (spotId: string) => void;
	selectedSpotRef: React.MutableRefObject<HTMLDivElement | null>;
	spotRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}> = ({
	spot,
	index,
	selectedSpot,
	onSpotSelect,
	selectedSpotRef,
	spotRefs,
}) => {
	const spotStopNumber = index + 1;
	const spotStorySagaId = extractStorySagaId(spot.storyChapterLink);
	const { storyChapterList: spotStoryChapterList } = useSagaById(
		spotStorySagaId ?? "",
	);
	const spotChapterId = extractChapterId(spot.storyChapterLink);
	const spotCurrentChapter = spotStoryChapterList?.find(
		(chapter) => chapter.storyChapterId === spotChapterId,
	);
	const spotMainImageSrc = spot.imageSet?.main;
	const spotHasValidMainImage =
		spotMainImageSrc && spotMainImageSrc.trim() !== "";

	return (
		<div
			key={spot.touristSpotId}
			ref={(el) => {
				if (selectedSpot?.touristSpotId === spot.touristSpotId) {
					selectedSpotRef.current = el;
				}
				spotRefs.current[index] = el;
			}}
			data-spot-index={index}
			className={`border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
				selectedSpot?.touristSpotId === spot.touristSpotId
					? "bg-blue-50 border-blue-200"
					: ""
			}`}
			onClick={() => onSpotSelect?.(spot.touristSpotId)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onSpotSelect?.(spot.touristSpotId);
				}
			}}
			aria-label={`Select ${spot.touristSpotName}`}
		>
			<div className="p-3 sm:p-4">
				<SpotHeader
					stopNumber={spotStopNumber}
					spotName={spot.touristSpotName}
					chapterTitle={spotCurrentChapter?.chapterTitle}
					spotDesc={spot.touristSpotDesc}
				/>

				<SpotImage
					chapterImage={spotCurrentChapter?.chapterImage}
					mainImageSrc={spotHasValidMainImage ? spotMainImageSrc : undefined}
					chapterTitle={spotCurrentChapter?.chapterTitle}
					spotName={spot.touristSpotName}
					storyChapterLink={spot.storyChapterLink}
				/>

				{/* Tourist Spot Description */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
					className="text-sm text-gray-700 leading-relaxed mb-3"
				>
					{spot.touristSpotDesc}
				</motion.div>

				{/* Quest Button */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.35 }}
				>
					<button
						type="button"
						className="w-full bg-red hover:bg-red/90 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
						onClick={(e) => e.stopPropagation()}
					>
						<span>View Quests</span>
						<ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
					</button>
				</motion.div>
			</div>
		</div>
	);
};

const SpotDetailSidebar: React.FC<SpotDetailSidebarProps> = ({
	selectedSpot,
	touristSpotList = [],
	onSpotSelect,
	className = "",
}) => {
	const { spotRefs, isUserScrollingRef } = useIntersectionObserver(
		touristSpotList,
		selectedSpot,
		onSpotSelect,
	);
	const { selectedSpotRef } = useSpotSelection(
		selectedSpot,
		spotRefs,
		isUserScrollingRef,
	);

	if (touristSpotList.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				className={`bg-white rounded-lg p-6 shadow-lg border border-gray-200 ${className}`}
			>
				<div className="flex items-center justify-center h-64 text-gray-500">
					<div className="text-center">
						<MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
						<p className="text-sm">No tourist spots available</p>
					</div>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.3 }}
			className={`h-full ${className}`}
		>
			<div className="overflow-y-auto h-full bg-white scrollbar-hide">
				{touristSpotList.map((spot, index) => (
					<SpotCard
						key={spot.touristSpotId}
						spot={spot}
						index={index}
						selectedSpot={selectedSpot}
						onSpotSelect={onSpotSelect}
						selectedSpotRef={selectedSpotRef}
						spotRefs={spotRefs}
					/>
				))}
			</div>
		</motion.div>
	);
};

export default SpotDetailSidebar;
