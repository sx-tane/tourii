import type { Meta, StoryObj } from "@storybook/react";
import LocationInfoPanel from "./location-info-panel";
import type { TouristSpotResponseDto } from "@/api/generated";

const meta: Meta<typeof LocationInfoPanel> = {
	title: "Model Route/RouteDetailPage/ModelRouteMapWrapper/LocationInfoPanel",
	component: LocationInfoPanel,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
		},
	},
	tags: ["autodocs"],
	argTypes: {
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
	},
};

export default meta;
type Story = StoryObj<typeof LocationInfoPanel>;

// Mock tourist spot data
const mockTouristSpot: TouristSpotResponseDto = {
	touristSpotId: "spot-1",
	storyChapterId: "chapter-1",
	touristSpotName: "Senso-ji Temple",
	touristSpotDesc: "Ancient Buddhist temple in Asakusa district",
	bestVisitTime: "Early morning",
	address: "2-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan",
	touristSpotLatitude: 35.7148,
	touristSpotLongitude: 139.7967,
	touristSpotHashtag: ["temple", "historic", "cultural", "traditional"],
	weatherInfo: {
		temperatureCelsius: 22,
		weatherName: "Sunny",
		weatherDesc: "Clear sky with light breeze",
	},
};

export const Default: Story = {
	args: {
		selectedSpot: mockTouristSpot,
	},
};

export const NoSelection: Story = {
	args: {
		selectedSpot: undefined,
	},
};

export const WithoutWeather: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			weatherInfo: undefined,
		},
	},
};

export const WithoutBestTime: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			bestVisitTime: "",
		},
	},
};

export const WithLongAddress: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			address:
				"Very long address that might wrap to multiple lines in Tokyo, Japan, Asia",
		},
	},
};

export const WithManyHashtags: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			touristSpotHashtag: [
				"temple",
				"historic",
				"cultural",
				"traditional",
				"peaceful",
				"spiritual",
				"architecture",
				"ancient",
			],
		},
	},
};
