import type { Meta, StoryObj } from "@storybook/react";
import RouteMatchingComponent from "./route-matching-component";

const meta: Meta<typeof RouteMatchingComponent> = {
	title: "Admin/Standalone Spots/Route Matching",
	component: RouteMatchingComponent,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Interface for managing which tourist spots belong to which routes. Allows adding and removing spots from routes.",
			},
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: "Default route matching interface showing available spots and route management.",
			},
		},
	},
};

export const WithSelectedRoute: Story = {
	parameters: {
		docs: {
			description: {
				story: "Route matching interface with a route selected, showing current spots in the route and available spots to add.",
			},
		},
		mockData: {
			selectedRoute: {
				modelRouteId: "route-1",
				routeName: "Tokyo Historical Tour",
				touristSpotList: [
					{
						touristSpotId: "spot-1",
						touristSpotName: "Senso-ji Temple",
						address: "2 Chome-3-1 Asakusa, Taito City, Tokyo",
						touristSpotHashtag: ["#temple", "#historical"],
					},
				],
			},
			availableSpots: [
				{
					touristSpotId: "spot-2",
					touristSpotName: "Tokyo Skytree", 
					address: "1 Chome-1-2 Oshiage, Sumida City, Tokyo",
					touristSpotHashtag: ["#tower", "#modern"],
				},
			],
		},
	},
};

export const EmptyRoute: Story = {
	parameters: {
		docs: {
			description: {
				story: "Route matching interface with an empty route selected, showing only available spots to add.",
			},
		},
		mockData: {
			selectedRoute: {
				modelRouteId: "route-2",
				routeName: "New Empty Route",
				touristSpotList: [],
			},
		},
	},
};