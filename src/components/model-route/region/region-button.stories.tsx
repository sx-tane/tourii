import type { Meta, StoryObj } from "@storybook/react";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import RegionButton from "./region-button";

// Mock data for different region scenarios
const mockRegions: { [key: string]: ModelRouteResponseDto } = {
	osaka: {
		modelRouteId: "osaka-route-1",
		storyId: "osaka-story-1",
		routeName: "Osaka Cultural Route",
		region: "Osaka",
		regionDesc: "Known for its vibrant food scene and historic castles",
		recommendation: ["Visit Osaka Castle", "Try takoyaki"],
		regionLatitude: 34.6937,
		regionLongitude: 135.5023,
		regionBackgroundMedia: "/images/osaka.jpg",
		touristSpotList: [],
		regionWeatherInfo: {
			weatherName: "Clear",
			temperatureCelsius: 25,
			weatherDesc: "Clear sky",
			regionName: "Osaka",
		},
	},
	kyoto: {
		modelRouteId: "kyoto-route-1",
		storyId: "kyoto-story-1",
		routeName: "Kyoto Heritage Route",
		region: "Kyoto",
		regionDesc: "Ancient capital filled with temples and traditional culture",
		recommendation: ["Visit Fushimi Inari", "Experience tea ceremony"],
		regionLatitude: 35.0116,
		regionLongitude: 135.7681,
		regionBackgroundMedia: "/images/kyoto.jpg",
		touristSpotList: [],
		regionWeatherInfo: {
			weatherName: "Clouds",
			temperatureCelsius: 22,
			weatherDesc: "Partly cloudy",
			regionName: "Kyoto",
		},
	},
	tokyo: {
		modelRouteId: "tokyo-route-1",
		storyId: "tokyo-story-1",
		routeName: "Tokyo Modern Route",
		region: "Tokyo",
		regionDesc: "Modern metropolis blending technology and tradition",
		recommendation: ["Visit Tokyo Skytree", "Explore Shibuya"],
		regionLatitude: 35.6762,
		regionLongitude: 139.6503,
		regionBackgroundMedia: "/images/tokyo.jpg",
		touristSpotList: [],
		regionWeatherInfo: {
			weatherName: "Rain",
			temperatureCelsius: 18,
			weatherDesc: "Light rain",
			regionName: "Tokyo",
		},
	},
};

const meta: Meta<typeof RegionButton> = {
	title: "Model Route/Region/RegionButton",
	component: RegionButton,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
		docs: {
			description: {
				component:
					"Region button component that provides navigation to explore a specific region. Uses the ActionButton component with a Link wrapper for routing.",
			},
		},
	},
	argTypes: {
		region: {
			control: "object",
			description:
				"Region data object containing region name and other metadata",
		},
	},
	decorators: [
		(Story) => (
			<div style={{ padding: "20px" }}>
				<Story />
			</div>
		),
	],
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RegionButton>;

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

export const UndefinedRegion: Story = {
	args: {
		region: undefined,
	},
};

export const LongRegionName: Story = {
	args: {
		region: {
			modelRouteId: "kanagawa-route-1",
			storyId: "kanagawa-story-1",
			routeName: "Kanagawa Cultural Route",
			region: "Kanagawa Prefecture",
			regionDesc:
				"Coastal prefecture known for its hot springs and Mount Fuji views",
			recommendation: ["Visit Kamakura", "Relax in Hakone"],
			regionLatitude: 35.4437,
			regionLongitude: 139.638,
			regionBackgroundMedia: "/images/kanagawa.jpg",
			touristSpotList: [],
			regionWeatherInfo: {
				weatherName: "Clear",
				temperatureCelsius: 23,
				weatherDesc: "Clear sky",
				regionName: "Kanagawa Prefecture",
			},
		},
	},
};

export const SpecialCharacters: Story = {
	args: {
		region: {
			modelRouteId: "tokyo-special-route-1",
			storyId: "tokyo-special-story-1",
			routeName: "Tōkyō Heritage Route",
			region: "Tōkyō-to",
			regionDesc: "Capital city with special character names",
			recommendation: ["Visit Imperial Palace", "Experience Harajuku"],
			regionLatitude: 35.6762,
			regionLongitude: 139.6503,
			regionBackgroundMedia: "/images/tokyo-special.jpg",
			touristSpotList: [],
			regionWeatherInfo: {
				weatherName: "Clouds",
				temperatureCelsius: 21,
				weatherDesc: "Partly cloudy",
				regionName: "Tōkyō-to",
			},
		},
	},
};
