import type { Meta, StoryObj } from "@storybook/react";
import { QuestCard } from "./quest-card";

const meta = {
	title: "Homepage/QuestCard",
	component: QuestCard,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#E3E3DC" },
				{ name: "dark", value: "#21211B" },
			],
		},
	},
	argTypes: {
		questId: { control: "text" },
		title: { control: "text" },
		imageUrl: { control: "text" },
		link: { control: "text" },
		index: { control: "number" },
		forceAspectRatio: {
			control: "select",
			options: ["normal", "wider"],
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof QuestCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		questId: "demo-quest-1",
		title: "Explore Sacred Temple",
		imageUrl: "/image/touriiverse/bungo-ono/chapter1.png",
		link: "/v2/quests/demo-quest-1",
		index: 0,
		forceAspectRatio: "normal",
	},
};

export const WiderAspectRatio: Story = {
	args: {
		questId: "demo-quest-2",
		title: "Cherry Blossom Hunt Adventure",
		imageUrl: "/image/touriiverse/bungo-ono/chapter1.png",
		link: "/v2/quests/demo-quest-2",
		index: 0,
		forceAspectRatio: "wider",
	},
};

export const LongTitle: Story = {
	args: {
		questId: "demo-quest-3",
		title:
			"Mountain Hiking Quest with Very Long Title That Should Be Truncated",
		imageUrl: "/image/touriiverse/bungo-ono/chapter1.png",
		link: "/v2/quests/demo-quest-3",
		index: 0,
		forceAspectRatio: "normal",
	},
};

export const WithoutImage: Story = {
	args: {
		questId: "demo-quest-4",
		title: "Quest Without Image",
		imageUrl: null,
		link: "/v2/quests/demo-quest-4",
		index: 0,
		forceAspectRatio: "normal",
	},
};

export const WithDarkBackground: Story = {
	args: {
		questId: "demo-quest-5",
		title: "Dark Background Quest",
		imageUrl: "/image/touriiverse/bungo-ono/chapter1.png",
		link: "/v2/quests/demo-quest-5",
		index: 0,
		forceAspectRatio: "normal",
	},
	parameters: {
		backgrounds: {
			default: "dark",
		},
	},
};
