import type { Meta, StoryObj } from "@storybook/react";
import { ActionItems } from "./action-items";

const meta: Meta<typeof ActionItems> = {
	title: "Admin/Analytics/ActionItems",
	component: ActionItems,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIssues: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 5,
			questsWithoutTouristSpot: 3,
		},
		quality: {
			averageTasksPerQuest: 2.1,
		},
		engagement: {
			premiumQuests: 0,
		},
	},
};

export const AllGood: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 0,
			questsWithoutTouristSpot: 0,
		},
		quality: {
			averageTasksPerQuest: 4.2,
		},
		engagement: {
			premiumQuests: 5,
		},
	},
};

export const MinorIssues: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 0,
			questsWithoutTouristSpot: 2,
		},
		quality: {
			averageTasksPerQuest: 3.5,
		},
		engagement: {
			premiumQuests: 3,
		},
	},
};