import type { Meta, StoryObj } from "@storybook/react";
import { PopularQuestSection } from "./popular-quest-section";

const meta = {
	title: "Homepage/PopularQuestSection",
	component: PopularQuestSection,
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" },
				{ name: "dark", value: "#21211B" },
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof PopularQuestSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const WithDarkBackground: Story = {
	args: {},
	parameters: {
		backgrounds: {
			default: "dark",
		},
	},
};

export const Mobile: Story = {
	args: {},
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
};

export const Tablet: Story = {
	args: {},
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
	},
};
