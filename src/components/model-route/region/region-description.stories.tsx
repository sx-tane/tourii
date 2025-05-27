import type { Meta, StoryObj } from "@storybook/react";
import RegionDescription from "./region-description";

const meta = {
	title: "Components/Region/RegionDescription",
	component: RegionDescription,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		description: { control: "text" },
	},
} satisfies Meta<typeof RegionDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		description: "This is a sample region description.",
	},
};
