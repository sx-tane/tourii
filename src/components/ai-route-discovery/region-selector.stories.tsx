import type { Meta, StoryObj } from "@storybook/react";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import RegionSelector from "./region-selector";

const meta: Meta<typeof RegionSelector> = {
	title: "AI Route Discovery/RegionSelector",
	component: RegionSelector,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: `
The RegionSelector component allows users to choose from available regions for AI-powered route discovery.

**Features:**
- Displays regions extracted from existing routes
- Shows route count per region
- Interactive selection with visual feedback
- Responsive grid layout
- Loading and empty states
- Background images for each region
				`,
			},
		},
	},
	argTypes: {
		onRegionSelect: { action: "region selected" },
		selectedRegion: { control: "text" },
		isLoading: { control: "boolean" },
	},
};

export default meta;
type Story = StoryObj<typeof RegionSelector>;

// Mock data for Storybook
const mockRoutes: ModelRouteResponseDto[] = [
	{
		modelRouteId: "1",
		storyId: "1",
		routeName: "Bungo-Ōno Heritage Trail",
		region: "Bungo-Ōno",
		regionDesc: "A historic city in Ōita Prefecture known for its traditional architecture and hot springs",
		recommendation: ["history", "culture", "hotspring"],
		regionLatitude: 32.9741,
		regionLongitude: 131.6088,
		regionBackgroundMedia: "/image/touriiverse/bungo-ono/chapter1.png",
		touristSpotList: [],
		regionWeatherInfo: {
			weatherName: "Clear",
			temperatureCelsius: 22.5,
			weatherDesc: "Sunny day",
			regionName: "Bungo-Ōno",
		},
		insDateTime: "2024-01-01T00:00:00Z",
		updDateTime: "2024-01-01T00:00:00Z",
		isAiGenerated: false,
	},
	{
		modelRouteId: "2",
		storyId: "2",
		routeName: "Aomori Cultural Journey",
		region: "Aomori",
		regionDesc: "Northern Japan's cultural hub with festivals, apples, and scenic coastlines",
		recommendation: ["culture", "festival", "nature"],
		regionLatitude: 40.8244,
		regionLongitude: 140.7400,
		regionBackgroundMedia: "/image/touriiverse/aomori.png",
		touristSpotList: [],
		regionWeatherInfo: {
			weatherName: "Cloudy",
			temperatureCelsius: 18.2,
			weatherDesc: "Partly cloudy",
			regionName: "Aomori",
		},
		insDateTime: "2024-01-01T00:00:00Z",
		updDateTime: "2024-01-01T00:00:00Z",
		isAiGenerated: false,
	},
	{
		modelRouteId: "3",
		storyId: "3",
		routeName: "Tochigi Adventure Route",
		region: "Tochigi",
		regionDesc: "Home to Nikko shrines, beautiful lakes, and mountain adventures",
		recommendation: ["nature", "shrine", "mountain"],
		regionLatitude: 36.5658,
		regionLongitude: 139.8836,
		regionBackgroundMedia: "/image/touriiverse/tochigi.png",
		touristSpotList: [],
		regionWeatherInfo: {
			weatherName: "Rain",
			temperatureCelsius: 20.1,
			weatherDesc: "Light rain",
			regionName: "Tochigi",
		},
		insDateTime: "2024-01-01T00:00:00Z",
		updDateTime: "2024-01-01T00:00:00Z",
		isAiGenerated: false,
	},
	{
		modelRouteId: "4",
		storyId: "4",
		routeName: "Another Bungo-Ōno Route",
		region: "Bungo-Ōno",
		regionDesc: "A historic city in Ōita Prefecture known for its traditional architecture and hot springs",
		recommendation: ["food", "temple", "nature"],
		regionLatitude: 32.9741,
		regionLongitude: 131.6088,
		regionBackgroundMedia: "/image/touriiverse/bungo-ono/chapter2.png",
		touristSpotList: [],
		regionWeatherInfo: {
			weatherName: "Clear",
			temperatureCelsius: 22.5,
			weatherDesc: "Sunny day",
			regionName: "Bungo-Ōno",
		},
		insDateTime: "2024-01-01T00:00:00Z",
		updDateTime: "2024-01-01T00:00:00Z",
		isAiGenerated: false,
	},
];

export const Default: Story = {
	args: {
		routes: mockRoutes,
		onRegionSelect: () => {},
	},
};

export const WithSelectedRegion: Story = {
	args: {
		routes: mockRoutes,
		selectedRegion: "Bungo-Ōno",
		onRegionSelect: () => {},
	},
};

export const Loading: Story = {
	args: {
		routes: [],
		isLoading: true,
		onRegionSelect: () => {},
	},
};

export const EmptyState: Story = {
	args: {
		routes: [],
		isLoading: false,
		onRegionSelect: () => {},
	},
};

export const SingleRegion: Story = {
	args: {
		routes: [mockRoutes[0]],
		onRegionSelect: () => {},
	},
};