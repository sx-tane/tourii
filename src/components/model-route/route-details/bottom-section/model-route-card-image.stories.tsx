import type { Meta, StoryObj } from "@storybook/react";
import ModelRouteCardImage from "./model-route-card-image";

const meta = {
	title: "Model Route/Route/RouteDetails/ModelRouteCardImage",
	component: ModelRouteCardImage,
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
} satisfies Meta<typeof ModelRouteCardImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithThreeImages: Story = {
	args: {
		routeDetailsSmallImage: {
			image1: "/image/model-route/1/harajiri-fall/1.jpg",
			image2: "/image/model-route/1/harajiri-fall/1.jpg",
			image3: "/image/model-route/1/harajiri-fall/1.jpg",
		},
		imageName: "Harajiri Waterfall",
	},
};

export const WithTwoImages: Story = {
	args: {
		routeDetailsSmallImage: {
			image1: "/image/model-route/1/harajiri-fall/1.jpg",
			image2: "/image/model-route/1/harajiri-fall/1.jpg",
			image3: undefined,
		},
		imageName: "Harajiri Waterfall",
	},
};

export const WithSingleImage: Story = {
	args: {
		routeDetailsSmallImage: {
			image1: "/image/model-route/1/harajiri-fall/1.jpg",
			image2: undefined,
			image3: undefined,
		},
		imageName: "Harajiri Waterfall",
	},
};

export const WithEmptyThirdImage: Story = {
	args: {
		routeDetailsSmallImage: {
			image1: "/image/model-route/1/harajiri-fall/1.jpg",
			image2: "/image/model-route/1/harajiri-fall/1.jpg",
			image3: "image3",
		},
		imageName: "Harajiri Waterfall",
	},
};
