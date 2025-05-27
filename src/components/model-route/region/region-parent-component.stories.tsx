import type { Meta, StoryObj } from "@storybook/react";
import RegionParentComponent from "./region-parent-component";

const meta = {
	title: "Components/Region/RegionParentComponent",
	component: RegionParentComponent,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		// Define your argTypes here
	},
} satisfies Meta<typeof RegionParentComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		// Define your args here
	},
};
