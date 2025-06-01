import type { Meta, StoryObj } from "@storybook/react";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import WeatherDisplay from "./weather-display";

const meta: Meta<typeof WeatherDisplay> = {
	title: "Model Route/Region/WeatherDisplay",
	component: WeatherDisplay,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
				{
					name: "gradient",
					value: "linear-gradient(to bottom right, #21211B, #8B8B7A)",
				},
			],
		},
		docs: {
			description: {
				component:
					"Weather display component showing temperature and weather icon based on OpenWeather API data. Features responsive icon sizing and smooth animations.",
			},
		},
	},
	argTypes: {
		weatherInfo: {
			control: "object",
			description:
				"Weather information object containing weatherName and temperatureCelsius",
		},
		className: {
			control: "text",
			description: "Custom CSS classes for positioning and styling",
		},
		iconSize: {
			control: "object",
			description: "Icon size configuration for small and large screens",
		},
		variants: {
			control: "object",
			description: "Framer Motion animation variants",
		},
		initial: {
			control: "text",
			description: "Initial animation state",
		},
		animate: {
			control: "text",
			description: "Target animation state",
		},
		transition: {
			control: "object",
			description: "Animation transition configuration",
		},
	},
	decorators: [
		(Story) => (
			<div
				style={{
					width: "400px",
					height: "300px",
					position: "relative",
					backgroundColor: "#21211B",
				}}
			>
				<Story />
			</div>
		),
	],
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WeatherDisplay>;

export const Default: Story = {
	args: {
		weatherInfo: {
			weatherName: "Clear",
			temperatureCelsius: 25,
		},
	},
};

export const Cloudy: Story = {
	args: {
		weatherInfo: {
			weatherName: "Clouds",
			temperatureCelsius: 18,
		},
	},
};

export const Rainy: Story = {
	args: {
		weatherInfo: {
			weatherName: "Rain",
			temperatureCelsius: 15,
		},
	},
};

export const Snowy: Story = {
	args: {
		weatherInfo: {
			weatherName: "Snow",
			temperatureCelsius: -2,
		},
	},
};

export const Thunderstorm: Story = {
	args: {
		weatherInfo: {
			weatherName: "Thunderstorm",
			temperatureCelsius: 22,
		},
	},
};

export const Foggy: Story = {
	args: {
		weatherInfo: {
			weatherName: "Fog",
			temperatureCelsius: 12,
		},
	},
};

export const SmallIcons: Story = {
	args: {
		weatherInfo: {
			weatherName: "Clear",
			temperatureCelsius: 28,
		},
		iconSize: { small: "w-8 h-8", large: "lg:w-12 lg:h-12" },
		className: "absolute top-5 right-5 z-30 text-right flex flex-col text-xs",
	},
};

export const LargeIcons: Story = {
	args: {
		weatherInfo: {
			weatherName: "Rain",
			temperatureCelsius: 16,
		},
		iconSize: { small: "w-32 h-32", large: "lg:w-48 lg:h-48" },
		className:
			"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-center flex flex-col text-2xl",
	},
};

export const WithAnimation: Story = {
	args: {
		weatherInfo: {
			weatherName: "Clouds",
			temperatureCelsius: 20,
		},
		variants: downToUpVariants,
		initial: "hidden",
		animate: "visible",
		transition: { delay: 0.5, duration: 1 },
	},
};

export const NoWeatherData: Story = {
	args: {
		weatherInfo: undefined,
	},
};

export const ZeroTemperature: Story = {
	args: {
		weatherInfo: {
			weatherName: "Snow",
			temperatureCelsius: 0,
		},
	},
};

export const HighTemperature: Story = {
	args: {
		weatherInfo: {
			weatherName: "Clear",
			temperatureCelsius: 42,
		},
	},
};

export const UnknownWeather: Story = {
	args: {
		weatherInfo: {
			weatherName: "Unknown",
			temperatureCelsius: 20,
		},
	},
};
