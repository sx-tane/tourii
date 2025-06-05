import type { Meta, StoryObj } from "@storybook/react";
import LinkBridge from "./link-bridge";

const meta = {
	title: "World/LinkBridge",
	component: LinkBridge,
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
} satisfies Meta<typeof LinkBridge>;

export default meta;
type Story = StoryObj<typeof LinkBridge>;

export const Default: Story = {
	args: {
		japaneseTitle: "歴史",
		englishTitle: "History",
	},
};

export const LongTitle: Story = {
	args: {
		japaneseTitle: "伝統と革新",
		englishTitle: "Tradition & Innovation",
	},
};

export const OnDark: Story = {
	args: {
		japaneseTitle: "文化",
		englishTitle: "Culture",
	},
	parameters: {
		backgrounds: { default: "dark" },
	},
};

export const Mobile: Story = {
	args: {
		japaneseTitle: "芸術",
		englishTitle: "Art",
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile",
		},
	},
};
