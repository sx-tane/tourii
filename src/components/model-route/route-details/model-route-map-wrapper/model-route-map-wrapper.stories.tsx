import type { Meta, StoryObj } from "@storybook/react";
import ModelRouteMapWrapper from "./model-route-map-wrapper";
import type { ModelRouteResponseDto } from "@/api/generated";

const meta: Meta<typeof ModelRouteMapWrapper> = {
	title:
		"Model Route/RouteDetailPage/ModelRouteMapWrapper/ModelRouteMapWrapper",
	component: ModelRouteMapWrapper,
	parameters: {
		layout: "fullscreen",
		docs: {
			story: {
				inline: false,
				iframeHeight: 600,
			},
		},
	},
	decorators: [
		(Story) => (
			<div style={{ height: "600px", width: "100%" }}>
				<Story />
			</div>
		),
	],
	tags: ["autodocs"],
	argTypes: {
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
	},
};

export default meta;
type Story = StoryObj<typeof ModelRouteMapWrapper>;

// Mock data
const mockModelRoute: ModelRouteResponseDto = {
	modelRouteId: "route-1",
	storyId: "story-1",
	routeName: "Tokyo Heritage Trail",
	region: "Tokyo",
	regionDesc:
		"Explore the ancient temples and traditional neighborhoods of Tokyo",
	recommendation: [
		"Visit early morning",
		"Bring comfortable shoes",
		"Try local street food",
	],
	regionLatitude: 35.6762,
	regionLongitude: 139.6503,
	regionBackgroundMedia:
		"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
	touristSpotList: [
		{
			touristSpotId: "spot-1",
			storyChapterId: "chapter-1",
			touristSpotName: "Senso-ji Temple",
			touristSpotDesc: "Ancient Buddhist temple in Asakusa",
			bestVisitTime: "Early morning",
			address: "2-3-1 Asakusa, Taito City, Tokyo",
			touristSpotLatitude: 35.7148,
			touristSpotLongitude: 139.7967,
			touristSpotHashtag: ["temple", "historic", "cultural"],
			imageSet: {
				main: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
				small: [
					"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
					"https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
				],
			},
			weatherInfo: {
				temperatureCelsius: 22,
				weatherName: "Sunny",
				weatherDesc: "Clear sky",
			},
		},
		{
			touristSpotId: "spot-2",
			storyChapterId: "chapter-1",
			touristSpotName: "Meiji Shrine",
			touristSpotDesc: "Shinto shrine dedicated to Emperor Meiji",
			bestVisitTime: "Morning",
			address: "1-1 Yoyogikamizonocho, Shibuya City, Tokyo",
			touristSpotLatitude: 35.6764,
			touristSpotLongitude: 139.6993,
			touristSpotHashtag: ["shrine", "peaceful", "nature"],
			imageSet: {
				main: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop",
				small: [
					"https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
				],
			},
			weatherInfo: {
				temperatureCelsius: 22,
				weatherName: "Sunny",
				weatherDesc: "Clear sky",
			},
		},
		{
			touristSpotId: "spot-3",
			storyChapterId: "chapter-1",
			touristSpotName: "Tokyo Skytree",
			touristSpotDesc: "Iconic broadcasting tower and observation deck",
			bestVisitTime: "Evening",
			address: "1-1-2 Oshiage, Sumida City, Tokyo",
			touristSpotLatitude: 35.7101,
			touristSpotLongitude: 139.8107,
			touristSpotHashtag: ["modern", "view", "landmark"],
			imageSet: {
				main: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=600&fit=crop",
				small: [
					"https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=300&fit=crop",
				],
			},
			weatherInfo: {
				temperatureCelsius: 22,
				weatherName: "Sunny",
				weatherDesc: "Clear sky",
			},
		},
	],
	regionWeatherInfo: {
		temperatureCelsius: 22,
		weatherName: "Sunny",
		weatherDesc: "Clear sky with light breeze",
		regionName: "Tokyo",
	},
	delFlag: false,
	insUserId: "admin",
	insDateTime: "2024-01-01T00:00:00Z",
	updUserId: "admin",
	updDateTime: "2024-01-01T00:00:00Z",
	isAiGenerated: false,
};

export const Default: Story = {
	args: {
		modelRoute: mockModelRoute,
	},
};

export const WithCustomClass: Story = {
	args: {
		modelRoute: mockModelRoute,
		className: "shadow-2xl",
	},
};

export const SingleSpot: Story = {
	args: {
		modelRoute: {
			...mockModelRoute,
			touristSpotList: mockModelRoute.touristSpotList.slice(0, 1),
		},
	},
};
