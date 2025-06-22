import type { Meta, StoryObj } from "@storybook/react";
import QuestOverview from "./quest-overview";

// Type alias for tasks within a quest
type QuestTask = {
	taskId: string;
	taskTheme: "STORY" | "LOCAL_CULTURE" | "FOOD" | "URBAN_EXPLORE" | "NATURE";
	taskType:
		| "VISIT_LOCATION"
		| "PHOTO_UPLOAD"
		| "ANSWER_TEXT"
		| "SELECT_OPTION"
		| "SHARE_SOCIAL"
		| "CHECK_IN"
		| "GROUP_ACTIVITY"
		| "LOCAL_INTERACTION";
	taskName: string;
	taskDesc: string;
	isUnlocked: boolean;
	requiredAction: string;
	groupActivityMembers?: Array<any>;
	selectOptions?: Array<any>;
	antiCheatRules: any;
	magatamaPointAwarded: number;
	rewardEarned?: string;
	isCompleted: boolean;
	delFlag?: boolean;
	insUserId?: string;
	insDateTime?: string;
	updUserId?: string;
	updDateTime?: string;
};

type QuestData = {
	questId: string;
	questName: string;
	questDesc: string;
	questImage?: string;
	questType:
		| "UNKNOWN"
		| "TRAVEL_TO_EARN"
		| "EARN_TO_TRAVEL"
		| "CAMPAIGN"
		| "COMMUNITY_EVENT";
	isUnlocked: boolean;
	isPremium: boolean;
	totalMagatamaPointAwarded: number;
	tasks?: QuestTask[];
	touristSpot?: {
		touristSpotId: string;
		storyChapterId: string;
		touristSpotName: string;
		touristSpotDesc: string;
		bestVisitTime: string;
		address: string;
		touristSpotLatitude: number;
		touristSpotLongitude: number;
		touristSpotHashtag: Array<string>;
		storyChapterLink?: string;
		imageSet?: {
			main: string;
			small: Array<string>;
		};
		weatherInfo?: {
			temperatureCelsius: number;
			weatherName: string;
			weatherDesc: string;
		};
		delFlag?: boolean;
		insUserId?: string;
		insDateTime?: string;
		updUserId?: string;
		updDateTime?: string;
	};
	delFlag?: boolean;
	insUserId?: string;
	insDateTime?: string;
	updUserId?: string;
	updDateTime?: string;
};

const mockQuest: QuestData = {
	questId: "1",
	questName: "The Fox Shrine Adventure",
	questDesc:
		"Embark on a mystical journey through the ancient Fushimi Inari Shrine in Kyoto. Discover the secrets of the fox spirits, walk through the iconic torii gates, and immerse yourself in Japanese culture and tradition. This quest will take you through sacred grounds, teach you about Shinto beliefs, and allow you to experience one of Japan's most spiritual and beautiful locations.",
	questImage:
		"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80",
	questType: "TRAVEL_TO_EARN",
	isUnlocked: true,
	isPremium: false,
	totalMagatamaPointAwarded: 500,
	touristSpot: {
		touristSpotId: "ts-1",
		storyChapterId: "sc-1",
		touristSpotName: "Fushimi Inari Shrine",
		touristSpotDesc:
			"Famous for its thousands of vermilion torii gates, which straddle a network of trails behind its main buildings.",
		bestVisitTime: "Early morning or evening",
		address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto, Japan",
		touristSpotLatitude: 34.9671,
		touristSpotLongitude: 135.7727,
		touristSpotHashtag: ["#kyoto", "#shrine", "#japan", "#culture"],
	},
	tasks: [
		{
			taskId: "answer-text-1",
			taskTheme: "STORY",
			taskType: "ANSWER_TEXT",
			taskName: "Riddle of the Fox",
			taskDesc:
				"What has a single eye but cannot see? Answer this ancient riddle to proceed.",
			isUnlocked: true,
			requiredAction: "Answer the riddle",
			groupActivityMembers: [],
			selectOptions: [],
			antiCheatRules: {},
			magatamaPointAwarded: 50,
			isCompleted: true,
		},
		{
			taskId: "select-option-1",
			taskTheme: "STORY",
			taskType: "SELECT_OPTION",
			taskName: "Path to the Shrine",
			taskDesc: "Choose the correct path to reach the main shrine building.",
			isUnlocked: true,
			requiredAction: "Select the correct option",
			groupActivityMembers: [],
			selectOptions: [
				{ optionId: 1, optionText: "Left path through the bamboo forest" },
				{ optionId: 2, optionText: "Right path up the stone stairs" },
				{ optionId: 3, optionText: "Center path through the torii gates" },
			],
			antiCheatRules: {},
			magatamaPointAwarded: 75,
			isCompleted: false,
		},
		{
			taskId: "check-in-1",
			taskTheme: "STORY",
			taskType: "CHECK_IN",
			taskName: "Main Gate Check-in",
			taskDesc:
				"Check in at the main gate of Fushimi Inari Shrine to begin your journey.",
			isUnlocked: true,
			requiredAction: "Check in at location",
			groupActivityMembers: [],
			selectOptions: [],
			antiCheatRules: {},
			magatamaPointAwarded: 100,
			isCompleted: false,
		},
		{
			taskId: "photo-upload-1",
			taskTheme: "LOCAL_CULTURE",
			taskType: "PHOTO_UPLOAD",
			taskName: "Capture the Torii Gates",
			taskDesc:
				"Take a photo of the iconic torii gates tunnel. Make sure to capture the beautiful vermilion color.",
			isUnlocked: false,
			requiredAction: "Upload a photo",
			groupActivityMembers: [],
			selectOptions: [],
			antiCheatRules: {},
			magatamaPointAwarded: 125,
			isCompleted: false,
		},
		{
			taskId: "visit-location-1",
			taskTheme: "NATURE",
			taskType: "VISIT_LOCATION",
			taskName: "Summit Viewpoint",
			taskDesc:
				"Reach the summit of Mount Inari for a breathtaking view of Kyoto city.",
			isUnlocked: false,
			requiredAction: "Visit the location",
			groupActivityMembers: [],
			selectOptions: [],
			antiCheatRules: {},
			magatamaPointAwarded: 150,
			isCompleted: false,
		},
	],
};

const mockQuestWithNoTasks: QuestData = {
	...mockQuest,
	questId: "2",
	questName: "Empty Quest",
	questDesc: "This quest has no tasks assigned to it yet.",
	tasks: [],
};

const mockLockedQuest: QuestData = {
	...mockQuest,
	questId: "3",
	questName: "Premium Quest",
	questDesc: "This is a premium quest that requires special access.",
	isUnlocked: false,
	isPremium: true,
	tasks: [
		{
			taskId: "locked-task-1",
			taskTheme: "STORY",
			taskType: "ANSWER_TEXT",
			taskName: "Locked Task",
			taskDesc: "This task is locked until the quest is unlocked.",
			isUnlocked: false,
			requiredAction: "Unlock the quest first",
			groupActivityMembers: [],
			selectOptions: [],
			antiCheatRules: {},
			magatamaPointAwarded: 200,
			isCompleted: false,
		},
	],
};

const meta: Meta<typeof QuestOverview> = {
	title: "Quest/QuestOverview",
	component: QuestOverview,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"A comprehensive quest overview component that displays quest information, progress, and all associated tasks with their current status.",
			},
		},
	},
	argTypes: {
		quest: {
			description:
				"The quest data object containing all quest information and tasks",
		},
	},
};
export default meta;

type Story = StoryObj<typeof QuestOverview>;

export const Default: Story = {
	args: {
		quest: mockQuest as any,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Default quest overview with mixed task states (completed, available, locked) and full quest information.",
			},
		},
	},
};

export const NoTasks: Story = {
	args: {
		quest: mockQuestWithNoTasks as any,
	},
	parameters: {
		docs: {
			description: {
				story: "Quest overview when there are no tasks assigned to the quest.",
			},
		},
	},
};

export const LockedQuest: Story = {
	args: {
		quest: mockLockedQuest as any,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Premium quest that is locked, showing locked tasks that cannot be accessed.",
			},
		},
	},
};

export const AllTasksCompleted: Story = {
	args: {
		quest: {
			...mockQuest,
			tasks: mockQuest.tasks?.map((task: QuestTask) => ({
				...task,
				isCompleted: true,
				isUnlocked: true,
			})),
		} as any,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Quest with all tasks completed, showing 100% progress and green completion indicators.",
			},
		},
	},
};
