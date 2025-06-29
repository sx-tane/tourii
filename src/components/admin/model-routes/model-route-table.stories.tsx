import type { ModelRouteResponseDto } from "@/api/generated";
import type { Meta, StoryObj } from "@storybook/react";
import ModelRouteTable from "./model-route-table";

const meta: Meta<typeof ModelRouteTable> = {
	title: "Admin/ModelRoutes/ModelRouteTable",
	component: ModelRouteTable,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockRoutes: ModelRouteResponseDto[] = [
	{
		modelRouteId: "ROUTE-001",
		storyId: "STORY-001",
		routeName: "Historic Kyoto Temple Tour",
		region: "Kyoto",
		regionDesc:
			"A scenic journey through Kyoto's most famous temples and shrines, showcasing traditional Japanese architecture and cultural heritage.",
		recommendation: ["cultural", "photography", "spiritual"],
		regionLatitude: 35.0116,
		regionLongitude: 135.7681,
		regionBackgroundMedia: "https://example.com/kyoto-background.jpg",
		touristSpotList: [
			{
				touristSpotId: "SPOT-KIYOMIZU",
				storyChapterId: "CHAPTER-001",
				touristSpotName: "Kiyomizu Temple",
				touristSpotDesc: "Famous temple with wooden stage",
				bestVisitTime: "Morning",
				address: "1-294 Kiyomizu, Higashiyama Ward, Kyoto",
				touristSpotLatitude: 34.9949,
				touristSpotLongitude: 135.785,
				touristSpotHashtag: ["#temples", "#kyoto", "#heritage"],
			},
			{
				touristSpotId: "SPOT-GION",
				storyChapterId: "CHAPTER-002",
				touristSpotName: "Gion District",
				touristSpotDesc: "Traditional geisha district",
				bestVisitTime: "Evening",
				address: "Gion, Higashiyama Ward, Kyoto",
				touristSpotLatitude: 35.0037,
				touristSpotLongitude: 135.775,
				touristSpotHashtag: ["#geisha", "#traditional", "#nightlife"],
			},
		],
		regionWeatherInfo: {
			temperatureCelsius: 22,
			weatherName: "sunny",
			weatherDesc: "Clear skies with mild temperature",
			regionName: "Kyoto",
		},
		insDateTime: "2024-01-01T00:00:00Z",
		updDateTime: "2024-01-01T00:00:00Z",
		isAiGenerated: false,
	},
	{
		modelRouteId: "ROUTE-002",
		storyId: "STORY-002",
		routeName: "Osaka Food Adventure",
		region: "Osaka",
		regionDesc:
			"Discover the culinary delights of Osaka, from street food to high-end restaurants.",
		recommendation: ["culinary", "local-experience"],
		regionLatitude: 34.6937,
		regionLongitude: 135.5023,
		regionBackgroundMedia: "https://example.com/osaka-background.jpg",
		touristSpotList: [],
		regionWeatherInfo: {
			temperatureCelsius: 25,
			weatherName: "partly-cloudy",
			weatherDesc: "Partly cloudy with warm temperature",
			regionName: "Osaka",
		},
		insDateTime: "2024-01-01T00:00:00Z",
		updDateTime: "2024-01-01T00:00:00Z",
		isAiGenerated: false,
	},
];

export const Default: Story = {
	args: {
		routes: mockRoutes,
		selectedRoutes: [],
		onToggleSelection: (routeId: string) =>
			console.log("Toggle selection:", routeId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (route: ModelRouteResponseDto) =>
			console.log("Edit route:", route.routeName),
		onDelete: (routeId: string, routeName: string) =>
			console.log("Delete route:", routeName),
		deletingRouteId: null,
	},
};

export const WithSelection: Story = {
	args: {
		routes: mockRoutes,
		selectedRoutes: ["ROUTE-001"],
		onToggleSelection: (routeId: string) =>
			console.log("Toggle selection:", routeId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (route: ModelRouteResponseDto) =>
			console.log("Edit route:", route.routeName),
		onDelete: (routeId: string, routeName: string) =>
			console.log("Delete route:", routeName),
		deletingRouteId: null,
	},
};

export const EmptyState: Story = {
	args: {
		routes: [],
		selectedRoutes: [],
		onToggleSelection: (routeId: string) =>
			console.log("Toggle selection:", routeId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (route: ModelRouteResponseDto) =>
			console.log("Edit route:", route.routeName),
		onDelete: (routeId: string, routeName: string) =>
			console.log("Delete route:", routeName),
		deletingRouteId: null,
	},
};
