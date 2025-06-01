import type { Meta, StoryObj } from "@storybook/react";
import CarouselControl from "./carousel-control";

const meta: Meta<typeof CarouselControl> = {
	title: "Model Route/CarouselControl",
	component: CarouselControl,
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "dark",
			values: [
				{ name: "light", value: "#E3E3DC" },
				{ name: "dark", value: "#21211B" },
			],
		},
		docs: {
			description: {
				component:
					"Navigation controls for the route carousel. Displays left and right arrow buttons for navigating between routes.",
			},
		},
	},
	argTypes: {
		onPrevious: {
			description: "Callback when previous button is clicked",
			action: "previous",
		},
		onNext: {
			description: "Callback when next button is clicked",
			action: "next",
		},
		canGoPrevious: {
			description: "Whether previous navigation is available",
			control: "boolean",
		},
		canGoNext: {
			description: "Whether next navigation is available",
			control: "boolean",
		},
		className: {
			description: "Additional CSS classes",
			control: "text",
		},
	},
	decorators: [
		(Story) => (
			<div
				style={{
					width: "100vw",
					height: "100vh",
					position: "relative",
					backgroundImage:
						"url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&h=1080&fit=crop')",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<Story />
			</div>
		),
	],
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CarouselControl>;

export const Default: Story = {
	args: {
		canGoPrevious: true,
		canGoNext: true,
	},
	parameters: {
		docs: {
			description: {
				story: "Default carousel control with both navigation buttons enabled",
			},
		},
	},
};

export const OnlyNext: Story = {
	args: {
		canGoPrevious: false,
		canGoNext: true,
	},
	parameters: {
		docs: {
			description: {
				story: "Carousel control with only next button (first slide)",
			},
		},
	},
};

export const OnlyPrevious: Story = {
	args: {
		canGoPrevious: true,
		canGoNext: false,
	},
	parameters: {
		docs: {
			description: {
				story: "Carousel control with only previous button (last slide)",
			},
		},
	},
};

export const NoBoth: Story = {
	args: {
		canGoPrevious: false,
		canGoNext: false,
	},
	parameters: {
		docs: {
			description: {
				story: "Carousel control with no buttons (single slide)",
			},
		},
	},
};

export const Interactive: Story = {
	args: {
		canGoPrevious: true,
		canGoNext: true,
		onPrevious: () => console.log("Previous clicked"),
		onNext: () => console.log("Next clicked"),
	},
	parameters: {
		docs: {
			description: {
				story: "Interactive carousel control - click buttons to test callbacks",
			},
		},
	},
};
