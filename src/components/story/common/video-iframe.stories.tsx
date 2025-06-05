import type { Meta, StoryObj } from "@storybook/react";
import VideoIframe from "./video-iframe";

const meta = {
	title: "Story/Common/VideoIframe",
	component: VideoIframe,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [
				{ name: "dark", value: "#21211B" }, // charcoal
				{ name: "light", value: "#E3E3DC" }, // warmGrey
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof VideoIframe>;

export default meta;
type Story = StoryObj<typeof VideoIframe>;

// Default story with 16:9 aspect ratio
export const Default: Story = {
	decorators: [
		(Story) => <div className="w-[800px] aspect-video">{Story()}</div>,
	],
	args: {
		iframeSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
		title: "Sample Video",
	},
};

// Mobile view with different aspect ratio
export const Mobile: Story = {
	decorators: [
		(Story) => <div className="w-[350px] aspect-video">{Story()}</div>,
	],
	args: {
		iframeSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
		title: "Mobile Video",
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
};

// Square aspect ratio
export const Square: Story = {
	decorators: [
		(Story) => <div className="w-[500px] aspect-square">{Story()}</div>,
	],
	args: {
		iframeSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
		title: "Square Video",
	},
};
