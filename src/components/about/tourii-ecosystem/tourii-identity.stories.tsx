import type { Meta, StoryObj } from "@storybook/react";
import TouriiIdentity from "./tourii-identity";

const meta = {
	title: "About/TouriiEcosystem/TouriiIdentity",
	component: TouriiIdentity,
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
} satisfies Meta<typeof TouriiIdentity>;

export default meta;
type Story = StoryObj<typeof TouriiIdentity>;

export const Desktop: Story = {};

export const Mobile: Story = {
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};

export const Tablet: Story = {
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
	},
};
