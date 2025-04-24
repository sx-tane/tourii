import type { Meta, StoryObj } from "@storybook/react";
import DescriptionWorld from "./description";

const meta = {
	title: "World/Text/Description",
	component: DescriptionWorld,
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
	tags: ["autodocs"],
} satisfies Meta<typeof DescriptionWorld>;

export default meta;
type Story = StoryObj<typeof DescriptionWorld>;

export const Default: Story = {
	args: {
		data: "Welcome to the world of Tourii.\n\nA place where tradition meets innovation.",
	},
};

export const WithMarkdown: Story = {
	args: {
		data: `# Welcome to Tourii

## A Journey Through Time

- Discover ancient temples
- Experience modern culture
- Connect with history

*This is an italic text* and **this is bold**.

> A quote about Japanese culture`,
	},
};

export const OnDark: Story = {
	args: {
		data: "Experience the magic of Japan\n\nThrough the lens of Tourii",
	},
	parameters: {
		backgrounds: { default: "dark" },
	},
};
