import type { Meta, StoryObj } from "@storybook/react";
import { QuestCard } from "./quest-card";

const meta: Meta<typeof QuestCard> = {
	title: "Homepage/QuestCard",
	component: QuestCard,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#f5f5f5" },
				{ name: "dark", value: "#333333" },
			],
		},
	},
	tags: ["autodocs"],
	argTypes: {
		questId: {
			control: "text",
			description: "Unique quest identifier",
		},
		title: {
			control: "text",
			description: "Quest title (fallback when API data unavailable)",
		},
		imageUrl: {
			control: "text",
			description: "Quest image URL (fallback when API data unavailable)",
		},
		link: {
			control: "text",
			description: "Quest page link",
		},
		index: {
			control: { type: "number", min: 0 },
			description: "Animation delay index",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-64">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof QuestCard>;

export const Default: Story = {
	args: {
		questId: "demo-quest-1",
		title: "Explore Sacred Temple",
		imageUrl: "/image/touriiverse/bungo-ono/chapter1.png",
		link: "/v2/quests/demo-quest-1",
		index: 0,
	},
};

export const LongTitle: Story = {
	args: {
		questId: "demo-quest-2",
		title:
			"Cherry Blossom Festival Photography Challenge and Cultural Experience",
		imageUrl: "/image/touriiverse/bungo-ono/chapter2.png",
		link: "/v2/quests/demo-quest-2",
		index: 1,
	},
};

export const DifferentImage: Story = {
	args: {
		questId: "demo-quest-3",
		title: "Mountain Hiking Quest",
		imageUrl: "/image/touriiverse/bungo-ono/chapter3.png",
		link: "/v2/quests/demo-quest-3",
		index: 2,
	},
};

export const FallbackImage: Story = {
	args: {
		questId: "demo-quest-4",
		title: "Quest with Fallback Image",
		imageUrl: null,
		link: "/v2/quests/demo-quest-4",
		index: 0,
	},
};

export const NoLink: Story = {
	args: {
		questId: "demo-quest-5",
		title: "Quest without Link",
		imageUrl: "/image/touriiverse/bungo-ono/chapter4.png",
		link: null,
		index: 0,
	},
};

export const WithApiData: Story = {
	args: {
		questId: "real-quest-1",
		title: "Fallback Title",
		imageUrl: "/image/touriiverse/bungo-ono/chapter1.png",
		link: "/v2/quests/real-quest-1",
		index: 0,
	},
	parameters: {
		docs: {
			description: {
				story: "Quest card that would fetch real data from API (in actual app)",
			},
		},
	},
};
