"use client";
import type { TouristSpotResponseDto } from "@/api/generated";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, Thermometer, Book, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SpotDetailSidebarProps {
	selectedSpot?: TouristSpotResponseDto;
	className?: string;
}

const SpotDetailSidebar: React.FC<SpotDetailSidebarProps> = ({
	selectedSpot,
	className = "",
}) => {
	if (!selectedSpot) {
		return (
			<motion.div
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				className={`bg-white rounded-lg p-6 shadow-lg border border-gray-200 ${className}`}
			>
				<div className="flex items-center justify-center h-64 text-gray-500">
					<div className="text-center">
						<MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
						<p className="text-sm">Select a tourist spot to view details</p>
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
			className={`bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden ${className}`}
		>
			{/* Main Image */}
			{selectedSpot.imageSet?.main && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1 }}
					className="relative h-48 w-full"
				>
					<Image
						src={selectedSpot.imageSet.main}
						alt={selectedSpot.touristSpotName}
						fill
						className="object-cover"
						priority
					/>
				</motion.div>
			)}

			<div className="p-6">
				{/* Spot Name */}
				<motion.h2
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.15 }}
					className="text-2xl font-bold text-charcoal mb-3"
				>
					{selectedSpot.touristSpotName}
				</motion.h2>

				{/* Description */}
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="text-gray-700 text-sm leading-relaxed mb-4"
				>
					{selectedSpot.touristSpotDesc}
				</motion.p>

				{/* Details Grid */}
				<div className="space-y-3 mb-6">
					{/* Address */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.25 }}
						className="flex items-start gap-3"
					>
						<MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
						<div>
							<span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
								Address
							</span>
							<p className="text-sm text-gray-700">{selectedSpot.address}</p>
						</div>
					</motion.div>

					{/* Best Visit Time */}
					{selectedSpot.bestVisitTime && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
							className="flex items-start gap-3"
						>
							<Clock className="w-5 h-5 text-gray-500 mt-0.5" />
							<div>
								<span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
									Best Visit Time
								</span>
								<p className="text-sm text-gray-700">
									{selectedSpot.bestVisitTime}
								</p>
							</div>
						</motion.div>
					)}

					{/* Weather */}
					{selectedSpot.weatherInfo && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.35 }}
							className="flex items-start gap-3"
						>
							<Thermometer className="w-5 h-5 text-blue-500 mt-0.5" />
							<div>
								<span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
									Current Weather
								</span>
								<p className="text-sm text-gray-700">
									{selectedSpot.weatherInfo.temperatureCelsius}°C -{" "}
									{selectedSpot.weatherInfo.weatherName}
								</p>
								<p className="text-xs text-gray-500">
									{selectedSpot.weatherInfo.weatherDesc}
								</p>
							</div>
						</motion.div>
					)}
				</div>

				{/* Hashtags */}
				{selectedSpot.touristSpotHashtag &&
					selectedSpot.touristSpotHashtag.length > 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
							className="mb-6"
						>
							<span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">
								Tags
							</span>
							<div className="flex flex-wrap gap-2">
								{selectedSpot.touristSpotHashtag.map((tag, index) => (
									<span
										key={tag}
										className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
									>
										#{tag}
									</span>
								))}
							</div>
						</motion.div>
					)}

				{/* Story Chapter Link */}
				{selectedSpot.storyChapterLink && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.45 }}
						className="mb-4"
					>
						<Link
							href={selectedSpot.storyChapterLink}
							className="flex items-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
						>
							<Book className="w-5 h-5 text-blue-600" />
							<div className="flex-1">
								<span className="text-sm font-medium text-blue-900">
									Related Story Chapter
								</span>
								<p className="text-xs text-blue-600">
									Learn more about this location
								</p>
							</div>
							<ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
						</Link>
					</motion.div>
				)}

				{/* Quest Button Placeholder */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
				>
					<button
						type="button"
						className="w-full bg-red hover:bg-red/90 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
					>
						<span>View Quests</span>
						<ArrowRight className="w-4 h-4" />
					</button>
				</motion.div>

				{/* Small Images */}
				{selectedSpot.imageSet?.small &&
					selectedSpot.imageSet.small.length > 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.55 }}
							className="mt-6"
						>
							<span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-3">
								More Photos
							</span>
							<div className="grid grid-cols-3 gap-2">
								{selectedSpot.imageSet.small.slice(0, 3).map((image, index) => (
									<div
										key={image}
										className="relative h-16 rounded-md overflow-hidden"
									>
										<Image
											src={image}
											alt={`${selectedSpot.touristSpotName} ${index + 1}`}
											fill
											className="object-cover hover:scale-105 transition-transform cursor-pointer"
										/>
									</div>
								))}
							</div>
						</motion.div>
					)}
			</div>
		</motion.div>
	);
};

export default SpotDetailSidebar;
