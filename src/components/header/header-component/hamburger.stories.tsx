import type { Meta, StoryObj } from "@storybook/react";
import Hamburger from "./hamburger";

const meta = {
	title: "Header/Hamburger",
	component: Hamburger,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="p-8">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Hamburger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightTheme: Story = {
	args: {
		theme: "white",
		textColor: "red",
	},
};

export const DarkTheme: Story = {
	args: {
		theme: "black",
	},
};
