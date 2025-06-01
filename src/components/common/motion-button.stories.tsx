import type { Meta, StoryObj } from "@storybook/react";
import MotionButton from "./motion-button";

const meta: Meta<typeof MotionButton> = {
	title: "Common/MotionButton",
	component: MotionButton,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A reusable animated button that expands on hover to reveal text. Extracted from ChapterDisplay component for common use across the application.",
			},
		},
	},
	argTypes: {
		hoverText: {
			control: "text",
			description: "Text displayed when button is hovered",
		},
		icon: {
			control: "text",
			description: "Icon displayed when not hovered",
		},
		onClick: {
			action: "clicked",
			description: "Function called when button is clicked",
		},
		colors: {
			control: "object",
			description: "Custom color configuration",
		},
		durations: {
			control: "object",
			description: "Animation duration settings",
		},
		size: {
			control: "object",
			description: "Size and spacing configuration",
		},
	},
};

export default meta;
type Story = StoryObj<typeof MotionButton>;

export const Default: Story = {
	args: {
		hoverText: "READ NOW",
	},
};

export const CustomIcon: Story = {
	args: {
		hoverText: "EXPLORE",
		icon: "🌸",
	},
};

export const ProceedToStory: Story = {
	args: {
		hoverText: "PROCEED TO STORY",
		size: {
			expandedWidth: "250px",
		},
	},
};

export const SmallButton: Story = {
	args: {
		hoverText: "GO",
		size: {
			collapsedWidth: "40px",
			expandedWidth: "120px",
			height: "h-10",
			textSize: "text-sm",
			iconSize: "text-lg",
		},
	},
};

export const CustomColors: Story = {
	args: {
		hoverText: "CUSTOM STYLE",
		colors: {
			borderColor: "border-blue-500",
			hoverBgColor: "#3B82F6",
			defaultTextColor: "#3B82F6",
			hoverTextColor: "#FFFFFF",
		},
	},
};

export const SlowAnimation: Story = {
	args: {
		hoverText: "SLOW ANIMATION",
		durations: {
			expansion: 0.8,
			textTransition: 0.5,
		},
	},
};

export const PlaygroundExample: Story = {
	args: {
		hoverText: "INTERACTIVE DEMO",
		icon: "🎮",
		colors: {
			borderColor: "border-purple-400",
			hoverBgColor: "#A855F7",
			defaultTextColor: "#A855F7",
			hoverTextColor: "#FFFFFF",
		},
		size: {
			expandedWidth: "220px",
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"Try hovering over this button to see the smooth animation in action!",
			},
		},
	},
};
