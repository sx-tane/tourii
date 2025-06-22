import { StoryCompletionResponseDto } from "@/api/generated/models/StoryCompletionResponseDto";
import type { Meta, StoryObj } from "@storybook/react";
import { QuestUnlockModal } from "./QuestUnlockModal";

const meta: Meta<typeof QuestUnlockModal> = {
	title: "Quest/QuestUnlockModal",
	component: QuestUnlockModal,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockStoryCompletion: StoryCompletionResponseDto = {
	success: true,
	message: "Story chapter completed successfully!",
	storyProgress: {
		storyChapterId: "chapter-001",
		chapterTitle: "The Sacred Journey Begins",
		status: StoryCompletionResponseDto.status.COMPLETED,
		completedAt: new Date().toISOString(),
	},
	unlockedQuests: [
		{
			questId: "quest-001",
			questName: "Visit the Sacred Shrine",
			questDesc: "Explore the ancient shrine and discover its secrets",
			questImage: "/image/model-route/1/anamori-shrine/1.jpg",
			touristSpotName: "Anamori Shrine",
			totalMagatamaPointAwarded: 100,
			isPremium: false,
		},
		{
			questId: "quest-002",
			questName: "Photograph the Waterfall",
			questDesc: "Capture the beauty of the cascading waters",
			questImage: "/image/model-route/1/harajiri-fall/1.jpg",
			touristSpotName: "Harajiri Falls",
			totalMagatamaPointAwarded: 150,
			isPremium: true,
		},
	],
	rewards: {
		magatamaPointsEarned: 250,
		achievementsUnlocked: ["First Quest Completed", "Chapter Master"],
	},
};

export const Default: Story = {
	args: {
		isOpen: true,
		onClose: () => {},
		storyCompletion: mockStoryCompletion,
	},
};

export const WithSingleQuest: Story = {
	args: {
		isOpen: true,
		onClose: () => {},
		storyCompletion: {
			...mockStoryCompletion,
			unlockedQuests: [mockStoryCompletion.unlockedQuests[0]],
		},
	},
};

export const WithNoQuests: Story = {
	args: {
		isOpen: true,
		onClose: () => {},
		storyCompletion: {
			...mockStoryCompletion,
			unlockedQuests: [],
		},
	},
};

export const Closed: Story = {
	args: {
		isOpen: false,
		onClose: () => {},
		storyCompletion: mockStoryCompletion,
	},
};
