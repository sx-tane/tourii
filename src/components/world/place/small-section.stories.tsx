import type { Meta, StoryObj } from "@storybook/react";
import SmallSection from "./small-section";

const meta = {
	title: "World/Place/SmallSection",
	component: SmallSection,
	parameters: {
		layout: "padded",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof SmallSection>;

export default meta;
type Story = StoryObj<typeof SmallSection>;

export const Default: Story = {
	args: {
		title: "takamagahara",
		smallTitle: "Plain of High Heaven",
		image: "/image/world/takamagahara.png",
		video: "/video/touriiverse/Heaven.mp4",
	},
};

export const WithoutVideo: Story = {
	args: {
		title: "yomi no kuni",
		smallTitle: "Land of Darkness",
		image: "/image/world/yomi.png",
	},
};

export const OnDark: Story = {
	args: {
		title: "takamagahara",
		smallTitle: "Plain of High Heaven",
		image: "/image/world/takamagahara.png",
		video: "/video/touriiverse/Heaven.mp4",
	},
	parameters: {
		backgrounds: { default: "dark" },
	},
};

export const Mobile: Story = {
	args: {
		title: "takamagahara",
		smallTitle: "Plain of High Heaven",
		image: "/image/world/takamagahara.png",
		video: "/video/touriiverse/Heaven.mp4",
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};
