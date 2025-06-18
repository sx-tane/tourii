import type { Meta, StoryObj } from "@storybook/react";
import CTASection from "./cta-section";

const meta: Meta<typeof CTASection> = {
	title: "Homepage/CTASection",
	component: CTASection,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Call-to-action section for the homepage",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};