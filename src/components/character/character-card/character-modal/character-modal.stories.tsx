import { characters } from "@/lib/data/character/character-data";
import type { Meta, StoryObj } from "@storybook/react";
import CharacterModal from "./character-modal";

const meta = {
	title: "Character/Modal/CharacterModal",
	component: CharacterModal,
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" }, // warmGrey
				{ name: "dark", value: "#21211B" }, // charcoal
			],
		},
	},
	argTypes: {
		onClose: { action: "modal closed" },
	},
	tags: ["autodocs"],
} satisfies Meta<typeof CharacterModal>;

export default meta;
type Story = StoryObj<typeof CharacterModal>;

export const Desktop: Story = {
	args: {
		isOpen: true,
		character: characters[0],
		characters: characters,
	},
};

export const Mobile: Story = {
	args: {
		isOpen: true,
		character: characters[0],
		characters: characters,
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};

export const Tablet: Story = {
	args: {
		isOpen: true,
		character: characters[0],
		characters: characters,
	},
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
	},
};

export const Closed: Story = {
	args: {
		isOpen: false,
		character: characters[0],
		characters: characters,
	},
};
