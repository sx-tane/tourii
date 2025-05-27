import type { Meta, StoryObj } from "@storybook/react";
import RegionList from "./region-list";

const meta = {
	title: "Components/Region/RegionList",
	component: RegionList,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		// Define your argTypes here
	},
} satisfies Meta<typeof RegionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		// Define your args here
	},
};
