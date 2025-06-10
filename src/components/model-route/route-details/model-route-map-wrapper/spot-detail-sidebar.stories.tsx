import type { Meta, StoryObj } from "@storybook/react";
import SpotDetailSidebar from "./spot-detail-sidebar";
import type { TouristSpotResponseDto } from "@/api/generated";

const meta: Meta<typeof SpotDetailSidebar> = {
	title: "Model Route/RouteDetailPage/ModelRouteMapWrapper/SpotDetailSidebar",
	component: SpotDetailSidebar,
	parameters: {
		layout: "centered",
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
type Story = StoryObj<typeof SpotDetailSidebar>;

// Mock tourist spot data
const mockTouristSpot: TouristSpotResponseDto = {
	touristSpotId: "spot-1",
	storyChapterId: "chapter-1",
	touristSpotName: "Senso-ji Temple",
	touristSpotDesc:
		"Tokyo's oldest temple, Senso-ji, is a magnificent Buddhist temple located in Asakusa. Dating back to 628 AD, this ancient temple is dedicated to Kannon, the Buddhist goddess of mercy. The temple complex features beautiful traditional architecture, peaceful gardens, and the famous Thunder Gate entrance.",
	bestVisitTime: "Early morning (6:00-8:00 AM)",
	address: "2-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan",
	touristSpotLatitude: 35.7148,
	touristSpotLongitude: 139.7967,
	touristSpotHashtag: [
		"temple",
		"historic",
		"cultural",
		"traditional",
		"peaceful",
	],
	storyChapterLink: "/v2/stories/tokyo-saga/senso-ji-chapter",
	imageSet: {
		main: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
		small: [
			"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
			"https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
			"https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=400&h=300&fit=crop",
		],
	},
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

export const WithoutImage: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			imageSet: undefined,
		},
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

export const WithoutStoryLink: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			storyChapterLink: undefined,
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

export const MinimalContent: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			touristSpotDesc: "A simple temple.",
			touristSpotHashtag: ["temple"],
			imageSet: {
				main: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
				small: [],
			},
			weatherInfo: undefined,
			storyChapterLink: undefined,
			bestVisitTime: "",
		},
	},
};

export const LongContent: Story = {
	args: {
		selectedSpot: {
			...mockTouristSpot,
			touristSpotName:
				"Very Long Temple Name That Might Wrap to Multiple Lines",
			touristSpotDesc:
				"This is a very long description that demonstrates how the component handles extensive text content. The temple has a rich history spanning over 1400 years, with countless stories of pilgrims, monks, and visitors who have found peace and enlightenment within its sacred grounds. The architecture represents the finest examples of traditional Japanese Buddhist design, with intricate woodwork, beautiful paintings, and carefully maintained gardens that reflect the changing seasons.",
			address:
				"This is a very long address that might span multiple lines: 2-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan, Near the Sumida River",
			touristSpotHashtag: [
				"temple",
				"historic",
				"cultural",
				"traditional",
				"peaceful",
				"spiritual",
				"ancient",
				"architecture",
				"buddhist",
				"heritage",
			],
		},
	},
};
