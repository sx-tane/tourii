import type { Meta, StoryObj } from "@storybook/react";
import HighlightsSection from "./highlights-section";

const meta: Meta<typeof HighlightsSection> = {
	title: "Homepage/Highlights/HighlightsSection",
	component: HighlightsSection,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: "Complete highlights section container with API integration",
			},
		},
	},
	// Mock the API hook for Storybook
	decorators: [
		(Story) => {
			// In a real implementation, we'd mock the useHomepageHighlights hook
			// For now, this will show the loading state
			return <Story />;
		},
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
	// This will show the skeleton loading state
	parameters: {
		docs: {
			description: {
				story: "Loading state with skeleton placeholders",
			},
		},
	},
};