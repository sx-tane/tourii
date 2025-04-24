import type { Meta, StoryObj } from "@storybook/react";
import WhiteLine from "./white-line";

const meta = {
	title: "World/WhiteLine",
	component: WhiteLine,
	parameters: {
		layout: "padded",
		backgrounds: {
			default: "dark",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof WhiteLine>;

export default meta;
type Story = StoryObj<typeof WhiteLine>;

export const Default: Story = {};

export const OnLight: Story = {
	parameters: {
		backgrounds: { default: "light" },
	},
};
