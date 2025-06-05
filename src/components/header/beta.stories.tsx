import type { Meta, StoryObj } from "@storybook/react";
import Beta from "./beta";

const meta = {
	title: "Header/Beta",
	component: Beta,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	argTypes: {
		textColor: {
			control: "select",
			options: ["warmGrey3", "red", "charcoal"],
			description: "Text and border color for the beta badge",
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Beta>;

export default meta;
type Story = StoryObj<typeof Beta>;

export const Light: Story = {
	args: {
		textColor: "red",
	},
	parameters: {
		backgrounds: {
			default: "light",
		},
	},
};

export const Dark: Story = {
	args: {
		textColor: "warmGrey3",
	},
	parameters: {
		backgrounds: {
			default: "dark",
		},
	},
};
