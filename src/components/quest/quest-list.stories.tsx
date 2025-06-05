import type { Meta, StoryObj } from "@storybook/react";
import QuestList from "./quest-list";

const meta: Meta<typeof QuestList> = {
	title: "Quest/QuestList",
	component: QuestList,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuestList>;

const mockQuests = {
	quests: [
		{
			questId: "1",
			questName: "Explore Tokyo",
			questDesc: "Visit 5 famous landmarks in Tokyo and earn points",
			questImage:
				"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000",
			questType: "TRAVEL_TO_EARN",
			isUnlocked: true,
			isPremium: false,
			totalMagatamaPointAwarded: 100,
		},
		{
			questId: "2",
			questName: "Kyoto Temple Tour",
			questDesc: "Visit 3 ancient temples in Kyoto",
			questImage:
				"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000",
			questType: "TRAVEL_TO_EARN",
			isUnlocked: false,
			isPremium: true,
			totalMagatamaPointAwarded: 150,
		},
		{
			questId: "3",
			questName: "Summer Festival",
			questDesc: "Participate in the annual summer festival",
			questImage:
				"https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000",
			questType: "COMMUNITY_EVENT",
			isUnlocked: true,
			isPremium: false,
			totalMagatamaPointAwarded: 75,
		},
		{
			questId: "4",
			questName: "Food Tour Challenge",
			questDesc: "Try 10 different local dishes",
			questImage:
				"https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
			questType: "CAMPAIGN",
			isUnlocked: true,
			isPremium: true,
			totalMagatamaPointAwarded: 200,
		},
	],
	pagination: {
		currentPage: 1,
		totalPages: 3,
		totalItems: 12,
		itemsPerPage: 4,
	},
} as const;

const defaultFilters = {
	questType: "all",
	unlockStatus: "all",
	premiumStatus: "all",
};

const noop = () => {};

export const Default: Story = {
	args: {
		quests: {
			quests: [...mockQuests.quests],
			pagination: {
				...mockQuests.pagination,
				totalQuests: mockQuests.pagination.totalItems,
			},
		},
		filters: defaultFilters,
		onFilterChange: noop,
		onPageChange: noop,
		isLoading: false,
		error: null,
	},
};

export const Empty: Story = {
	args: {
		quests: {
			quests: [],
			pagination: {
				currentPage: 1,
				totalPages: 0,
				totalQuests: 0,
			},
		},
		filters: defaultFilters,
		onFilterChange: noop,
		onPageChange: noop,
		isLoading: false,
		error: null,
	},
};

export const SingleQuest: Story = {
	args: {
		quests: {
			quests: [mockQuests.quests[0]],
			pagination: {
				currentPage: 1,
				totalPages: 1,
				totalQuests: 1,
			},
		},
		filters: defaultFilters,
		onFilterChange: noop,
		onPageChange: noop,
		isLoading: false,
		error: null,
	},
};

export const PremiumOnly: Story = {
	args: {
		quests: {
			quests: mockQuests.quests.filter((quest) => quest.isPremium),
			pagination: {
				currentPage: 1,
				totalPages: 1,
				totalQuests: 2,
			},
		},
		filters: defaultFilters,
		onFilterChange: noop,
		onPageChange: noop,
		isLoading: false,
		error: null,
	},
};

export const LockedOnly: Story = {
	args: {
		quests: {
			quests: mockQuests.quests.filter((quest) => !quest.isUnlocked),
			pagination: {
				currentPage: 1,
				totalPages: 1,
				totalQuests: 1,
			},
		},
		filters: defaultFilters,
		onFilterChange: noop,
		onPageChange: noop,
		isLoading: false,
		error: null,
	},
};
