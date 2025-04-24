import type { Meta, StoryObj } from "@storybook/react";
import Divider from "./divider";
import Line from "./line";

const lineMeta = {
	title: "About/DividerLine/Line",
	component: Line,
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
} satisfies Meta<typeof Line>;

export default lineMeta;
type Story = StoryObj<typeof Line>;

export const Default: Story = {};

const dividerMeta = {
	title: "About/DividerLine/Divider",
	component: Divider,
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
	tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export const DoubleLine: Story = {};
