import type { Meta, StoryObj } from "@storybook/react";
import PopularQuestList from "./popular-quest-list";

const meta: Meta<typeof PopularQuestList> = {
	title: "Homepage/Highlights/PopularQuestList",
	component: PopularQuestList,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component: "Popular quest list component for homepage highlights",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuests = [
	{
		questId: "quest-1",
		title: "Harajiri Fall Quest",
		imageUrl: "/image/model-route/1/harajiri-fall/1.jpg",
		link: null,
	},
	{
		questId: "quest-2",
		title: "Kashima Shrine Adventure",
		imageUrl: "/image/model-route/1/kashima-shrine/1.jpg",
		link: null,
	},
	{
		questId: "quest-3",
		title: "Fukoji Temple Journey",
		imageUrl: "/image/model-route/2/fukoji-temple/1.jpg",
		link: null,
	},
];

export const Default: Story = {
	args: {
		quests: mockQuests,
	},
};

export const TwoQuests: Story = {
	args: {
		quests: mockQuests.slice(0, 2),
	},
};

export const SingleQuest: Story = {
	args: {
		quests: [mockQuests[0]],
	},
};

export const Empty: Story = {
	args: {
		quests: [],
	},
};

export const LargeTitles: Story = {
	args: {
		quests: [
			{
				questId: "quest-1",
				title: "This is a very long quest title that should be handled properly in the layout",
				imageUrl: "/image/model-route/1/harajiri-fall/1.jpg",
				link: null,
			},
			{
				questId: "quest-2",
				title: "Another extremely long quest title to test responsive behavior",
				imageUrl: "/image/model-route/1/kashima-shrine/1.jpg",
				link: null,
			},
		],
	},
};