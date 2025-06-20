import type { Meta, StoryObj } from "@storybook/react";
import CTASection from "./cta-section";

const meta: Meta<typeof CTASection> = {
	title: "Homepage/CTASection",
	component: CTASection,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Call-to-action section for the homepage with customizable text and links",
			},
		},
	},
	argTypes: {
		title: { 
			control: "text",
			description: "Main heading text"
		},
		subtitle: { 
			control: "text",
			description: "Subtitle text"
		},
		buttonText: { 
			control: "text",
			description: "Button text"
		},
		buttonHref: { 
			control: "text",
			description: "Button link destination"
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomText: Story = {
	args: {
		title: "DISCOVER THE MAGIC OF JAPAN",
		subtitle: "YOUR JOURNEY AWAITS",
		buttonText: "GET STARTED",
		buttonHref: "/v2/complete-profile",
	},
};