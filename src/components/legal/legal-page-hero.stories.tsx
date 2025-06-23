import type { Meta, StoryObj } from "@storybook/react";
import LegalPageHero from "./legal-page-hero";

const meta: Meta<typeof LegalPageHero> = {
	title: "Components/Legal/LegalPageHero",
	component: LegalPageHero,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Animated hero section for legal pages with Framer Motion. Features smooth entrance animations, rotating decorative elements, and staggered text animations.",
			},
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TermsOfService: Story = {
	args: {
		title: "Terms of Service",
		lastUpdated: "June 21, 2025",
	},
};

export const PrivacyPolicy: Story = {
	args: {
		title: "Privacy Policy",
		lastUpdated: "June 21, 2025",
	},
};

export const CookiePolicy: Story = {
	args: {
		title: "Cookie Policy",
		lastUpdated: "June 21, 2025",
	},
};

export const LongTitle: Story = {
	args: {
		title: "Data Processing Agreement and Terms of Use",
		lastUpdated: "January 15, 2025",
	},
};