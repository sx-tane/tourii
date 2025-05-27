import type { Meta, StoryObj } from "@storybook/react";
import Region, { type RegionProps } from "./region";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";

const mockModelRoute: ModelRouteResponseDto = {
	modelRouteId: "yosemite-valley-123",
	storyId: "story-abc",
	routeName: "Yosemite Valley Adventure",
	region: "Yosemite Valley, CA",
	recommendation: ["Hiking", "Photography"],
	regionLatitude: 37.745,
	regionLongitude: -119.5937,
	regionBackgroundMedia:
		"https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1000&auto=format&fit=crop", // Example image
	touristSpotList: [
		{
			touristSpotId: "spot-1",
			storyChapterId: "chapter-1",
			touristSpotName: "Sentinel Dome",
			touristSpotDesc: "Iconic granite dome offering panoramic views.",
			bestVisitTime: "Sunset",
			address: "Sentinel Dome, Yosemite Valley, CA",
			touristSpotLatitude: 37.7385,
			touristSpotLongitude: -119.5853,
			touristSpotHashtag: ["hiking", "views"],
			imageSet: {
				main: "https://example.com/sentinel_main.jpg",
				small: ["https://example.com/sentinel_small1.jpg"],
			},
			weatherInfo: {
				temperatureCelsius: 15,
				weatherName: "Partly Cloudy",
				weatherDesc: "Pleasant weather for hiking.",
			},
		},
	],
	regionWeatherInfo: {
		temperatureCelsius: 27,
		weatherName: "Sunny",
		weatherDesc: "Clear skies, perfect for outdoor activities.",
	},
	// Add other required fields if any, or mark them as optional in DTO if applicable
};

const meta = {
	title: "Components/Region/Region",
	component: Region,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		// You can define argTypes for specific props of ModelRouteResponseDto if needed
	},
} satisfies Meta<typeof Region>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: mockModelRoute,
};
