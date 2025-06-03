"use client";

import type { Meta, StoryObj } from "@storybook/react";
import LocationInfo from "./location-info";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";

// Corrected mock route data based on ModelRouteResponseDto definition
const mockRoute: ModelRouteResponseDto = {
	modelRouteId: "route-123",
	storyId: "story-abc",
	routeName: "Enchanting Forest Trail",
	region: "Whispering Woods",
	regionDesc:
		"A serene forest region famed for its ancient trees and mystical atmosphere.",
	recommendation: ["Nature Walks", "Bird Watching", "Meditation"],
	regionLatitude: 34.0522,
	regionLongitude: -118.2437,
	regionBackgroundMedia:
		"https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",
	touristSpotList: [], // LocationInfo might not use this directly, but it's part of the DTO
	regionWeatherInfo: {
		temperatureCelsius: 18,
		weatherName: "Partly Cloudy",
		weatherDesc: "Pleasant with a cool breeze",
		regionName: "Whispering Woods Area",
	},
	// Optional fields from ModelRouteResponseDto
	delFlag: false,
	insUserId: "mockUser",
	insDateTime: "2023-01-15T10:00:00Z",
	updUserId: "mockUser",
	updDateTime: "2023-01-16T14:30:00Z",
};

const meta = {
	title: "Model Route/Route/Hero Section/LocationInfo",
	component: LocationInfo,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [
				{ name: "light", value: "#E3E3DC" },
				{ name: "dark", value: "#21211B" },
			],
		},
	},
	tags: ["autodocs"],
	argTypes: {
		route: {
			description: "The route data object conforming to ModelRouteResponseDto.",
			control: "object",
		},
		className: {
			description: "Additional CSS classes for the component.",
			control: "text",
		},
	},
} satisfies Meta<typeof LocationInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		route: mockRoute,
		className: "",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Default display of the LocationInfo component with complete mock data. Shows route name, region, weather, and recommendations.",
			},
		},
	},
};

export const OnLightBackground: Story = {
	args: {
		route: mockRoute,
		className: "",
	},
	parameters: {
		backgrounds: { default: "light" },
		docs: {
			description: {
				story:
					"LocationInfo component displayed on a light background to check text visibility and contrast.",
			},
		},
	},
};

export const MinimalData: Story = {
	args: {
		route: {
			...mockRoute,
			// regionWeatherInfo is required, so it cannot be undefined.
			// This story demonstrates the component with no recommendations.
			recommendation: [],
		},
		className: "",
	},
	parameters: {
		docs: {
			description: {
				story:
					"LocationInfo component with minimal recommendations. Weather information is still present as it is a required field.",
			},
		},
	},
};

export const LongRouteName: Story = {
	args: {
		route: {
			...mockRoute,
			routeName:
				"The Supremely Long, Incredibly Scenic, and Unforgettable Journey Through the Ancient Whispering Woods and Valleys Beyond Time Itself",
			region:
				"The Vast Expanse of the Mystical Whispering Woods and its Enchanted Surroundings",
		},
		className: "w-[600px]", // Constrain width to see wrapping
	},
	parameters: {
		docs: {
			description: {
				story:
					"LocationInfo component with a very long route name and region to test text wrapping and layout.",
			},
		},
	},
};
