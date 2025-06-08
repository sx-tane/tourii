import type { RouteDetails } from "@/types/model-route-type";
import type { Meta, StoryObj } from "@storybook/react";
import IntroUpperSection from "./intro-upper-section";

const meta = {
	title: "Model Route/RouteDetailPage/RouteDetails/IntroUpperSection",
	component: IntroUpperSection,
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
} satisfies Meta<typeof IntroUpperSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRouteDetails: RouteDetails = {
	routeDetailId: "route1",
	stop: "STOP 1",
	routeDetailTime: "30 mins",
	routeDetailName: "Harajiri Waterfall",
	routeDetailStoryTitle: "The Majestic Falls",
	routeDetailBigImage: "/image/model-route/1/harajiri-fall/1.jpg",
	routeDetailDescription: "A stunning waterfall in Bungo Ono City",
	routeDetailLocation: "Bungo Ono City, Oita Prefecture",
	routeDetailAddress: "Harajiri Falls Park, 1648-1 Ogata, Bungo Ono",
	routeHashtag: ["#HarajiriFalls", "#BungoOno", "#JapaneseNiagara"],
	visualNovelLink: "/stories/bungo-ono/chapter1",
	modelRouteLink: "/model-route/harajiri-falls",
	routeDetailSmallImage: {
		image1: "/image/model-route/1/harajiri-fall/1.jpg",
		image2: "/image/model-route/1/harajiri-fall/1.jpg",
		image3: "/image/model-route/1/harajiri-fall/1.jpg",
	},
};

export const Default: Story = {
	args: {
		routeDetails: mockRouteDetails,
	},
};

export const LongTitle: Story = {
	args: {
		routeDetails: {
			...mockRouteDetails,
			routeDetailName: "The Historic Harajiri Waterfall Nature Reserve",
			routeDetailStoryTitle: "A Journey Through Time and Nature",
		},
	},
};

export const LastStop: Story = {
	args: {
		routeDetails: {
			...mockRouteDetails,
			stop: "FINAL STOP",
			routeDetailTime: "1 hour",
		},
	},
};
