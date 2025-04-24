import type { Meta, StoryObj } from "@storybook/react";
import CloseButton from "./close-button";
import CloseButtonMobile from "./close-button-mobile";

const closeButtonMeta = {
	title: "Character/Modal/CloseButton",
	component: CloseButton,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	argTypes: {
		onClose: { action: "closed" },
	},
	tags: ["autodocs"],
} satisfies Meta<typeof CloseButton>;

export default closeButtonMeta;
type Story = StoryObj<typeof CloseButton>;

export const Desktop: Story = {};

const mobileButtonMeta = {
	title: "Character/Modal/CloseButtonMobile",
	component: CloseButtonMobile,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	argTypes: {
		onClose: { action: "closed" },
	},
	tags: ["autodocs"],
} satisfies Meta<typeof CloseButtonMobile>;

export const Mobile: Story = {};
