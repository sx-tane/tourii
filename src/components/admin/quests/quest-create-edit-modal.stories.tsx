import type { Meta, StoryObj } from "@storybook/react";
import { QuestCreateRequestDto, QuestResponseDto } from "@/api/generated";
import QuestCreateEditModal from "./quest-create-edit-modal";

const meta: Meta<typeof QuestCreateEditModal> = {
	title: "Admin/Quests/QuestCreateEditModal",
	component: QuestCreateEditModal,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockForm: QuestCreateRequestDto = {
	touristSpotId: "SPOT-KIYOMIZU",
	questName: "Temple Guardian Challenge",
	questDesc: "Discover the ancient secrets hidden within Kiyomizu Temple's sacred grounds.",
	questImage: "https://example.com/quest-image.jpg",
	questType: QuestCreateRequestDto.questType.TRAVEL_TO_EARN,
	rewardType: QuestCreateRequestDto.rewardType.CULTURAL_COMMUNITY,
	totalMagatamaPointAwarded: 150,
	isPremium: false,
	isUnlocked: true,
	delFlag: false,
};

const mockEditingQuest: QuestResponseDto = {
	questId: "QUEST-001",
	questName: "Temple Guardian Challenge",
	questDesc: "Discover the ancient secrets hidden within Kiyomizu Temple's sacred grounds.",
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

export const CreateMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingQuest: null,
		form: {
			touristSpotId: "",
			questName: "",
			questDesc: "",
			questImage: "",
			questType: QuestResponseDto.questType.TRAVEL_TO_EARN,
			rewardType: "MAGATAMA_POINT",
			totalMagatamaPointAwarded: 0,
			isPremium: false,
			isUnlocked: false,
		},
		onFormChange: (updates: Partial<QuestCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};

export const EditMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingQuest: mockEditingQuest,
		form: mockForm,
		onFormChange: (updates: Partial<QuestCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};

export const Submitting: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingQuest: null,
		form: mockForm,
		onFormChange: (updates: Partial<QuestCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: true,
	},
};

export const PremiumQuest: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingQuest: {
			...mockEditingQuest,
			isPremium: true,
			totalMagatamaPointAwarded: 300,
		},
		form: {
			...mockForm,
			isPremium: true,
			totalMagatamaPointAwarded: 300,
		},
		onFormChange: (updates: Partial<QuestCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};

export const Closed: Story = {
	args: {
		isOpen: false,
		onClose: () => console.log("Close modal"),
		editingQuest: null,
		form: mockForm,
		onFormChange: (updates: Partial<QuestCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};