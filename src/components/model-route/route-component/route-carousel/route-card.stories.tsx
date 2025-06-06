import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import type { Meta, StoryObj } from "@storybook/react";
import RouteCard from "./route-card";

// Mock route data for testing
const mockRoute: ModelRouteResponseDto = {
	modelRouteId: "route-1",
	storyId: "story-1",
	routeName: "Kyoto Historical Tour",
	region: "Kyoto",
	regionDesc:
		"Explore the ancient capital of Japan with its stunning temples, traditional architecture, and rich cultural heritage.",
	recommendation: [
		"Bring comfortable walking shoes",
		"Visit during early morning for best experience",
		"Don't forget your camera",
	],
	regionLatitude: 33.2382,
	regionLongitude: 131.6126,
	regionBackgroundMedia:
		"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop",
	touristSpotList: [
		{
			touristSpotId: "spot-1",
			storyChapterId: "chapter-1",
			touristSpotName: "Fushimi Inari Shrine",
			touristSpotDesc:
				"Famous shrine with thousands of red torii gates winding up the mountainside.",
			bestVisitTime: "Early morning (6AM - 8AM)",
			address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto",
			touristSpotLatitude: 34.9671,
			touristSpotLongitude: 135.7727,
			touristSpotHashtag: ["#shrine", "#torii", "#mountain"],
			storyChapterLink: "https://example.com/chapter/1",
			imageSet: {
				main: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1920&h=1080&fit=crop",
				small: [
					"https://picsum.photos/200/150?random=shrine1",
					"https://picsum.photos/200/150?random=shrine2",
				],
			},
			weatherInfo: {
				temperatureCelsius: 18,
				weatherName: "cloudy",
				weatherDesc: "cloudy with light rain",
			},
			delFlag: false,
			insUserId: "user-1",
			insDateTime: "2024-01-01T00:00:00Z",
			updUserId: "user-1",
			updDateTime: "2024-01-01T00:00:00Z",
		},
		{
			touristSpotId: "spot-2",
			storyChapterId: "chapter-2",
			touristSpotName: "Kiyomizu-dera Temple",
			touristSpotDesc:
				"Historic wooden temple offering panoramic views of Kyoto.",
			bestVisitTime: "Sunset (5PM - 7PM)",
			address: "1 Kiyomizu, Higashiyama Ward, Kyoto",
			touristSpotLatitude: 34.9949,
			touristSpotLongitude: 135.7851,
			touristSpotHashtag: ["#temple", "#views", "#historic"],
			storyChapterLink: "https://example.com/chapter/2",
			imageSet: {
				main: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&h=1080&fit=crop",
				small: [
					"https://picsum.photos/200/150?random=temple1",
					"https://picsum.photos/200/150?random=temple2",
				],
			},
			weatherInfo: {
				temperatureCelsius: 19,
				weatherName: "partly cloudy",
				weatherDesc: "partly cloudy with gentle breeze",
			},
			delFlag: false,
			insUserId: "user-1",
			insDateTime: "2024-01-01T00:00:00Z",
			updUserId: "user-1",
			updDateTime: "2024-01-01T00:00:00Z",
		},
	],
	regionWeatherInfo: {
		temperatureCelsius: 18,
		weatherName: "cloudy",
		weatherDesc: "cloudy with clear skies",
		regionName: "Kyoto",
	},
	delFlag: false,
	insUserId: "user-1",
	insDateTime: "2024-01-01T00:00:00Z",
	updUserId: "user-1",
	updDateTime: "2024-01-01T00:00:00Z",
};

const mockRouteWithVideo: ModelRouteResponseDto = {
	...mockRoute,
	modelRouteId: "route-2",
	routeName: "Tokyo Modern Adventure",
	region: "Tokyo",
	regionDesc:
		"Discover the bustling metropolis where tradition meets innovation.",
	regionBackgroundMedia:
		"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
	regionWeatherInfo: {
		temperatureCelsius: 25,
		weatherName: "sunny",
		weatherDesc: "sunny with clear skies",
		regionName: "Tokyo",
	},
};

const mockRouteWithLongContent: ModelRouteResponseDto = {
	...mockRoute,
	modelRouteId: "route-3",
	routeName:
		"Super Long Route Name That Tests Text Overflow And Layout Behavior In Component Design",
	region: "Very Long Region Name That Should Test Overflow",
	regionDesc:
		"This is an extremely long description that tests how the component handles large amounts of text content. It should demonstrate proper text clipping, layout preservation, and responsive behavior across different screen sizes. The description continues to provide comprehensive details about the region, its history, culture, attractions, and visitor information that visitors need to know before embarking on their journey.",
	regionWeatherInfo: {
		temperatureCelsius: -5,
		weatherName: "heavy snow",
		weatherDesc: "heavy snow with strong winds",
		regionName: "Very Long Region Name That Should Test Overflow",
	},
};

const meta = {
	title: "Model Route/RoutePage/RouteCard",
	component: RouteCard,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	tags: ["autodocs"],
	argTypes: {
		route: {
			description: "Route data to display in the card",
		},
		routeIndex: {
			description: "Index of the route for displaying model route number",
			control: "number",
		},
		isExpanded: {
			description: "Whether the card is in expanded state",
			control: "boolean",
		},

		className: {
			description: "Additional CSS classes for the card",
			control: "text",
		},
	},
} satisfies Meta<typeof RouteCard>;

export default meta;
type ComponentStory = StoryObj<typeof RouteCard>;

export const Default: ComponentStory = {
	args: {
		route: mockRoute,
		routeIndex: 0,
	},
	parameters: {
		docs: {
			description: {
				story: "Default route card with image background and route number #01",
			},
		},
	},
};

export const Expanded: ComponentStory = {
	args: {
		route: mockRoute,
		routeIndex: 0,
		isExpanded: true,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Route card in expanded state - note that the expansion now happens at the container level, not the card itself. The card indicates it's expanded but maintains its size.",
			},
		},
	},
};

export const WithVideoBackground: ComponentStory = {
	args: {
		route: mockRouteWithVideo,
		routeIndex: 1,
	},
	parameters: {
		docs: {
			description: {
				story: "Route card with video background media showing #02",
			},
		},
	},
};

export const LongContent: ComponentStory = {
	args: {
		route: mockRouteWithLongContent,
		routeIndex: 2,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Route card with long content to test text overflow and layout showing #03",
			},
		},
	},
};

export const ExpandedLongContent: ComponentStory = {
	args: {
		route: mockRouteWithLongContent,
		routeIndex: 2,
		isExpanded: true,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Route card with expanded state and long content - the card shows expanded indicator but maintains consistent sizing.",
			},
		},
	},
};

export const WithCustomClass: ComponentStory = {
	args: {
		route: mockRoute,
		routeIndex: 3,
		className: "border-4 border-blue-500 shadow-2xl",
	},
	parameters: {
		docs: {
			description: {
				story: "Route card with custom styling classes showing #04",
			},
		},
	},
};

export const OnDarkBackground: ComponentStory = {
	args: {
		route: mockRoute,
		routeIndex: 4,
	},
	parameters: {
		backgrounds: { default: "dark" },
		docs: {
			description: {
				story: "Route card displayed on dark background showing #05",
			},
		},
	},
};

export const Mobile: ComponentStory = {
	args: {
		route: mockRoute,
		routeIndex: 5,
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
		docs: {
			description: {
				story: "Mobile responsive view of the route card showing #06",
			},
		},
	},
};

export const Interactive: ComponentStory = {
	args: {
		route: mockRoute,
		routeIndex: 6,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Interactive route card - click to test expand/collapse callbacks. The card itself doesn't change size but triggers container-level expansion.",
			},
		},
	},
};

export const ColdWeather: ComponentStory = {
	args: {
		route: {
			...mockRoute,
			regionWeatherInfo: {
				temperatureCelsius: -10,
				weatherName: "snow",
				weatherDesc: "heavy snowfall",
				regionName: "Hokkaido",
			},
		},
		routeIndex: 7,
	},
	parameters: {
		docs: {
			description: {
				story: "Route card with cold weather conditions showing #08",
			},
		},
	},
};

export const HotWeather: ComponentStory = {
	args: {
		route: {
			...mockRoute,
			regionWeatherInfo: {
				temperatureCelsius: 40,
				weatherName: "sunny",
				weatherDesc: "extremely hot",
				regionName: "Okinawa",
			},
		},
		routeIndex: 8,
	},
	parameters: {
		docs: {
			description: {
				story: "Route card with hot weather conditions showing #09",
			},
		},
	},
};
