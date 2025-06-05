import type { Meta, StoryObj } from "@storybook/react";
import { SectionTitle } from "./section-title";

// This is the required format for Storybook's default export
const meta: Meta<typeof SectionTitle> = {
	title: "Common/SectionTitle",
	component: SectionTitle,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = {
	args: {
		subtitle: ["Welcome to"],
		title: ["Tourii", "Adventure"],
	},
};

export const LongTitle: Story = {
	args: {
		subtitle: ["Discover", "Your"],
		title: ["Next", "Amazing", "Journey"],
	},
};

export const SingleWords: Story = {
	args: {
		subtitle: ["Featured"],
		title: ["Destinations"],
	},
};
