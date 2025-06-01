import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import type { Meta, StoryObj } from "@storybook/react";
import RouteCarousel from "./route-carousel";

// Mock data for testing
const createMockRoute = (
	id: string,
	routeName: string,
	region: string,
	regionDesc: string,
	backgroundMedia: string,
	temperature = 22,
	weatherDesc = "sunny",
	spotCount = 3,
): ModelRouteResponseDto => ({
	modelRouteId: id,
	storyId: "story-1",
	routeName,
	region,
	regionDesc,
	recommendation: [
		"Bring comfortable walking shoes",
		"Visit during early morning for best experience",
		"Don't forget your camera",
	],
	regionLatitude: 33.2382,
	regionLongitude: 131.6126,
	regionBackgroundMedia: backgroundMedia,
	touristSpotList: Array.from({ length: spotCount }, (_, index) => ({
		touristSpotId: `spot-${id}-${index + 1}`,
		storyChapterId: `chapter-${id}-${index + 1}`,
		touristSpotName: `Tourist Spot ${index + 1}`,
		touristSpotDesc:
			"A beautiful location with rich history and culture. This spot offers amazing views and unforgettable experiences for visitors of all ages.",
		bestVisitTime: "Morning (9AM - 11AM)",
		address: `123 Tourist Street, ${region}`,
		touristSpotLatitude: 33.2382 + index * 0.01,
		touristSpotLongitude: 131.6126 + index * 0.01,
		touristSpotHashtag: ["#scenic", "#culture", "#history"],
		storyChapterLink: `https://example.com/chapter/${id}-${index + 1}`,
		imageSet: {
			main: `https://picsum.photos/400/300?random=${id}-${index + 1}`,
			small: [
				`https://picsum.photos/200/150?random=${id}-${index + 1}-1`,
				`https://picsum.photos/200/150?random=${id}-${index + 1}-2`,
			],
		},
		weatherInfo: {
			temperatureCelsius: temperature + index,
			weatherName: weatherDesc,
			weatherDesc: `${weatherDesc} with light clouds`,
		},
		delFlag: false,
		insUserId: "user-1",
		insDateTime: "2024-01-01T00:00:00Z",
		updUserId: "user-1",
		updDateTime: "2024-01-01T00:00:00Z",
	})),
	regionWeatherInfo: {
		temperatureCelsius: temperature,
		weatherName: weatherDesc,
		weatherDesc: `${weatherDesc} with clear skies`,
		regionName: region,
	},
	delFlag: false,
	insUserId: "user-1",
	insDateTime: "2024-01-01T00:00:00Z",
	updUserId: "user-1",
	updDateTime: "2024-01-01T00:00:00Z",
});

// Mock routes for different scenarios
const singleRoute = [
	createMockRoute(
		"route-1",
		"Kyoto Historical Tour",
		"Kyoto",
		"Explore the ancient capital of Japan with its stunning temples, traditional architecture, and rich cultural heritage.",
		"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop",
		18,
		"cloudy",
		5,
	),
];

const multipleRoutes = [
	createMockRoute(
		"route-1",
		"Kyoto Historical Tour",
		"Kyoto",
		"Explore the ancient capital of Japan with its stunning temples, traditional architecture, and rich cultural heritage.",
		"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop",
		18,
		"cloudy",
		5,
	),
	createMockRoute(
		"route-2",
		"Tokyo Modern Adventure",
		"Tokyo",
		"Discover the bustling metropolis where tradition meets innovation. Experience cutting-edge technology alongside ancient shrines.",
		"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
		25,
		"sunny",
		8,
	),
	createMockRoute(
		"route-3",
		"Osaka Food Journey",
		"Osaka",
		"Immerse yourself in Japan's kitchen with incredible street food, local specialties, and vibrant food culture.",
		"https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=600&fit=crop",
		22,
		"partly cloudy",
		4,
	),
	createMockRoute(
		"route-4",
		"Hiroshima Peace Route",
		"Hiroshima",
		"A meaningful journey through history and remembrance, featuring peace memorials and beautiful island scenery.",
		"https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop",
		20,
		"rainy",
		3,
	),
	createMockRoute(
		"route-5",
		"Mount Fuji Adventure",
		"Fuji",
		"Experience Japan's most iconic mountain with breathtaking views, hiking trails, and spiritual significance.",
		"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
		15,
		"clear",
		6,
	),
];

const routeWithLongContent: ModelRouteResponseDto[] = [
	{
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		...multipleRoutes[0]!,
		routeName:
			"Super Long Route Name That Tests Text Overflow And Layout Behavior",
		regionDesc:
			"This is an extremely long description that tests how the component handles large amounts of text content. It should demonstrate proper text clipping, layout preservation, and responsive behavior across different screen sizes. The description continues to provide comprehensive details about the region, its history, culture, attractions, and visitor information.",
		recommendation: [
			"This is a very long recommendation that tests text wrapping and display",
			"Another lengthy recommendation with detailed instructions and multiple clauses",
			"Short rec",
			"Medium length recommendation with some detail",
			"Final recommendation with comprehensive guidance for visitors",
		],
	},
];

const emptyRoutes: ModelRouteResponseDto[] = [];

const meta = {
	title: "Model Route/RouteCarousel",
	component: RouteCarousel,
	parameters: {
		layout: "fullscreen",
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
		routes: {
			description: "Array of route data to display in the carousel",
		},
		className: {
			description: "Additional CSS classes for the carousel container",
			control: "text",
		},
	},
} satisfies Meta<typeof RouteCarousel>;

export default meta;
type ComponentStory = StoryObj<typeof RouteCarousel>;

export const SingleRoute: ComponentStory = {
	args: {
		routes: singleRoute,
	},
	parameters: {
		docs: {
			description: {
				story: "Single route display - navigation arrows should be hidden",
			},
		},
	},
};

export const MultipleRoutes: ComponentStory = {
	args: {
		routes: multipleRoutes,
	},
	parameters: {
		docs: {
			description: {
				story: "Multiple routes with full navigation functionality",
			},
		},
	},
};

export const LongContent: ComponentStory = {
	args: {
		routes: routeWithLongContent,
	},
	parameters: {
		docs: {
			description: {
				story: "Route with long text content to test text overflow and layout",
			},
		},
	},
};

export const EmptyState: ComponentStory = {
	args: {
		routes: emptyRoutes,
	},
	parameters: {
		docs: {
			description: {
				story: "Empty state when no routes are available",
			},
		},
	},
};

export const CustomClassName: ComponentStory = {
	args: {
		routes: multipleRoutes,
		className: "bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg",
	},
	parameters: {
		docs: {
			description: {
				story: "Carousel with custom styling classes applied",
			},
		},
	},
};

export const OnDarkBackground: ComponentStory = {
	args: {
		routes: multipleRoutes,
	},
	parameters: {
		backgrounds: { default: "dark" },
		docs: {
			description: {
				story: "Carousel displayed on dark background",
			},
		},
	},
};

export const Mobile: ComponentStory = {
	args: {
		routes: multipleRoutes,
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
		docs: {
			description: {
				story: "Mobile responsive view of the carousel",
			},
		},
	},
};

export const Tablet: ComponentStory = {
	args: {
		routes: multipleRoutes,
	},
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
		docs: {
			description: {
				story: "Tablet responsive view of the carousel",
			},
		},
	},
};

// Interactive story for testing expand/collapse functionality
export const InteractiveTest: ComponentStory = {
	args: {
		routes: multipleRoutes,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Interactive story for testing the new expansion behavior. Click on route cards to see them expand behind the carousel with a full background, while the carousel stays visible above it. The container height increases and shows detailed route information.",
			},
		},
	},
	play: async ({ canvasElement }) => {
		// You can add interaction testing here if needed
		// This would require @storybook/addon-interactions
	},
};
