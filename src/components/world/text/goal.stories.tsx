import type { Meta, StoryObj } from "@storybook/react";
import Goal from "./goal";

const meta = {
	title: "World/Text/Goal",
	component: Goal,
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
} satisfies Meta<typeof Goal>;

export default meta;
type Story = StoryObj<typeof Goal>;

// Mock data is already imported from @/lib/data/world/world-data
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
