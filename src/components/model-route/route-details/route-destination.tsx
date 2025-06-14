import type { TouristSpotResponseDto } from "@/api/generated";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { useRef } from "react";
import { calculateDistanceKm, estimateWalkingMinutes } from "@/utils/geo-utils";

const RouteDestination: React.FC<{
	touristSpotList: TouristSpotResponseDto[];
}> = ({ touristSpotList }) => {
	const titleWords = "route destinations".split(" ");
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef(false);
	const startX = useRef(0);
	const scrollLeft = useRef(0);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!scrollContainerRef.current) return;
		isDragging.current = true;
		startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
		scrollLeft.current = scrollContainerRef.current.scrollLeft;
		// Only show grabbing cursor on mobile
		if (window.innerWidth < 768) {
			scrollContainerRef.current.style.cursor = "grabbing";
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging.current || !scrollContainerRef.current) return;
		e.preventDefault();
		const x = e.pageX - scrollContainerRef.current.offsetLeft;
		const walk = (x - startX.current) * 2; // Scroll speed multiplier
		scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
	};

	const handleMouseUp = () => {
		isDragging.current = false;
		if (scrollContainerRef.current && window.innerWidth < 768) {
			scrollContainerRef.current.style.cursor = "grab";
		}
	};

	const handleMouseLeave = () => {
		isDragging.current = false;
		if (scrollContainerRef.current && window.innerWidth < 768) {
			scrollContainerRef.current.style.cursor = "grab";
		}
	};

	const segmentInfo = touristSpotList.slice(0, -1).map((spot, idx) => {
		const next = touristSpotList[idx + 1];
		const from = {
			latitude: spot.touristSpotLatitude,
			longitude: spot.touristSpotLongitude,
		};
		const to = {
			latitude: next?.touristSpotLatitude ?? 0,
			longitude: next?.touristSpotLongitude ?? 0,
		};
		const distance = calculateDistanceKm(from, to);
		const minutes = estimateWalkingMinutes(distance);
		return {
			distance,
			minutes,
		};
	});

	return (
		<div className="h-fit md:rounded-l-3xl md:rounded-r-none rounded-3xl bg-warmGrey2 py-8 text-center">
			<motion.div
				className="mx-4 text-xs sm:text-sm lg:text-sm font-bold tracking-widest text-charcoal uppercase"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: false, amount: 0.5 }}
				transition={{ duration: 0.5 }}
			>
				{titleWords.map((word, i) => (
					<motion.span
						key={`title-${word}`}
						className="inline-block mr-[0.25em]"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false }}
						transition={{
							duration: 0.4,
							delay: 0.05 + i * 0.05,
							ease: [0.6, 0.05, 0.01, 0.9],
						}}
					>
						{word}
					</motion.span>
				))}
			</motion.div>

			<div className="mt-6 sm:mt-8 lg:mt-10 mx-12 md:mx-4">
				{/* Scrollable container with hidden scrollbar */}
				<div
					ref={scrollContainerRef}
					className="overflow-x-auto overflow-y-hidden scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:cursor-auto cursor-grab select-none"
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseLeave}
				>
					<div className="flex items-center justify-center min-w-max px-2 sm:px-4">
						{touristSpotList.map((touristSpot, index) => (
							<React.Fragment key={touristSpot.touristSpotId}>
								{/* Destination Item */}
								<motion.div
									className="flex flex-col items-center text-xs tracking-widest"
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: false }}
									transition={{
										duration: 0.4,
										delay: 0.1 + index * 0.05,
										ease: [0.6, 0.05, 0.01, 0.9],
									}}
								>
									{/* Stop Number */}
									<motion.div
										className="text-[8px] sm:text-[10px] lg:text-[10px] font-bold uppercase tracking-wider text-charcoal mb-1 sm:mb-2"
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: false }}
										transition={{
											duration: 0.3,
											delay: 0.15 + index * 0.05,
											ease: [0.6, 0.05, 0.01, 0.9],
										}}
									>
										Stop {index + 1}
									</motion.div>

									{/* Tourist Spot Image */}
									<motion.div
										initial={{ opacity: 0, scale: 0.5 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: false }}
										transition={{
											duration: 0.4,
											delay: 0.2 + index * 0.05,
											ease: [0.6, 0.05, 0.01, 0.9],
										}}
									>
										{touristSpot.imageSet?.main &&
										touristSpot.imageSet.main.trim() !== "" ? (
											<Image
												src={touristSpot.imageSet.main}
												alt="destination"
												width={300}
												height={300}
												priority
												className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 rounded-full border-2 border-charcoal object-cover"
											/>
										) : (
											<div className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 rounded-full border-2 border-charcoal bg-warmGrey flex items-center justify-center">
												<span className="text-charcoal text-xs uppercase">
													No Image
												</span>
											</div>
										)}
									</motion.div>

									{/* Tourist Spot Name */}
									<motion.div
										className="my-2 sm:my-3 lg:my-4 h-8 sm:h-10 lg:h-12 w-20 sm:w-24 lg:w-32 px-1 sm:px-2 py-1 text-center text-[10px] sm:text-xs lg:text-xs uppercase tracking-widest font-semibold"
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: false }}
										transition={{
											duration: 0.3,
											delay: 0.25 + index * 0.05,
											ease: [0.6, 0.05, 0.01, 0.9],
										}}
									>
										{touristSpot.touristSpotName}
									</motion.div>
								</motion.div>

								{/* Simple Straight Line */}
								{index !== touristSpotList.length - 1 && (
									<div className="relative flex flex-col items-center w-20 sm:w-24 lg:w-32 -mt-8 sm:-mt-10 lg:-mt-10 text-center">
										{/* KM on top */}
										{segmentInfo[index] && (
											<motion.div
												className="absolute bottom-full mb-1 text-[8px] md:text-xs text-charcoal whitespace-nowrap tracking-widest font-medium italic leading-relaxed"
												initial={{ opacity: 0, y: 10 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: false }}
												transition={{
													duration: 0.3,
													delay: 0.35 + index * 0.05,
													ease: [0.6, 0.05, 0.01, 0.9],
												}}
											>
												{segmentInfo[index]?.distance.toFixed(1)} km
											</motion.div>
										)}
										{/* Connecting line */}
										<motion.div
											className="w-full h-0.5 bg-charcoal"
											initial={{ scaleX: 0 }}
											whileInView={{ scaleX: 1 }}
											viewport={{ once: false }}
											transition={{
												duration: 0.5,
												delay: 0.3 + index * 0.05,
												ease: [0.6, 0.05, 0.01, 0.9],
											}}
										/>
										{/* Minutes at bottom */}
										{segmentInfo[index] && (
											<motion.div
												className="absolute top-full mt-1 text-[8px] md:text-xs text-charcoal whitespace-nowrap tracking-widest font-medium italic leading-relaxed"
												initial={{ opacity: 0, y: -10 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: false }}
												transition={{
													duration: 0.3,
													delay: 0.35 + index * 0.05,
													ease: [0.6, 0.05, 0.01, 0.9],
												}}
											>
												{segmentInfo[index]?.minutes} min walk
											</motion.div>
										)}
									</div>
								)}
							</React.Fragment>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RouteDestination;
