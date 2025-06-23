import type { Meta, StoryObj } from "@storybook/react";
import type { StoryChapterCreateRequestDto, StoryChapterResponseDto } from "@/api/generated";
import StoryChapterCreateEditModal from "./story-chapter-create-edit-modal";

const meta: Meta<typeof StoryChapterCreateEditModal> = {
	title: "Admin/Stories/StoryChapterCreateEditModal",
	component: StoryChapterCreateEditModal,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockForm: StoryChapterCreateRequestDto = {
	touristSpotId: "SPOT-KIYOMIZU",
	chapterNumber: "Chapter 1",
	chapterTitle: "The Awakening",
	chapterDesc: "The mystical journey begins at the ancient temple where cherry blossoms hold ancient secrets.",
	characterNameList: ["Sakura", "Takeshi"],
	chapterImage: "https://example.com/chapter1.jpg",
	realWorldImage: "https://example.com/kiyomizu.jpg",
	chapterVideoUrl: "https://example.com/video1.mp4",
	chapterVideoMobileUrl: "https://example.com/mobile1.mp4",
	chapterPdfUrl: "https://example.com/chapter1.pdf",
	isUnlocked: true,
};

const mockEditingChapter: StoryChapterResponseDto = {
	storyChapterId: "CHAPTER-001",
	storyId: "STORY-001",
	touristSpotId: "SPOT-KIYOMIZU",
	chapterNumber: "Chapter 1",
	chapterTitle: "The Awakening",
	chapterDesc: "The mystical journey begins at the ancient temple where cherry blossoms hold ancient secrets.",
	characterNameList: ["Sakura", "Takeshi"],
	isUnlocked: true,
	delFlag: false,
	sagaName: "The Legend of Sakura",
	chapterImage: "https://example.com/chapter1.jpg",
	realWorldImage: "https://example.com/kiyomizu.jpg",
	chapterVideoUrl: "https://example.com/video1.mp4",
	chapterVideoMobileUrl: "https://example.com/mobile1.mp4",
	chapterPdfUrl: "https://example.com/chapter1.pdf",
	insDateTime: "2025-06-20T10:30:00Z",
	updDateTime: "2025-06-21T14:45:00Z",
	insUserId: "ADMIN-001",
	updUserId: "ADMIN-002",
};

export const CreateMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingChapter: null,
		form: {
			touristSpotId: "",
			chapterNumber: "",
			chapterTitle: "",
			chapterDesc: "",
			characterNameList: [],
			chapterImage: "",
			realWorldImage: "",
			chapterVideoUrl: "",
			chapterVideoMobileUrl: "",
			chapterPdfUrl: "",
			isUnlocked: false,
		},
		onFormChange: (updates: Partial<StoryChapterCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
		onCharacterListChange: (value: string) => console.log("Character list change:", value),
	},
};

export const EditMode: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingChapter: mockEditingChapter,
		form: mockForm,
		onFormChange: (updates: Partial<StoryChapterCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
		onCharacterListChange: (value: string) => console.log("Character list change:", value),
	},
};

export const Submitting: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingChapter: null,
		form: mockForm,
		onFormChange: (updates: Partial<StoryChapterCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: true,
		onCharacterListChange: (value: string) => console.log("Character list change:", value),
	},
};

export const PrologueChapter: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Close modal"),
		editingChapter: {
			...mockEditingChapter,
			chapterNumber: "Prologue",
			chapterTitle: "The Beginning",
			isUnlocked: false,
		},
		form: {
			...mockForm,
			chapterNumber: "Prologue",
			chapterTitle: "The Beginning",
			isUnlocked: false,
		},
		onFormChange: (updates: Partial<StoryChapterCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
		onCharacterListChange: (value: string) => console.log("Character list change:", value),
	},
};

export const Closed: Story = {
	args: {
		isOpen: false,
		onClose: () => console.log("Close modal"),
		editingChapter: null,
		form: mockForm,
		onFormChange: (updates: Partial<StoryChapterCreateRequestDto>) => console.log("Form change:", updates),
		onSubmit: () => console.log("Submit form"),
		isSubmitting: false,
		onCharacterListChange: (value: string) => console.log("Character list change:", value),
	},
};