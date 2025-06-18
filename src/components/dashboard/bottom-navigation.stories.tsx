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