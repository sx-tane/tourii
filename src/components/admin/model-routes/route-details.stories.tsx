import type { Meta, StoryObj } from "@storybook/react";
import { RouteDetails } from "./route-details";
import type { ModelRouteResponseDto } from "@/api/generated";

const meta: Meta<typeof RouteDetails> = {
	title: "Admin/Model Routes/RouteDetails",
	component: RouteDetails,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockRoute: ModelRouteResponseDto = {
	modelRouteId: "route-123",
	storyId: "story-456",
	routeName: "Historic Kyoto Trail",
	region: "Kyoto",
	regionDesc: "Explore the ancient temples and traditional districts of Kyoto",
	regionBackgroundMedia: "https://example.com/kyoto-background.jpg",
	regionLatitude: 35.0116,
	regionLongitude: 135.7681,
	regionWeatherInfo: {
		temperatureCelsius: 22,
		weatherName: "Partly Cloudy",
		weatherDesc: "A pleasant day with partial cloud coverage",
		regionName: "Kyoto",
	},
	recommendation: [
		"Visit during cherry blossom season",
		"Try traditional kaiseki cuisine",
		"Wear comfortable walking shoes",
		"Visit early morning to avoid crowds",
	],
	touristSpotList: [
		{
			touristSpotId: "spot-1",
			storyChapterId: "chapter-1",
			touristSpotName: "Kiyomizu-dera Temple",
			touristSpotDesc: "Historic wooden temple",
			bestVisitTime: "Early morning",
			address: "1-294 Kiyomizu, Higashiyama Ward, Kyoto",
			touristSpotLatitude: 34.9949,
			touristSpotLongitude: 135.7849,
			touristSpotHashtag: ["temple", "historic"],
		},
		{
			touristSpotId: "spot-2",
			storyChapterId: "chapter-2",
			touristSpotName: "Fushimi Inari Shrine",
			touristSpotDesc: "Famous shrine with thousands of torii gates",
			bestVisitTime: "Dawn or dusk",
			address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto",
			touristSpotLatitude: 34.9671,
			touristSpotLongitude: 135.7727,
			touristSpotHashtag: ["shrine", "torii"],
		},
		{
			touristSpotId: "spot-3",
			storyChapterId: "chapter-3",
			touristSpotName: "Arashiyama Bamboo Grove",
			touristSpotDesc: "Enchanting bamboo forest walkway",
			bestVisitTime: "Morning",
			address: "Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto",
			touristSpotLatitude: 35.0170,
			touristSpotLongitude: 135.6709,
			touristSpotHashtag: ["bamboo", "nature"],
		},
	],
	insDateTime: "2024-01-15T10:30:00Z",
	updDateTime: "2024-01-20T14:45:00Z",
};

export const Default: Story = {
	args: {
		route: mockRoute,
	},
};

export const MinimalData: Story = {
	args: {
		route: {
			modelRouteId: "route-minimal",
			storyId: "story-minimal",
			routeName: "Simple Route",
			region: "Tokyo",
			regionDesc: "",
			regionBackgroundMedia: "",
			recommendation: [],
			touristSpotList: [],
		},
	},
};

export const NoLocation: Story = {
	args: {
		route: {
			...mockRoute,
			regionLatitude: undefined,
			regionLongitude: undefined,
			regionWeatherInfo: undefined,
		},
	},
};