import type { RouteDetails } from "@/types/model-route-type";
import type { Meta, StoryObj } from "@storybook/react";
import BottomSection from "./bottom-section";

const meta = {
	title: "ModelRoute/RouteDetails/BottomSection",
	component: BottomSection,
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
} satisfies Meta<typeof BottomSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRouteDetails: RouteDetails = {
	routeDetailId: "route1",
	stop: "STOP 1",
	routeDetailTime: "30 mins",
	routeDetailName: "Harajiri Waterfall",
	routeDetailStoryTitle: "Nature's Power",
	routeDetailBigImage: "/image/model-route/1/harajiri-fall/1.jpg",
	routeDetailDescription: `Harajiri Falls, often called the "Niagara Falls of Japan," is a stunning natural wonder in Bungo Ono City. The waterfall spans 120 meters wide and drops 20 meters, creating a spectacular horseshoe shape.

The falls were formed by the Ono River cutting through a hardened lava plateau, resulting in this magnificent natural formation. The area around the falls has been developed into a pleasant park, making it easily accessible to visitors.

During the spring and early summer, the surrounding area is beautifully decorated with blooming irises, adding to the scenic beauty of the location.`,
	routeDetailLocation: "Bungo Ono City, Oita Prefecture",
	routeDetailAddress: "Harajiri Falls Park, 1648-1 Ogata, Bungo Ono",
	routeHashtag: ["#HarajiriFalls", "#BungoOno", "#JapaneseNiagara"],
	visualNovelLink: "/stories/bungo-ono/chapter1",
	modelRouteLink: "/model-route/harajiri-falls",
	routeDetailSmallImage: {
		image1: "/image/model-route/1/harajiri-fall/1.jpg",
		image2: "/image/model-route/1/harajiri-fall/2.jpg",
		image3: "/image/model-route/1/harajiri-fall/3.jpg",
	},
};

export const Default: Story = {
	args: {
		routeDetails: mockRouteDetails,
	},
};

export const WithoutThirdImage: Story = {
	args: {
		routeDetails: {
			...mockRouteDetails,
			routeDetailSmallImage: {
				image1: mockRouteDetails.routeDetailSmallImage.image1,
				image2: mockRouteDetails.routeDetailSmallImage.image2,
				image3: undefined,
			},
		},
	},
};

export const WithLongDescription: Story = {
	args: {
		routeDetails: {
			...mockRouteDetails,
			routeDetailDescription:
				`${mockRouteDetails.routeDetailDescription}\n\n`.repeat(3),
		},
	},
};
