import type { Meta, StoryObj } from "@storybook/react";
import QuestCard from "./quest-card";

const meta: Meta<typeof QuestCard> = {
	title: "Homepage/Highlights/QuestCard",
	component: QuestCard,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Quest card component for homepage highlights",
			},
		},
	},
	argTypes: {
		questId: { control: "text" },
		title: { control: "text" },
		imageUrl: { control: "text" },
		link: { control: "text" },
		questType: { control: "text" },
		totalMagatamaPointAwarded: { control: "number" },
		isPremium: { control: "boolean" },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		questId: "quest-1",
		title: "Harajiri Fall Quest",
		imageUrl: "/image/model-route/1/harajiri-fall/1.jpg",
		link: null,
		questType: "GPS",
		totalMagatamaPointAwarded: 50,
		isPremium: false,
	},
};

export const Premium: Story = {
	args: {
		questId: "quest-2",
		title: "Premium Shrine Experience",
		imageUrl: "/image/model-route/1/kashima-shrine/1.jpg",
		link: null,
		questType: "QR",
		totalMagatamaPointAwarded: 100,
		isPremium: true,
	},
};

export const NoImage: Story = {
	args: {
		questId: "quest-3",
		title: "Mystery Quest Adventure",
		imageUrl: null,
		link: null,
		questType: "PHOTO",
		totalMagatamaPointAwarded: 75,
		isPremium: false,
	},
};

export const LongTitle: Story = {
	args: {
		questId: "quest-4",
		title: "This is a very long quest title that should be truncated properly",
		imageUrl: "/image/model-route/2/fukoji-temple/1.jpg", 
		link: null,
		questType: "TEXT",
		totalMagatamaPointAwarded: 25,
		isPremium: false,
	},
};