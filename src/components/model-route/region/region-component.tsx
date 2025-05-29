import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import { upToDownVariants } from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";

const RegionComponent: React.FC<{ region: ModelRouteResponseDto }> = ({
	region,
}) => {
	return (
		<motion.div
			key="text-content"
			className="relative h-4/5 md:h-[65vh]  w-full md:w-11/12 animate-fadeIn overflow-hidden md:rounded-xl text-warmGrey bg-warmGrey2"
			initial="hidden"
			animate="visible"
			exit="hidden"
			variants={upToDownVariants}
			transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
		>
			<h1 className="text-charcoal">{region.region}</h1>
			<video src={region.regionBackgroundMedia} autoPlay muted loop />
			<h2 className="text-charcoal">
				{region.regionWeatherInfo.temperatureCelsius}°C
			</h2>
			<h2 className="text-charcoal">{region.regionWeatherInfo.weatherName}</h2>
		</motion.div>
	);
};

export default RegionComponent;
