import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import { RegionButton } from "@/components/model-route/region";
import { WeatherDisplay } from "@/components/model-route/common/weather-display";

const RegionComponent: React.FC<{ region: ModelRouteResponseDto }> = ({
	region,
}) => {
	// Handle the case where region is undefined
	if (!region) {
		return null;
	}

	// Check if we have a background image
	const hasBackgroundImage = !!region?.regionBackgroundMedia;

	return (
		<motion.div
			key={`region-content-${region?.region}`}
			className="relative h-4/5 md:h-[65vh] w-full md:w-11/12 animate-fadeIn overflow-hidden md:rounded-xl text-warmGrey"
			initial="hidden"
			animate="visible"
			exit="hidden"
			variants={upToDownVariants}
			transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
		>
			{/* Region Name - Large Title */}
			<motion.div
				className="absolute left-10 top-5 z-30 whitespace-pre-line font-bold uppercase tracking-wider text-warmGrey text-6xl lg:text-7xl xl:text-8xl"
				variants={upToDownVariants}
				initial="hidden"
				animate="visible"
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				{region?.region}
				<div className="text-sm lg:text-base font-normal block lg:hidden mt-2 mr-5 capitalize tracking-wider">
					{region?.regionDesc}
				</div>
			</motion.div>

			{/* Explore Button - Bottom Left */}
			<motion.div
				className="absolute bottom-10 left-10 z-30"
				variants={downToUpVariants}
				initial="hidden"
				animate="visible"
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<RegionButton region={region} />
			</motion.div>

			{/* Region Description - Top Right */}
			<motion.div
				className="absolute right-10 top-5 z-30 w-1/3 hidden lg:flex text-sm lg:text-base"
				variants={upToDownVariants}
				initial="hidden"
				animate="visible"
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				{region?.regionDesc}
			</motion.div>

			{/* Weather Info - Bottom Right */}
			<motion.div
				className="absolute right-10 bottom-0 z-30"
				variants={downToUpVariants}
				initial="hidden"
				animate="visible"
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<WeatherDisplay
					weatherInfo={region?.regionWeatherInfo}
					iconSize={{ small: "w-20 h-20", large: "lg:w-40 lg:h-40" }}
				/>
			</motion.div>

			{/* Background Image */}
			{hasBackgroundImage && (
				<Image
					src={region?.regionBackgroundMedia ?? ""}
					alt={region?.region ?? ""}
					width={1920}
					height={1080}
					quality={100}
					className=" z-20 h-full w-full object-cover brightness-50"
					priority
				/>
			)}

			{/* Fallback background if no image */}
			{!hasBackgroundImage && (
				<div className=" z-20 h-full w-full bg-gradient-to-br from-charcoal to-warmGrey2" />
			)}
		</motion.div>
	);
};

export default RegionComponent;
