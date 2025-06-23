import type { Meta, StoryObj } from "@storybook/react";
import { QuestResponseDto } from "@/api/generated";
import QuestInfoDisplay from "./quest-info-display";

const meta: Meta<typeof QuestInfoDisplay> = {
	title: "Admin/Quests/QuestInfoDisplay",
	component: QuestInfoDisplay,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuest: QuestResponseDto = {
	questId: "QUEST-001",
	questName: "Temple Guardian Challenge",
	questDesc: "Discover the ancient secrets hidden within Kiyomizu Temple's sacred grounds. Navigate through the temple complex, solve ancient riddles, and unlock the mysteries of the guardian spirits.",
	questImage: "https://example.com/quest-image.jpg",
	questType: QuestResponseDto.questType.TRAVEL_TO_EARN,
	totalMagatamaPointAwarded: 150,
	isUnlocked: true,
	isPremium: false,
	touristSpot: {
		touristSpotId: "SPOT-KIYOMIZU",
		storyChapterId: "CHAPTER-001",
		touristSpotName: "Kiyomizu Temple",
		touristSpotDesc: "A famous Buddhist temple",
		bestVisitTime: "Morning",
		address: "1-294 Kiyomizu, Higashiyama Ward, Kyoto, Japan",
		touristSpotLatitude: 34.9949,
		touristSpotLongitude: 135.7851,
		touristSpotHashtag: ["#temple", "#heritage"],
	},
	tasks: [],
};

export const Default: Story = {
	args: {
		quest: mockQuest,
		stats: {
			total: 3,
			withSpots: 2,
			totalPoints: 450,
			avgPoints: 150,
		},
	},
};

export const LargeQuest: Story = {
	args: {
		quest: {
			...mockQuest,
			questName: "Epic Kyoto Adventure",
			questDesc: "A comprehensive quest spanning multiple districts of Kyoto, featuring complex challenges, social elements, and deep cultural exploration. This quest combines traditional Japanese culture with modern technology to create an immersive experience.",
		},
		stats: {
			total: 12,
			withSpots: 8,
			totalPoints: 1800,
			avgPoints: 150,
		},
	},
};

export const MinimalQuest: Story = {
	args: {
		quest: {
			...mockQuest,
			questDesc: "",
		},
		stats: {
			total: 1,
			withSpots: 0,
			totalPoints: 100,
			avgPoints: 100,
		},
	},
};

export const NoTasks: Story = {
	args: {
		quest: {
			...mockQuest,
			tasks: [],
		},
		stats: {
			total: 0,
			withSpots: 0,
			totalPoints: 0,
			avgPoints: 0,
		},
	},
};