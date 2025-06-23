import type { Meta, StoryObj } from "@storybook/react";
import { QuestResponseDto } from "@/api/generated";
import QuestTable from "./quest-table";

const meta: Meta<typeof QuestTable> = {
	title: "Admin/Quests/QuestTable",
	component: QuestTable,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuests: QuestResponseDto[] = [
	{
		questId: "QUEST-001",
		questName: "Temple Guardian Challenge",
		questDesc: "Discover the ancient secrets hidden within Kiyomizu Temple's sacred grounds.",
		questImage: "https://example.com/quest1.jpg",
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
	},
	{
		questId: "QUEST-002",
		questName: "Bamboo Forest Mystery",
		questDesc: "Navigate through the mystical bamboo groves of Arashiyama.",
		questImage: undefined,
		questType: QuestResponseDto.questType.EARN_TO_TRAVEL,
		totalMagatamaPointAwarded: 200,
		isUnlocked: false,
		isPremium: true,
		touristSpot: {
			touristSpotId: "SPOT-ARASHIYAMA",
			storyChapterId: "CHAPTER-002",
			touristSpotName: "Arashiyama Bamboo Grove",
			touristSpotDesc: "A mystical bamboo forest",
			bestVisitTime: "Evening",
			address: "Arashiyama Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto, Japan",
			touristSpotLatitude: 35.0170,
			touristSpotLongitude: 135.6726,
			touristSpotHashtag: ["#bamboo", "#nature"],
		},
		tasks: [],
	},
	{
		questId: "QUEST-003",
		questName: "Unassigned Quest",
		questDesc: "A quest without a tourist spot assignment.",
		questImage: "https://example.com/quest3.jpg",
		questType: QuestResponseDto.questType.CAMPAIGN,
		totalMagatamaPointAwarded: 100,
		isUnlocked: true,
		isPremium: false,
		touristSpot: undefined,
		tasks: [],
	},
];

const getQuestTypeColor = (type: string) => {
	switch (type) {
		case "GPS_CHECKIN":
			return "bg-green-100 text-green-800";
		case "PHOTO_UPLOAD":
			return "bg-blue-100 text-blue-800";
		case "QR_SCAN":
			return "bg-purple-100 text-purple-800";
		case "ANSWER_TEXT":
			return "bg-orange-100 text-orange-800";
		case "GROUP_QUEST":
			return "bg-pink-100 text-pink-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export const Default: Story = {
	args: {
		quests: mockQuests,
		selectedQuests: [],
		onToggleSelection: (questId: string) => console.log("Toggle selection:", questId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (quest: QuestResponseDto) => console.log("Edit quest:", quest.questName),
		getQuestTypeColor,
	},
};

export const WithSelection: Story = {
	args: {
		quests: mockQuests,
		selectedQuests: ["QUEST-001", "QUEST-003"],
		onToggleSelection: (questId: string) => console.log("Toggle selection:", questId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (quest: QuestResponseDto) => console.log("Edit quest:", quest.questName),
		getQuestTypeColor,
	},
};

export const AllSelected: Story = {
	args: {
		quests: mockQuests,
		selectedQuests: ["QUEST-001", "QUEST-002", "QUEST-003"],
		onToggleSelection: (questId: string) => console.log("Toggle selection:", questId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (quest: QuestResponseDto) => console.log("Edit quest:", quest.questName),
		getQuestTypeColor,
	},
};

export const EmptyState: Story = {
	args: {
		quests: [],
		selectedQuests: [],
		onToggleSelection: (questId: string) => console.log("Toggle selection:", questId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (quest: QuestResponseDto) => console.log("Edit quest:", quest.questName),
		getQuestTypeColor,
	},
};