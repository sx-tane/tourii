import type { Meta, StoryObj } from "@storybook/react";
import { CharacterCarousel } from "./character-carousel";

const meta = {
	title: "Character/CharacterCarousel",
	component: CharacterCarousel,
	parameters: {
		layout: "padded",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof CharacterCarousel>;

export default meta;
type Story = StoryObj<typeof CharacterCarousel>;

export const Default: Story = {};

export const Mobile: Story = {
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};

export const Tablet: Story = {
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
	},
};
