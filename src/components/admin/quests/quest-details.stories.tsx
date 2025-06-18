import type { Meta, StoryObj } from "@storybook/react";
import { QuestDetails } from "./quest-details";
import type { QuestResponseDto } from "@/api/generated";

const meta: Meta<typeof QuestDetails> = {
	title: "Admin/Quests/QuestDetails",
	component: QuestDetails,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuest: QuestResponseDto = {
	questId: "quest-123",
	touristSpotId: "spot-456",
	questName: "Temple Discovery Quest",
	questDesc: "Explore the ancient temple and discover its hidden secrets through various interactive tasks",
	questImage: "https://example.com/temple-quest.jpg",
	questType: "TRAVEL_TO_EARN",
	isUnlocked: true,
	isPremium: false,
	totalMagatamaPointAwarded: 200,
	rewardType: "MAGATAMA_POINTS",
	delFlag: false,
	touristSpot: {
		touristSpotId: "spot-456",
		touristSpotName: "Senso-ji Temple",
		touristSpotDesc: "Tokyo's oldest temple with rich cultural heritage",
		bestVisitTime: "Early morning",
		address: "2-3-1 Asakusa, Taito City, Tokyo",
		touristSpotLatitude: 35.7147,
		touristSpotLongitude: 139.7967,
		touristSpotHashtag: ["temple", "historic", "tokyo"],
	},
	tasks: [
		{
			taskId: "task-1",
			taskName: "Take a Photo",
			taskDesc: "Capture the main gate of the temple",
			taskType: "PHOTO_UPLOAD",
			taskOrder: 1,
		},
		{
			taskId: "task-2", 
			taskName: "Find the Hidden Stone",
			taskDesc: "Locate the stone marker near the main hall",
			taskType: "QR_CODE_SCAN",
			taskOrder: 2,
		},
		{
			taskId: "task-3",
			taskName: "Share Your Experience",
			taskDesc: "Post about your visit on social media",
			taskType: "SOCIAL_SHARE",
			taskOrder: 3,
		},
	],
	insDateTime: "2024-01-15T09:30:00Z",
	updDateTime: "2024-01-20T15:45:00Z",
};

export const Default: Story = {
	args: {
		quest: mockQuest,
	},
};

export const PremiumQuest: Story = {
	args: {
		quest: {
			...mockQuest,
			isPremium: true,
			totalMagatamaPointAwarded: 500,
		},
	},
};

export const MinimalData: Story = {
	args: {
		quest: {
			questId: "quest-minimal",
			questName: "Simple Quest",
			questDesc: "A basic quest with minimal data",
			questType: "UNKNOWN",
			isUnlocked: false,
			isPremium: false,
			totalMagatamaPointAwarded: 50,
			rewardType: "UNKNOWN",
			delFlag: false,
			tasks: [],
		},
	},
};