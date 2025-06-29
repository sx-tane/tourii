import type { ModelRouteResponseDto } from "@/api/generated/models/ModelRouteResponseDto";
import type { Meta, StoryObj } from "@storybook/react";
import ModelRouteIntro from "./model-route-intro";

const meta = {
	title: "Model Route/RouteDetailPage/ModelRouteIntro",
	component: ModelRouteIntro,
	parameters: {
		backgrounds: {
			default: "light",
			values: [
				{
					name: "light",
					value: "#E3E3DC",
				},
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ModelRouteIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockModelRoute: ModelRouteResponseDto = {
	modelRouteId: "route1",
	storyId: "story1",
	regionDesc: "Historical Journey Through Time",
	regionLatitude: 35.0116,
	regionLongitude: 135.7681,
	regionBackgroundMedia: "/images/kyoto.jpg",
	touristSpotList: [],
	regionWeatherInfo: {
		weatherName: "Clear",
		temperatureCelsius: 25,
		weatherDesc: "Clear skies",
		regionName: "Bungo Ono",
	},
	region: "Bungo Ono",
	routeName: "Historical Journey Through Time",
	recommendation: ["History Lovers", "Nature Enthusiasts"],
	insDateTime: "2024-01-01T00:00:00Z",
	updDateTime: "2024-01-01T00:00:00Z",
	isAiGenerated: false,
};

export const Default: Story = {
	args: {
		modelRoute: mockModelRoute,
	},
};

export const WithLongName: Story = {
	args: {
		modelRoute: {
			...mockModelRoute,
			routeName: "A Historical Journey Through Time and Culture in Bungo Ono",
		},
	},
};

export const WithMultipleRecommendations: Story = {
	args: {
		modelRoute: {
			...mockModelRoute,
			recommendation: [
				"History Lovers",
				"Nature Enthusiasts",
				"Photography",
				"Cultural Experience",
				"Adventure Seekers",
			],
		},
	},
};

export const WithShortName: Story = {
	args: {
		modelRoute: {
			...mockModelRoute,
			routeName: "Quick Tour",
			recommendation: ["Beginners", "Families"],
		},
	},
};
