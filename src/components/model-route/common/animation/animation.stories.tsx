import type { Meta, StoryObj } from "@storybook/react";
import Animation from "./animation";

const meta = {
	title: "Components/Animation",
	component: Animation,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		// Define your argTypes here
	},
} satisfies Meta<typeof Animation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		// Define your args here
	},
};
