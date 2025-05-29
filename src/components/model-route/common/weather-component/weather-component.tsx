import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import type React from "react";

// Assuming WeatherComponentProps is based on RegionWeatherInfo
export interface WeatherComponentProps {
	weatherInfo: ModelRouteResponseDto["regionWeatherInfo"];
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({ weatherInfo }) => {
	if (!weatherInfo) return null;

	const { temperatureCelsius, weatherName, weatherDesc } = weatherInfo;

	return (
		<div>
			{/* Implement your WeatherComponent here */}
			<p>Temperature: {temperatureCelsius}°C</p>
			<p>Weather: {weatherName}</p>
			<p>Description: {weatherDesc}</p>
		</div>
	);
};

export default WeatherComponent;
