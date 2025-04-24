import type { Meta, StoryObj } from "@storybook/react";
import MainImage from "./main-image";

const meta = {
	title: "Homepage/MainImage",
	component: MainImage,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof MainImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
