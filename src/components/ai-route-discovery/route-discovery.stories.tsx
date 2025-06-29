import type { Meta, StoryObj } from "@storybook/react";
import type { AiRouteRecommendationResponseDto } from "@/api/generated/models/AiRouteRecommendationResponseDto";
import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import RouteDiscovery from "./route-discovery";

const meta: Meta<typeof RouteDiscovery> = {
	title: "AI Route Discovery/RouteDiscovery",
	component: RouteDiscovery,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: `
The RouteDiscovery component displays both AI-generated and existing routes based on user preferences.

**Features:**
- Unified display of AI and existing routes
- Route filtering by region
- Interactive route cards with images
- Performance metrics display
- Loading, error, and empty states
- Confidence scoring for AI routes
- Regeneration functionality
				`,
			},
		},
	},
	argTypes: {
		onRegenerate: { action: "regenerate requested" },
		isLoading: { control: "boolean" },
		error: { control: "text" },
		region: { control: "text" },
	},
};

export default meta;
type Story = StoryObj<typeof RouteDiscovery>;

// Mock existing routes
const mockExistingRoutes: ModelRouteResponseDto[] = [
	{
		modelRouteId: "existing-1",
		storyId: "1",
		routeName: "Historic Bungo-Ōno Heritage Trail",
		region: "Bungo-Ōno",
		regionDesc: "Explore traditional architecture and historic sites",
		recommendation: ["history", "culture", "traditional"],
		regionLatitude: 32.9741,
		regionLongitude: 131.6088,
		regionBackgroundMedia: "/image/touriiverse/bungo-ono/chapter1.png",
		touristSpotList: [
			{
				touristSpotId: "spot-1",
				touristSpotName: "Historic District",
				touristSpotDesc: "Traditional buildings",
				touristSpotLatitude: 32.9741,
				touristSpotLongitude: 131.6088,
				touristSpotHashtag: ["history", "traditional"],
				insDateTime: "2024-01-01T00:00:00Z",
				updDateTime: "2024-01-01T00:00:00Z",
				bestVisitTime: "Morning",
				address: "Historic District, Bungo-Ōno",
				storyChapterId: "1",
			},
		],
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
		modelRouteId: "existing-2", 
		storyId: "2",
		routeName: "Bungo-Ōno Hot Springs Circuit",
		region: "Bungo-Ōno",
		regionDesc: "Relax in natural hot springs and wellness spots",
		recommendation: ["hotspring", "wellness", "nature"],
		regionLatitude: 32.9741,
		regionLongitude: 131.6088,
		regionBackgroundMedia: "/image/touriiverse/bungo-ono/chapter2.png",
		touristSpotList: [
			{
				touristSpotId: "spot-2",
				touristSpotName: "Mountain Onsen",
				touristSpotDesc: "Natural hot springs",
				touristSpotLatitude: 32.9741,
				touristSpotLongitude: 131.6088,
				touristSpotHashtag: ["hotspring", "nature"],
				insDateTime: "2024-01-01T00:00:00Z",
				updDateTime: "2024-01-01T00:00:00Z",
				bestVisitTime: "Evening",
				address: "Mountain Onsen, Bungo-Ōno",
				storyChapterId: "2",
			},
		],
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

// Mock AI routes response
const mockAiRoutes: AiRouteRecommendationResponseDto = {
	generatedRoutes: [
		{
			modelRouteId: "ai-1",
			routeName: "Cultural Food Discovery Route",
			regionDesc: "AI-curated journey through traditional cuisine and cultural sites",
			recommendations: ["culture", "food", "traditional"],
			region: "Bungo-Ōno",
			regionLatitude: 32.9741,
			regionLongitude: 131.6088,
			estimatedDuration: "2-3 days",
			confidenceScore: 0.95,
			spotCount: 6,
			averageDistance: 2.5,
			touristSpots: [
				{
					touristSpotId: "ai-spot-1",
					touristSpotName: "Traditional Restaurant",
					touristSpotDesc: "Authentic local cuisine",
					latitude: 32.9741,
					longitude: 131.6088,
					touristSpotHashtag: ["food", "traditional"],
					matchedKeywords: ["culture", "food"],
				},
				{
					touristSpotId: "ai-spot-2",
					touristSpotName: "Cultural Center",
					touristSpotDesc: "Local arts and crafts",
					latitude: 32.9751,
					longitude: 131.6098,
					touristSpotHashtag: ["culture", "art"],
					matchedKeywords: ["culture"],
				},
			],
			metadata: {
				sourceKeywords: ["culture", "food"],
				generatedAt: "2024-01-01T12:00:00Z",
				algorithm: "clustering-v2",
				aiGenerated: true,
			},
		},
		{
			modelRouteId: "ai-2",
			routeName: "Mindful Nature & Culture Path",
			regionDesc: "Peaceful blend of natural beauty and cultural heritage",
			recommendations: ["culture", "nature", "peaceful"],
			region: "Bungo-Ōno",
			regionLatitude: 32.9741,
			regionLongitude: 131.6088,
			estimatedDuration: "1-2 days",
			confidenceScore: 0.87,
			spotCount: 4,
			averageDistance: 3.2,
			touristSpots: [
				{
					touristSpotId: "ai-spot-3",
					touristSpotName: "Mountain Temple",
					touristSpotDesc: "Serene temple in nature",
					latitude: 32.9761,
					longitude: 131.6078,
					touristSpotHashtag: ["culture", "temple", "nature"],
					matchedKeywords: ["culture", "nature"],
				},
			],
			metadata: {
				sourceKeywords: ["culture", "nature"],
				generatedAt: "2024-01-01T12:00:00Z",
				algorithm: "clustering-v2",
				aiGenerated: true,
			},
		},
	],
	summary: {
		totalSpotsFound: 25,
		clustersFormed: 3,
		routesGenerated: 2,
		processingTimeMs: 1250,
		aiAvailable: true,
	},
	message: "Successfully generated personalized routes",
};

export const Default: Story = {
	args: {
		aiRoutes: mockAiRoutes,
		existingRoutes: mockExistingRoutes,
		region: "Bungo-Ōno",
		selectedInterests: ["culture", "food"],
	},
};

export const OnlyAiRoutes: Story = {
	args: {
		aiRoutes: mockAiRoutes,
		existingRoutes: [],
		region: "Bungo-Ōno",
		selectedInterests: ["culture", "food"],
	},
};

export const OnlyExistingRoutes: Story = {
	args: {
		existingRoutes: mockExistingRoutes,
		region: "Bungo-Ōno",
		selectedInterests: ["culture", "food"],
	},
};

export const Loading: Story = {
	args: {
		isLoading: true,
		region: "Bungo-Ōno",
		selectedInterests: ["culture", "food", "nature"],
	},
};

export const Error: Story = {
	args: {
		error: "Unable to connect to AI service. Please check your internet connection and try again.",
		region: "Bungo-Ōno",
		selectedInterests: ["culture", "food"],
	},
};

export const EmptyResults: Story = {
	args: {
		region: "Remote Area",
		selectedInterests: ["very-specific-interest"],
		existingRoutes: [],
	},
};

export const ManyRoutes: Story = {
	args: {
		aiRoutes: {
			...mockAiRoutes,
			generatedRoutes: [
				...mockAiRoutes.generatedRoutes,
				{
					modelRouteId: "ai-3",
					routeName: "Adventure Sports & Culture",
					regionDesc: "AI-curated adventure and cultural experiences",
					recommendations: ["culture", "adventure", "outdoor"],
					region: "Bungo-Ōno",
					regionLatitude: 32.9741,
					regionLongitude: 131.6088,
					estimatedDuration: "3-4 days",
					confidenceScore: 0.82,
					spotCount: 5,
					averageDistance: 3.1,
					touristSpots: mockAiRoutes.generatedRoutes[0]?.touristSpots || [],
					metadata: {
						sourceKeywords: ["culture", "adventure"],
						generatedAt: "2024-01-01T12:00:00Z",
						algorithm: "clustering-v2",
						aiGenerated: true,
					},
				},
				{
					modelRouteId: "ai-4",
					routeName: "Historical Food Tour",
					regionDesc: "Traditional culinary journey through history",
					recommendations: ["food", "history", "traditional"],
					region: "Bungo-Ōno",
					regionLatitude: 32.9741,
					regionLongitude: 131.6088,
					estimatedDuration: "1 day",
					confidenceScore: 0.91,
					spotCount: 4,
					averageDistance: 1.8,
					touristSpots: mockAiRoutes.generatedRoutes[0]?.touristSpots || [],
					metadata: {
						sourceKeywords: ["food", "history"],
						generatedAt: "2024-01-01T12:00:00Z",
						algorithm: "clustering-v2",
						aiGenerated: true,
					},
				},
			],
		},
		existingRoutes: [
			...mockExistingRoutes,
			{
				modelRouteId: "existing-3",
				storyId: "3",
				routeName: "Modern Culture Experience",
				region: "Bungo-Ōno",
				regionDesc: "Contemporary art and culture",
				recommendation: ["culture", "modern", "art"],
				regionLatitude: 32.9741,
				regionLongitude: 131.6088,
				regionBackgroundMedia: "/image/touriiverse/bungo-ono/chapter3.png",
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
		],
		region: "Bungo-Ōno",
		selectedInterests: ["culture", "food", "history"],
	},
};