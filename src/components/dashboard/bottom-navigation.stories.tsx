import type { Meta, StoryObj } from "@storybook/react";
import BottomNavigation from "./bottom-navigation";

const meta: Meta<typeof BottomNavigation> = {
	title: "Dashboard/BottomNavigation",
	component: BottomNavigation,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Bottom navigation component for quick access to main app sections from the dashboard.",
			},
		},
	},
	decorators: [
		(Story) => (
			<div className="w-[600px] p-4 bg-gray-100">
				<Story />
			</div>
		),
	],
	tags: ["autodocs"],
	argTypes: {
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const WithCustomClassName: Story = {
	args: {
		className: "border-2 border-dashed border-blue-300",
	},
};

export const Interactive: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: "Hover over the buttons to see interactive animations and descriptions.",
			},
		},
	},
};

export const MobileView: Story = {
	args: {},
	parameters: {
		viewport: {
			defaultViewport: 'mobile1',
		},
		docs: {
			description: {
				story: "Mobile responsive view of the bottom navigation component.",
			},
		},
	},
	decorators: [
		(Story) => (
			<div className="w-[320px] p-4 bg-gray-100">
				<Story />
			</div>
		),
	],
};

export const WithCustomStyling: Story = {
	args: {
		className: "shadow-lg border border-warmGrey3",
	},
	parameters: {
		docs: {
			description: {
				story: "Bottom navigation with custom styling applied via className prop.",
			},
		},
	},
};

export const AccessibilityFocus: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: "Test keyboard navigation by pressing Tab to focus through buttons. Focus states use semantic red color.",
			},
		},
	},
	play: async ({ canvasElement }) => {
		// This would be enhanced with actual accessibility testing in a real implementation
		const canvas = canvasElement;
		const buttons = canvas.querySelectorAll('button');
		console.log(`Found ${buttons.length} navigation buttons for accessibility testing`);
	},
};