"use client";
import type { TouristSpotResponseDto } from "@/api/generated";
import Line from "@/components/about/divider-line/line";
import { useSagaById } from "@/hooks";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

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
	const match = storyChapterLink.match(/\/v2\/touriiverse\/(STO[^/]+)\//);
	return match ? match[1] : undefined;
};

const extractChapterId = (
	storyChapterLink: string | undefined,
): string | undefined => {
	if (!storyChapterLink) return undefined;
	const match = storyChapterLink.match(/\/chapters\/(SCT[^/]+)/);
	return match ? match[1] : undefined;
};

// Custom hooks
const useSimpleSpotRefs = () => {
	const spotRefs = useRef<(HTMLDivElement | null)[]>([]);
	return { spotRefs };
};

const useScrollToViewDetection = (
	spotRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
	touristSpotList: TouristSpotResponseDto[],
	onSpotSelect?: (spotId: string) => void,
) => {
	const observerRef = useRef<IntersectionObserver | null>(null);
	const isUserScrolling = useRef(false);
	const lastSelectedIndex = useRef(-1);

	// biome-ignore lint/correctness/useExhaustiveDependencies: spotRefs.current changes are intentionally not tracked
	useEffect(() => {
		if (!onSpotSelect || touristSpotList.length === 0) return;

		// Clean up previous observer
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		// Create intersection observer
		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (!isUserScrolling.current) return;

				// Find the entry with the highest intersection ratio that's actually visible
				let maxRatio = 0;
				let targetEntry = null;

				for (const entry of entries) {
					if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
						maxRatio = entry.intersectionRatio;
						targetEntry = entry;
					}
				}

				if (targetEntry) {
					const spotIndex = Number.parseInt(
						targetEntry.target.getAttribute("data-spot-index") || "-1",
					);

					if (
						spotIndex >= 0 &&
						spotIndex < touristSpotList.length &&
						spotIndex !== lastSelectedIndex.current
					) {
						lastSelectedIndex.current = spotIndex;
						const spot = touristSpotList[spotIndex];
						if (spot?.touristSpotId) {
							onSpotSelect(spot.touristSpotId);
						}
					}
				}
			},
			{
				root: null, // Use viewport as root
				rootMargin: "-20% 0px -20% 0px", // Trigger when item is in middle 60% of viewport
				threshold: [0.1, 0.3, 0.5, 0.7, 0.9], // Multiple thresholds for better detection
			},
		);

		// Observe all spot elements
		for (const ref of spotRefs.current) {
			if (ref && observerRef.current) {
				observerRef.current.observe(ref);
			}
		}

		// Set user scrolling flag after a longer delay to reduce sensitivity
		const timer = setTimeout(() => {
			isUserScrolling.current = true;
		}, 2000); // Increased from 1000ms to 2000ms

		return () => {
			clearTimeout(timer);
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [touristSpotList, onSpotSelect]);

	// Reset scrolling flag when programmatically scrolling to selected spot
	const disableScrollDetection = () => {
		isUserScrolling.current = false;
		setTimeout(() => {
			isUserScrolling.current = true;
		}, 1500); // Increased from 1000ms to 1500ms
	};

	return { disableScrollDetection };
};

const useSpotSelection = (
	selectedSpot: TouristSpotResponseDto | undefined,
	spotRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
	disableScrollDetection?: () => void,
) => {
	const selectedSpotRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (selectedSpot && selectedSpotRef.current) {
			// Only disable scroll detection if the function exists
			if (disableScrollDetection) {
				disableScrollDetection();
			}

			selectedSpotRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start", // Changed from "center" to "start" to show the title
			});
		}
	}, [selectedSpot, disableScrollDetection]);

	return { selectedSpotRef };
};

// Sub-components
const SpotHeader: React.FC<{
	stopNumber: number;
	spotName: string;
	chapterTitle?: string;
	spotDesc: string;
}> = ({ stopNumber, spotName, chapterTitle, spotDesc }) => {
	const spotNameWords = spotName.split(" ");

	return (
		<div className="pb-5 flex flex-col gap">
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: false }}
				transition={{
					duration: 0.6,
					delay: 0.1,
					ease: [0.6, 0.05, 0.01, 0.9],
				}}
				className="mb-2 text-sm sm:text-base font-bold tracking-widest uppercase text-red "
			>
				STOP {stopNumber}
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: false }}
				transition={{ duration: 0.5 }}
				className="text-lg sm:text-xl font-bold uppercase tracking-widest text-charcoal mb-1"
			>
				{spotNameWords.map((word, i) => (
					<motion.span
						key={`spot-name-${word}`}
						className="inline-block mr-[0.25em]"
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: false }}
						transition={{
							duration: 0.6,
							delay: 0.2 + i * 0.1,
							ease: [0.6, 0.05, 0.01, 0.9],
						}}
					>
						{word}
					</motion.span>
				))}
			</motion.div>

			<motion.div
				initial={{ opacity: 0, x: -20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: false }}
				transition={{
					duration: 0.6,
					delay: 0.3,
					ease: [0.6, 0.05, 0.01, 0.9],
				}}
				className="text-sm font-semibold tracking-widest text-charcoal italic"
			>
				{chapterTitle || ""}
			</motion.div>
		</div>
	);
};

const SpotImage: React.FC<{
	chapterImage?: string;
	mainImageSrc?: string;
	chapterTitle?: string;
	spotName: string;
	storyChapterLink?: string;
	storyChapterId?: string;
}> = ({
	chapterImage,
	mainImageSrc,
	chapterTitle,
	spotName,
	storyChapterLink,
	storyChapterId,
}) => (
	<motion.div
		initial={{ opacity: 0, x: -20 }}
		whileInView={{ opacity: 1, x: 0 }}
		viewport={{ once: false }}
		transition={{
			duration: 0.6,
			delay: 0.2,
			ease: [0.6, 0.05, 0.01, 0.9],
		}}
		className="relative pb-5"
	>
		{chapterImage || (mainImageSrc && isValidImageUrl(mainImageSrc)) ? (
			<div className="relative">
				{chapterImage && isValidImageUrl(chapterImage) ? (
					<Image
						src={chapterImage}
						alt={chapterTitle || spotName}
						width={300}
						height={300}
						className="mx-auto h-[20vh] sm:h-[20vh] w-full rounded-full object-cover brightness-90 "
					/>
				) : mainImageSrc && isValidImageUrl(mainImageSrc) ? (
					<Image
						src={mainImageSrc}
						alt={spotName}
						width={300}
						height={300}
						className="mx-auto h-[20vh] sm:h-[20vh] w-8/12 sm:w-6/12 rounded-full object-cover brightness-90 xl:w-full"
					/>
				) : null}
				{storyChapterLink && storyChapterId !== "No" && (
					<Link
						className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-charcoal px-3 py-2 text-xs font-normal tracking-widest text-warmGrey transition-all duration-300 hover:bg-red"
						href={storyChapterLink}
						onClick={(e) => e.stopPropagation()}
					>
						Revisit the story
					</Link>
				)}
			</div>
		) : (
			<div className="mx-auto h-[12vh] sm:h-[15vh] w-8/12 sm:w-6/12 rounded-full bg-warmGrey flex items-center justify-center xl:w-8/12">
				<span className="text-charcoal text-xs sm:text-sm">No Image</span>
			</div>
		)}
	</motion.div>
);

const SpotCard: React.FC<{
	spot: TouristSpotResponseDto;
	index: number;
	selectedSpot?: TouristSpotResponseDto;
	selectedSpotRef: React.MutableRefObject<HTMLDivElement | null>;
	spotRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}> = ({ spot, index, selectedSpot, selectedSpotRef, spotRefs }) => {
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
		>
			<div className="px-8 sm:px-10">
				<SpotHeader
					stopNumber={spotStopNumber}
					spotName={spot.touristSpotName}
					chapterTitle={spotCurrentChapter?.chapterTitle}
					spotDesc={spot.touristSpotDesc}
				/>

				{spot.storyChapterId !== "No" && (
					<SpotImage
						chapterImage={spotCurrentChapter?.chapterImage}
						mainImageSrc={spotHasValidMainImage ? spotMainImageSrc : undefined}
						chapterTitle={spotCurrentChapter?.chapterTitle}
						spotName={spot.touristSpotName}
						storyChapterLink={spot.storyChapterLink}
						storyChapterId={spot.storyChapterId}
					/>
				)}

				{/* Tourist Spot Description */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: false }}
					transition={{
						duration: 0.6,
						delay: 0.3,
						ease: [0.6, 0.05, 0.01, 0.9],
					}}
					className="text-sm text-charcoal leading-relaxed mb-3 sm:mb-10 tracking-wider font-medium text-justify whitespace-break-spaces"
				>
					<ReactMarkdown>{spot.touristSpotDesc}</ReactMarkdown>
				</motion.div>

				{/* Quest Button */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: false }}
					transition={{
						duration: 0.6,
						delay: 0.35,
						ease: [0.6, 0.05, 0.01, 0.9],
					}}
				>
					<button
						type="button"
						className="w-full  border-red border text-red hover:bg-red tracking-widest hover:text-warmGrey uppercase font-semibold py-2 px-3 sm:px-4 rounded-full flex items-center justify-center text-sm transition-all duration-300"
						onClick={(e) => e.stopPropagation()}
					>
						<span>View Quests</span>
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
	const { spotRefs } = useSimpleSpotRefs();
	// COMPLETELY DISABLED: No automatic scroll detection - makes mobile scrolling difficult
	// const { disableScrollDetection } = useScrollToViewDetection(
	// 	spotRefs,
	// 	touristSpotList,
	// 	onSpotSelect,
	// );
	const { selectedSpotRef } = useSpotSelection(
		selectedSpot,
		spotRefs,
		undefined, // No scroll detection
	);

	if (touristSpotList.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				className={`rounded-lg p-6 shadow-lg border ${className}`}
			>
				<div className="flex items-center justify-center h-64 ">
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
			<div className="overflow-y-auto h-full py-10 md:border-mustard md:border-2 rounded-3xl md:mx-10 scrollbar-hide md:bg-warmGrey">
				{touristSpotList.map((spot, index) => (
					<div key={spot.touristSpotId}>
						<SpotCard
							spot={spot}
							index={index}
							selectedSpot={selectedSpot}
							selectedSpotRef={selectedSpotRef}
							spotRefs={spotRefs}
						/>
						{/* Add Line component between stops, but not after the last one */}
						{index < touristSpotList.length - 1 && (
							<div className="px-10">
								<Line />
							</div>
						)}
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default SpotDetailSidebar;
