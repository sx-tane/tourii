import { characters } from "@/lib/data/character/character-data";
import type { Meta, StoryObj } from "@storybook/react";
import InfoTable from "./info-table";

const meta = {
	title: "Character/Modal/InfoTable",
	component: InfoTable,
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
	tags: ["autodocs"],
} satisfies Meta<typeof InfoTable>;

export default meta;
type Story = StoryObj<typeof InfoTable>;

export const Default: Story = {
	args: {
		character: characters[0], // Ninigi-No-Mikoto
	},
};

export const WithAllFields: Story = {
	args: {
		character: characters[1], // Amaterasu-Omikami
	},
};
