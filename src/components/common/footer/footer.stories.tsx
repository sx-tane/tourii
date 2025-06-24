import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./footer";

const meta: Meta<typeof Footer> = {
	title: "Homepage/Footer",
	component: Footer,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Footer component for the homepage",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
