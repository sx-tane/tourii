import type { Meta, StoryObj } from "@storybook/react";
import ActionButton from "./action-button";

const meta: Meta<typeof ActionButton> = {
	title: "Common/ActionButton",
	component: ActionButton,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A reusable action button with consistent styling. Used for primary actions like 'Proceed To Story', 'Explore Region', etc. Features a clean rounded design with hover effects.",
			},
		},
	},
	argTypes: {
		children: {
			control: "text",
			description: "Button text or content",
		},
		onClick: {
			action: "clicked",
			description: "Function called when button is clicked",
		},
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
		disabled: {
			control: "boolean",
			description: "Whether the button is disabled",
		},
		type: {
			control: "select",
			options: ["button", "submit", "reset"],
			description: "Button type attribute",
		},
	},
};

export default meta;
type Story = StoryObj<typeof ActionButton>;

export const Default: Story = {
	args: {
		children: "Default Button",
	},
};

export const ProceedToStory: Story = {
	args: {
		children: "Proceed To Story",
	},
};

export const ExploreRegion: Story = {
	args: {
		children: "Explore Region",
	},
};

export const Disabled: Story = {
	args: {
		children: "Disabled Button",
		disabled: true,
	},
};

export const CustomClassName: Story = {
	args: {
		children: "Custom Styled",
		className: "border-red-500 hover:bg-red-500",
	},
};

export const LongText: Story = {
	args: {
		children: "Continue Your Journey",
	},
};

export const WithEmoji: Story = {
	args: {
		children: "🌸 Start Adventure",
	},
};
