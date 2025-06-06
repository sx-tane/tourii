import type { CharacterProps } from "@/app/v2/(stories)/types";
import { characters as allCharacters } from "@/lib/data/character/character-data"; // Import mock data
import type { Meta, StoryObj } from "@storybook/react";
import { CharactersTabContent } from "./characters-tab-content";

// Prepare mock data subsets
const someCharacters: CharacterProps[] = allCharacters.slice(0, 2); // e.g., Ninigi, Amaterasu
const oneCharacter: CharacterProps[] = allCharacters.slice(2, 3); // e.g., Sarutahiko
const noCharacters: CharacterProps[] = [];

const meta: Meta<typeof CharactersTabContent> = {
	title: "Story/ChapterPage/CharactersTabContent",
	component: CharactersTabContent,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen", // Usually appropriate for tab content
	},
	args: {
		// Default args
		relevantCharacters: someCharacters,
		handleOpenModal: (character) =>
			console.log("Opening modal for:", character.id),
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with a couple of characters
export const Default: Story = {};

// Story with only one character
export const SingleCharacter: Story = {
	args: {
		relevantCharacters: oneCharacter,
	},
};

// Story representing when a chapter has no associated characters
export const NoRelevantCharacters: Story = {
	args: {
		relevantCharacters: noCharacters,
	},
};
