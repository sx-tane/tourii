import type { Meta, StoryObj } from "@storybook/react";
import RecommendedActions from "./recommended-actions";

const meta: Meta<typeof RecommendedActions> = {
	title: "Admin/Analytics/RecommendedActions",
	component: RecommendedActions,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIssues: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 12,
			questsWithoutTouristSpot: 5,
		},
		quality: {
			averageTasksPerQuest: 2.1,
		},
		engagement: {
			premiumQuests: 0,
		},
	},
};

export const SomeIssues: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 3,
			questsWithoutTouristSpot: 0,
		},
		quality: {
			averageTasksPerQuest: 4.2,
		},
		engagement: {
			premiumQuests: 8,
		},
	},
};

export const AllHealthy: Story = {
	args: {
		contentHealth: {
			questsWithoutImage: 0,
			questsWithoutTouristSpot: 0,
		},
		quality: {
			averageTasksPerQuest: 4.5,
		},
		engagement: {
			premiumQuests: 15,
		},
	},
};
