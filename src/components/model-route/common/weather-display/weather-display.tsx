import type React from "react";
import {
	Sun,
	Cloud,
	CloudRain,
	CloudDrizzle,
	CloudSnow,
	CloudLightning,
	CloudFog,
	Wind,
	Tornado,
	CloudSun,
} from "lucide-react";

interface WeatherInfo {
	weatherName?: string;
	temperatureCelsius?: number;
}

interface WeatherDisplayProps {
	weatherInfo?: WeatherInfo;
	className?: string;
	iconSize?: {
		small: string;
		large: string;
	};
	needTemperature?: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
	weatherInfo,
	className = "text-right md:flex flex-col text-sm lg:text-base",
	iconSize = { small: "w-20 h-20", large: "lg:w-40 lg:h-40" },
	needTemperature = true,
}) => {
	if (!weatherInfo) {
		return null;
	}

	return (
		<div className={className}>
			<div className="flex">
				<div className="text-3xl lg:text-6xl font-semibold lg:mt-2 tracking-wider">
					{needTemperature ? (
						<div>
							{weatherInfo.temperatureCelsius
								? Math.ceil(weatherInfo.temperatureCelsius)
								: "--"}
							°
						</div>
					) : undefined}
				</div>
				<div className="text-lg lg:text-xl font-medium tracking-wider mb-2">
					{getWeatherIcon(weatherInfo.weatherName, iconSize)}
				</div>
			</div>
		</div>
	);
};

// Helper function to get weather icon based on OpenWeather API weather condition names
const getWeatherIcon = (
	weatherName?: string,
	iconSize: { small: string; large: string } = {
		small: "w-20 h-20",
		large: "lg:w-40 lg:h-40",
	},
): React.ReactNode => {
	const iconClasses = `${iconSize.small} ${iconSize.large} text-warmGrey`;
	const defaultIconClasses = `${iconSize.small} ${iconSize.large}`;

	if (!weatherName) return <CloudSun className={defaultIconClasses} />;

	const weather = weatherName.toLowerCase();

	// OpenWeather API Groups - following official documentation
	// Group 800: Clear
	if (weather.includes("clear")) return <Sun className={iconClasses} />;

	// Group 80x: Clouds
	if (weather.includes("clouds")) return <Cloud className={iconClasses} />;

	// Group 5xx: Rain
	if (weather.includes("rain")) return <CloudRain className={iconClasses} />;

	// Group 3xx: Drizzle
	if (weather.includes("drizzle"))
		return <CloudDrizzle className={iconClasses} />;

	// Group 6xx: Snow
	if (weather.includes("snow")) return <CloudSnow className={iconClasses} />;

	// Group 2xx: Thunderstorm
	if (weather.includes("thunderstorm"))
		return <CloudLightning className={iconClasses} />;

	// Group 7xx: Atmosphere
	if (weather.includes("mist")) return <CloudFog className={iconClasses} />;
	if (weather.includes("fog")) return <CloudFog className={iconClasses} />;
	if (weather.includes("haze")) return <CloudFog className={iconClasses} />;
	if (weather.includes("smoke")) return <CloudFog className={iconClasses} />;
	if (weather.includes("dust")) return <CloudFog className={iconClasses} />;
	if (weather.includes("sand")) return <CloudFog className={iconClasses} />;
	if (weather.includes("ash")) return <CloudFog className={iconClasses} />;
	if (weather.includes("squall")) return <Wind className={iconClasses} />;
	if (weather.includes("tornado")) return <Tornado className={iconClasses} />;

	return <CloudSun className={`${defaultIconClasses} text-warmGrey`} />; // Default partly cloudy for unknown conditions
};

export default WeatherDisplay;
