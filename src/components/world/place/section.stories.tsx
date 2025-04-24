import type { Meta, StoryObj } from "@storybook/react";
import Section from "./section";

const meta = {
	title: "World/Place/Section",
	component: Section,
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof Section>;

// Uses data from world-data.ts
export const Default: Story = {};

export const OnDark: Story = {
	parameters: {
		backgrounds: { default: "dark" },
	},
};

export const Mobile: Story = {
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};
