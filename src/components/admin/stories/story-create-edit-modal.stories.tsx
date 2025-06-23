import type { Meta, StoryObj } from "@storybook/react";
import type { StoryCreateRequestDto, StoryResponseDto } from "@/api/generated";
import StoryCreateEditModal from "./story-create-edit-modal";

const meta: Meta<typeof StoryCreateEditModal> = {
	title: "Admin/Stories/StoryCreateEditModal",
	component: StoryCreateEditModal,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockForm: StoryCreateRequestDto = {
	sagaName: "The Legend of Sakura",
	sagaDesc: "A mystical journey through ancient Japan, where cherry blossoms hold the key to unlocking forgotten powers.",
	location: "Kyoto, Japan",
	order: 1,
	backgroundMedia: "https://example.com/sakura-background.jpg",
	mapImage: "https://example.com/kyoto-map.jpg",
	isPrologue: false,
	isSelected: true,
};

const mockEditingStory: StoryResponseDto = {
	storyId: "STORY-2025-001",
	sagaName: "The Legend of Sakura",
	sagaDesc: "A mystical journey through ancient Japan, where cherry blossoms hold the key to unlocking forgotten powers.",
	location: "Kyoto, Japan",
	order: 1,
	backgroundMedia: "https://example.com/sakura-background.jpg",
	mapImage: "https://example.com/kyoto-map.jpg",
	isPrologue: false,
	isSelected: true,
	insDateTime: "2025-06-20T10:30:00Z",
	updDateTime: "2025-06-21T14:45:00Z",
	insUserId: "ADMIN-001",
	updUserId: "ADMIN-002",
	chapterList: [
		{
			storyId: "STORY-2025-001",
			touristSpotId: "SPOT-KIYOMIZU",
			storyChapterId: "CHAPTER-001",
			sagaName: "The Legend of Sakura",
			chapterNumber: "1",
			chapterTitle: "The Awakening",
			chapterDesc: "The mystical journey begins at the ancient temple where cherry blossoms hold ancient secrets.",
			chapterImage: "https://example.com/chapter1.jpg",
			characterNameList: ["Sakura", "Takeshi"],
			realWorldImage: "https://example.com/kiyomizu.jpg",
			chapterVideoUrl: "https://example.com/video1.mp4",
			chapterVideoMobileUrl: "https://example.com/mobile1.mp4",
			chapterPdfUrl: "https://example.com/chapter1.pdf",
			isUnlocked: true,
			delFlag: false,
			insUserId: "ADMIN-001",
			insDateTime: "2025-06-20T10:30:00Z",
			updUserId: "ADMIN-002",
			updDateTime: "2025-06-21T14:45:00Z",
		},
		{
			storyId: "STORY-2025-001",
			touristSpotId: "SPOT-FUSHIMI",
			storyChapterId: "CHAPTER-002",
			sagaName: "The Legend of Sakura",
			chapterNumber: "2",
			chapterTitle: "Journey to the Sacred Grove",
			chapterDesc: "Our heroes venture into the mystical bamboo forest where ancient spirits dwell.",
			chapterImage: "https://example.com/chapter2.jpg",
			characterNameList: ["Sakura", "Yuki", "Elder Matsumoto"],
			realWorldImage: "https://example.com/fushimi.jpg",
			chapterVideoUrl: "",
			chapterVideoMobileUrl: "",
			chapterPdfUrl: "",
			isUnlocked: false,
			delFlag: false,
			insUserId: "ADMIN-001",
			insDateTime: "2025-06-20T11:15:00Z",
			updUserId: "ADMIN-001",
			updDateTime: "2025-06-21T15:30:00Z",
		},
		{
			storyId: "STORY-2025-001",
			touristSpotId: "SPOT-GION",
			storyChapterId: "CHAPTER-003",
			sagaName: "The Legend of Sakura",
			chapterNumber: "3",
			chapterTitle: "The Guardian's Trial",
			chapterDesc: "A test of courage and wisdom awaits in the historic district of Gion.",
			chapterImage: "",
			characterNameList: [],
			realWorldImage: "https://example.com/gion.jpg",
			chapterVideoUrl: "https://example.com/video3.mp4",
			chapterVideoMobileUrl: "https://example.com/mobile3.mp4",
			chapterPdfUrl: "https://example.com/chapter3.pdf",
			isUnlocked: false,
			delFlag: false,
			insUserId: "ADMIN-002",
			insDateTime: "2025-06-20T12:00:00Z",
			updUserId: "ADMIN-002",
			updDateTime: "2025-06-21T16:15:00Z",
		},
	],
};

export const CreateMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingStory: null,
		form: {
			sagaName: "",
			sagaDesc: "",
			location: "",
			order: 0,
			backgroundMedia: "",
			mapImage: "",
			isPrologue: false,
			isSelected: false,
		},
		onFormChange: (updates: Partial<StoryCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};

export const EditMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingStory: mockEditingStory,
		form: mockForm,
		onFormChange: (updates: Partial<StoryCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};

export const Submitting: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingStory: null,
		form: mockForm,
		onFormChange: (updates: Partial<StoryCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: true,
	},
};

export const PrologueStory: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingStory: {
			...mockEditingStory,
			sagaName: "Prologue: The Beginning",
			isPrologue: true,
			isSelected: false,
		},
		form: {
			...mockForm,
			sagaName: "Prologue: The Beginning",
			isPrologue: true,
			isSelected: false,
		},
		onFormChange: (updates: Partial<StoryCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};

export const Closed: Story = {
	args: {
		isOpen: false,
		onClose: () => console.log("Close modal"),
		editingStory: null,
		form: mockForm,
		onFormChange: (updates: Partial<StoryCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
	},
};