import type { Meta, StoryObj } from "@storybook/react";
import NFTEmblem from "./nft-emblem";

const meta = {
	title: "Homepage/NFTEmblem",
	component: NFTEmblem,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
		viewport: {
			viewports: {
				mobile: {
					name: "Mobile",
					styles: {
						width: "360px",
						height: "640px",
					},
				},
				tablet: {
					name: "Tablet",
					styles: {
						width: "768px",
						height: "1024px",
					},
				},
				desktop: {
					name: "Desktop",
					styles: {
						width: "1440px",
						height: "900px",
					},
				},
			},
			defaultViewport: "desktop",
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof NFTEmblem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default desktop view
export const Desktop: Story = {};

// Mobile view
export const Mobile: Story = {
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};

// Tablet view
export const Tablet: Story = {
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
	},
};
