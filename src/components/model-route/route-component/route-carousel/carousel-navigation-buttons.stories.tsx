"use client";

import type { Meta, StoryObj } from "@storybook/react";
import CarouselNavigationButtons from "./carousel-navigation-buttons";

const logAction =
	(name: string) =>
	(...args: unknown[]) =>
		console.log(`Action: ${name}`, ...args);

const meta = {
	title: "Model Route/RoutePage/CarouselNavigationButtons",
	component: CarouselNavigationButtons,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark", // Default to dark as buttons are light
			values: [
				{ name: "light", value: "#E3E3DC" },
				{ name: "dark", value: "#21211B" },
			],
		},
	},
	tags: ["autodocs"],
	argTypes: {
		onPrevious: {
			description:
				"Callback function for the previous button click. Logs to console.",
			control: false,
		},
		onNext: {
			description:
				"Callback function for the next button click. Logs to console.",
			control: false,
		},
	},
} satisfies Meta<typeof CarouselNavigationButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		onPrevious: logAction("onPreviousClicked"),
		onNext: logAction("onNextClicked"),
	},
	parameters: {
		docs: {
			description: {
				story:
					"Default state of the carousel navigation buttons. Hover and click to see Framer Motion effects. Actions are logged to the browser console.",
			},
		},
	},
};

export const OnLightBackground: Story = {
	args: {
		onPrevious: logAction("onPreviousClicked"),
		onNext: logAction("onNextClicked"),
	},
	parameters: {
		backgrounds: { default: "light" },
		docs: {
			description: {
				story:
					"Carousel navigation buttons displayed on a light background to check visibility and style contrast. Actions are logged to the browser console.",
			},
		},
	},
};
