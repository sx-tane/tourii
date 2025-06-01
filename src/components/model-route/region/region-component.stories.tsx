import type { Meta, StoryObj } from "@storybook/react";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import RegionComponent from "./region-component";

// Mock region data with complete ModelRouteResponseDto structure
const mockRegions: { [key: string]: ModelRouteResponseDto } = {
	osaka: {
		modelRouteId: "osaka-route-1",
		storyId: "osaka-story-1",
		routeName: "Osaka Cultural Heritage Route",
		region: "Osaka",
		regionDesc:
			"Known for its vibrant food scene, historic castles, and traditional merchant culture",
		recommendation: [
			"Visit Osaka Castle",
			"Try authentic takoyaki",
			"Explore Dotonbori district",
		],
		regionLatitude: 34.6937,
		regionLongitude: 135.5023,
		regionBackgroundMedia:
			"https://images.unsplash.com/photo-1590559899731-a382839e5549?w=1920&h=1080&fit=crop",
		touristSpotList: [],
		regionWeatherInfo: {
			weatherName: "Clear",
			temperatureCelsius: 25,
			weatherDesc: "Clear sky with light breeze",
			regionName: "Osaka",
		},
	},
	kyoto: {
		modelRouteId: "kyoto-route-1",
		storyId: "kyoto-story-1",
		routeName: "Kyoto Ancient Capital Route",
		region: "Kyoto",
		regionDesc:
			"Ancient capital filled with temples, traditional culture, and geisha districts",
		recommendation: [
			"Visit Fushimi Inari Shrine",
			"Experience traditional tea ceremony",
			"Walk through Bamboo Grove",
		],
		regionLatitude: 35.0116,
		regionLongitude: 135.7681,
		regionBackgroundMedia:
			"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&h=1080&fit=crop",
		touristSpotList: [],
		regionWeatherInfo: {
			weatherName: "Clouds",
			temperatureCelsius: 22,
			weatherDesc: "Partly cloudy with occasional sunshine",
			regionName: "Kyoto",
		},
	},
	tokyo: {
		modelRouteId: "tokyo-route-1",
		storyId: "tokyo-story-1",
		routeName: "Tokyo Metropolitan Route",
		region: "Tokyo",
		regionDesc:
			"Modern metropolis blending cutting-edge technology with deep-rooted traditions",
		recommendation: [
			"Visit Tokyo Skytree",
			"Explore Shibuya Crossing",
			"Experience digital art in teamLab",
		],
		regionLatitude: 35.6762,
		regionLongitude: 139.6503,
		regionBackgroundMedia:
			"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&h=1080&fit=crop",
		touristSpotList: [],
		regionWeatherInfo: {
			weatherName: "Rain",
			temperatureCelsius: 18,
			weatherDesc: "Light rain with overcast skies",
			regionName: "Tokyo",
		},
	},
};

const meta: Meta<typeof RegionComponent> = {
	title: "Model Route/Region/RegionComponent",
	component: RegionComponent,
	parameters: {
		layout: "fullscreen",
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
					"Complete region display component featuring region name, description, weather info, explore button, and background image. Includes smooth framer-motion animations and responsive design.",
			},
		},
	},
	argTypes: {
		region: {
			control: "object",
			description:
				"Complete region data object with all required ModelRouteResponseDto properties",
		},
	},
	decorators: [
		(Story) => (
			<div
				style={{
					width: "100vw",
					height: "100vh",
					position: "relative",
					overflow: "hidden",
				}}
			>
				<Story />
			</div>
		),
	],
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RegionComponent>;

export const Default: Story = {
	args: {
		region: mockRegions.osaka,
	},
};

export const Kyoto: Story = {
	args: {
		region: mockRegions.kyoto,
	},
};

export const Tokyo: Story = {
	args: {
		region: mockRegions.tokyo,
	},
};

export const SnowyWeather: Story = {
	args: {
		region: {
			...mockRegions.kyoto,
			regionBackgroundMedia:
				"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
			regionWeatherInfo: {
				weatherName: "Snow",
				temperatureCelsius: -2,
				weatherDesc: "Heavy snowfall with strong winds",
				regionName: "Kyoto",
			},
		} as ModelRouteResponseDto,
	},
};

export const StormyWeather: Story = {
	args: {
		region: {
			...mockRegions.tokyo,
			regionBackgroundMedia:
				"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop",
			regionWeatherInfo: {
				weatherName: "Thunderstorm",
				temperatureCelsius: 24,
				weatherDesc: "Heavy thunderstorm with lightning",
				regionName: "Tokyo",
			},
		} as ModelRouteResponseDto,
	},
};

export const LongDescription: Story = {
	args: {
		region: {
			...mockRegions.osaka,
			regionDesc:
				"Known for its incredibly vibrant food scene featuring world-famous takoyaki and okonomiyaki, historic castles that tell tales of ancient samurai, traditional merchant culture that shaped modern commerce, and bustling entertainment districts that never sleep",
		} as ModelRouteResponseDto,
	},
};

export const ShortRegionName: Story = {
	args: {
		region: {
			...mockRegions.osaka,
			region: "Nara",
			regionDesc:
				"Ancient capital famous for its free-roaming deer and historic temples",
			regionWeatherInfo: {
				...mockRegions.osaka?.regionWeatherInfo,
				regionName: "Nara",
			},
		} as ModelRouteResponseDto,
	},
};

export const LongRegionName: Story = {
	args: {
		region: {
			...mockRegions.kyoto,
			region: "Kanagawa Prefecture",
			regionDesc:
				"Coastal prefecture featuring hot springs, mountain views of Mount Fuji, and historic Kamakura",
			regionWeatherInfo: {
				...mockRegions.kyoto?.regionWeatherInfo,
				regionName: "Kanagawa Prefecture",
			},
		} as ModelRouteResponseDto,
	},
};

export const NoBackgroundImage: Story = {
	args: {
		region: {
			...mockRegions.osaka,
			regionBackgroundMedia: "",
		} as ModelRouteResponseDto,
	},
};

export const UndefinedRegion: Story = {
	args: {
		region: undefined,
	},
};

export const HighTemperature: Story = {
	args: {
		region: {
			...mockRegions.osaka,
			regionBackgroundMedia:
				"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
			regionWeatherInfo: {
				weatherName: "Clear",
				temperatureCelsius: 42,
				weatherDesc: "Extremely hot and sunny",
				regionName: "Osaka",
			},
		} as ModelRouteResponseDto,
	},
};

export const FoggyWeather: Story = {
	args: {
		region: {
			...mockRegions.tokyo,
			regionBackgroundMedia:
				"https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&h=1080&fit=crop",
			regionWeatherInfo: {
				weatherName: "Fog",
				temperatureCelsius: 16,
				weatherDesc: "Dense fog with low visibility",
				regionName: "Tokyo",
			},
		} as ModelRouteResponseDto,
	},
};
