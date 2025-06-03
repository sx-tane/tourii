"use client";

import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { WeatherDisplay } from "@/components/model-route/common";
import { MotionButton } from "@/components/common";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Changed to next/navigation
import type React from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

export interface LocationInfoProps {
	route: ModelRouteResponseDto;
	className?: string;
}

const LocationInfo: React.FC<LocationInfoProps> = ({
	route,
	className = "",
}) => {
	const router = useRouter(); // Initialize router using the hook

	return (
		<div
			className={`flex flex-col items-start justify-center gap-2 md:gap-4 ${className}`}
		>
			<motion.div className="flex flex-col items-start justify-center">
				<motion.div
					className="inline-block italic text-warmGrey font-semibold rounded-full tracking-widest uppercase text-sm md:text-base lg:text-lg"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.3 }}
				>
					{route.region}
				</motion.div>
			</motion.div>
			<motion.div
				className="font-semibold text-warmGrey tracking-widest uppercase text-4xl md:text-5xl lg:text-7xl"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.3 }}
			>
				{route.routeName}
			</motion.div>

			{/* ─── Weather Info ─── */}
			{route.regionWeatherInfo && (
				<motion.div
					className="flex flex-row items-center gap-1 md:gap-2 text-warmGrey"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.35, duration: 0.3 }}
				>
					<WeatherDisplay
						weatherInfo={{
							weatherName: route.regionWeatherInfo.weatherName,
						}}
						iconSize={{
							small: "w-4 h-4 md:w-5 md:h-5",
							large: "w-6 h-6 md:w-8 md:h-8",
						}}
						needTemperature={false}
						className="flex items-center"
					/>
					{typeof route.regionWeatherInfo.temperatureCelsius === "number" && (
						<span className="text-xs md:text-sm font-medium text-warmGrey">
							{Math.ceil(route.regionWeatherInfo.temperatureCelsius)}°C
						</span>
					)}
					{route.regionWeatherInfo.weatherDesc && (
						<span className="text-[10px] md:text-xs text-warmGrey/80 capitalize tracking-wider">
							({route.regionWeatherInfo.weatherDesc})
						</span>
					)}
				</motion.div>
			)}

			{/* ─── Recommended for ─── */}
			{route.recommendation && route.recommendation.length > 0 && (
				<motion.div
					className="w-full"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.3 }}
				>
					<div className="flex flex-row flex-wrap justify-start gap-1 md:gap-2 items-center">
						{route.recommendation.slice(0, 3).map((rec, index) => (
							<motion.div
								key={index + rec}
								className="bg-red text-warmGrey text-[10px] md:text-xs font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-sm"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 + index * 0.1, duration: 0.2 }}
							>
								{rec}
							</motion.div>
						))}
					</div>
				</motion.div>
			)}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5, duration: 0.3 }}
				className="w-full sm:w-auto"
			>
				<MotionButton
					className="mt-2 w-full sm:w-auto"
					hoverText="See More"
					onClick={() => {
						router.push(`/model-route/${route.modelRouteId}`);
					}}
					icon={<ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />}
					size={{
						collapsedWidth: "52px", // smaller for mobile
						height: "h-[52px]", // smaller for mobile
						expandedWidth: "180px", // full width on mobile, specific on sm+
						textSize: "text-sm md:text-base",
						iconSize: "text-sm md:text-base",
					}}
				/>
			</motion.div>
		</div>
	);
};

export default LocationInfo;
