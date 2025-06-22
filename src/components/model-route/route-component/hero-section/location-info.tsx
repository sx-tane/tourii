"use client";

import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { WeatherDisplay } from "@/components/model-route/common";
import { MotionButton } from "@/components/common";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useState, useLayoutEffect, useMemo } from "react";

export interface LocationInfoProps {
	route: ModelRouteResponseDto;
	className?: string;
}

const LocationInfo: React.FC<LocationInfoProps> = ({
	route,
	className = "",
}) => {
	const router = useRouter(); // Initialize router using the hook
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

	// Dynamic styling based on screen size
	const dynamicStyles = useMemo(() => {
		switch (screenSize) {
			case "mobile":
				return {
					regionText: "text-sm",
					routeNameText: "text-2xl",
					weatherText: "text-xs",
					tempText: "text-xs",
					descText: "text-[10px]",
					recText: "text-[10px]",
					recPadding: "px-2 py-1",
					gap: "gap-2",
					recGap: "gap-1",
					weatherGap: "gap-1",
					iconSizes: { small: "w-4 h-4", large: "w-6 h-6" },
					buttonSize: {
						collapsedWidth: "40px",
						height: "h-[40px]",
						expandedWidth: "100px",
						textSize: "text-xs",
						iconSize: "text-xs",
					},
				};
			case "tablet":
				return {
					regionText: "text-base",
					routeNameText: "text-2xl",
					weatherText: "text-sm",
					tempText: "text-sm",
					descText: "text-xs",
					recText: "text-xs",
					recPadding: "px-3 py-1.5",
					gap: "gap-3",
					recGap: "gap-1.5",
					weatherGap: "gap-1.5",
					iconSizes: { small: "w-5 h-5", large: "w-7 h-7" },
					buttonSize: {
						collapsedWidth: "56px",
						height: "h-[56px]",
						expandedWidth: "200px",
						textSize: "text-base",
						iconSize: "text-base",
					},
				};
			case "desktop":
				return {
					regionText: "text-lg",
					routeNameText: "text-7xl",
					weatherText: "text-sm",
					tempText: "text-sm",
					descText: "text-xs",
					recText: "text-xs",
					recPadding: "px-3 py-1.5",
					gap: "gap-4",
					recGap: "gap-2",
					weatherGap: "gap-2",
					iconSizes: { small: "w-5 h-5", large: "w-8 h-8" },
					buttonSize: {
						collapsedWidth: "52px",
						height: "h-[52px]",
						expandedWidth: "180px",
						textSize: "text-base",
						iconSize: "text-base",
					},
				};
		}
	}, [screenSize]);

	return (
		<div
			className={`${dynamicStyles.gap} flex flex-col items-start justify-center ${className}`}
		>
			<motion.div className="flex flex-col items-start justify-center">
				<motion.div
					className={`${dynamicStyles.regionText} italic text-warmGrey font-semibold rounded-full tracking-widest uppercase`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.3 }}
				>
					{route.region}
				</motion.div>
			</motion.div>
			<motion.div
				className={`${dynamicStyles.routeNameText} font-semibold text-warmGrey tracking-widest uppercase`}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.3 }}
			>
				{route.routeName}
			</motion.div>

			{/* ─── Weather Info ─── */}
			{route.regionWeatherInfo && (
				<motion.div
					className={`${dynamicStyles.weatherGap} flex flex-row items-center text-warmGrey`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.35, duration: 0.3 }}
				>
					<WeatherDisplay
						weatherInfo={{
							weatherName: route.regionWeatherInfo.weatherName,
						}}
						iconSize={{
							small: dynamicStyles.iconSizes.small,
							large: dynamicStyles.iconSizes.large,
						}}
						needTemperature={false}
						className="flex items-center"
					/>
					{typeof route.regionWeatherInfo.temperatureCelsius === "number" && (
						<span
							className={`${dynamicStyles.tempText} font-medium text-warmGrey`}
						>
							{Math.ceil(route.regionWeatherInfo.temperatureCelsius)}°C
						</span>
					)}
					{route.regionWeatherInfo.weatherDesc && (
						<span
							className={`${dynamicStyles.descText} text-warmGrey/80 capitalize tracking-wider`}
						>
							({route.regionWeatherInfo.weatherDesc})
						</span>
					)}
				</motion.div>
			)}

			{/* ─── Recommended for ─── */}
			{route.recommendation && route.recommendation.length > 0 && (
				<motion.div
					className={`${dynamicStyles.gap} w-full`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.3 }}
				>
					<div
						className={`${dynamicStyles.recGap} flex flex-row flex-wrap justify-start items-center`}
					>
						{route.recommendation.slice(0, 3).map((rec, index) => (
							<motion.div
								key={index + rec}
								className={`${dynamicStyles.recText} ${dynamicStyles.recPadding} bg-red text-warmGrey font-medium rounded-full shadow-sm`}
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
						router.push(`/v2/region/${route.region}/${route.modelRouteId}`);
					}}
					icon={<ArrowRightIcon className="w-4 h-4" />}
					size={{
						collapsedWidth: dynamicStyles.buttonSize.collapsedWidth,
						height: dynamicStyles.buttonSize.height,
						expandedWidth: dynamicStyles.buttonSize.expandedWidth,
						textSize: dynamicStyles.buttonSize.textSize,
						iconSize: dynamicStyles.buttonSize.iconSize,
					}}
				/>
			</motion.div>
		</div>
	);
};

export default LocationInfo;
