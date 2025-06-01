import type { RouteDestinations } from "@/types/model-route-type";
import type { Meta, StoryObj } from "@storybook/react";
import RouteDestination from "./route-destination";

const meta = {
	title: "Model Route/RouteComponent/RouteDestination",
	component: RouteDestination,
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
} satisfies Meta<typeof RouteDestination>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockDestinations: RouteDestinations[] = [
	{
		destinationId: "dest1",
		routeDetailId: "route1",
		stopId: "STOP 1",
		destinationName: "Harajiri Falls",
		destinationImage: "/image/model-route/1/harajiri-fall/1.jpg",
		modelRouteLink: "/model-route/harajiri-falls",
		destinationDescription: "A stunning waterfall in Bungo Ono City",
	},
	{
		destinationId: "dest2",
		routeDetailId: "route2",
		stopId: "STOP 2",
		destinationName: "Ninomiya Shrine",
		destinationImage: "/image/model-route/1/harajiri-fall/1.jpg",
		modelRouteLink: "/model-route/ninomiya-shrine",
		destinationDescription: "Historic shrine with beautiful architecture",
	},
	{
		destinationId: "dest3",
		routeDetailId: "route3",
		stopId: "STOP 3",
		destinationName: "Miyazako Stone Buddha",
		destinationImage: "/image/model-route/1/harajiri-fall/1.jpg",
		modelRouteLink: "/model-route/miyazako-buddha",
		destinationDescription: "Ancient stone carvings in the cliff face",
	},
];

export const ThreeDestinations: Story = {
	args: {
		routeDestinations: mockDestinations,
	},
};

export const TwoDestinations: Story = {
	args: {
		routeDestinations: mockDestinations.slice(0, 2),
	},
};

export const SingleDestination: Story = {
	args: {
		routeDestinations: mockDestinations.slice(0, 1),
	},
};

export const WithLongNames: Story = {
	args: {
		routeDestinations: mockDestinations.map((dest) => ({
			...dest,
			destinationName: `Historic ${dest.destinationName} Cultural Heritage Site`,
		})),
	},
};
