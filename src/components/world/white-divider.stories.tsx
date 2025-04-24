import type { Meta, StoryObj } from "@storybook/react";
import DividerWhite from "./white-divider";

const meta = {
	title: "World/DividerWhite",
	component: DividerWhite,
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "dark",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DividerWhite>;

export default meta;
type Story = StoryObj<typeof DividerWhite>;

export const Default: Story = {};

export const OnLight: Story = {
	parameters: {
		backgrounds: { default: "light" },
	},
};

export const Mobile: Story = {
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};
