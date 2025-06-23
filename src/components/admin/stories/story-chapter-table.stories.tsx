import type { Meta, StoryObj } from "@storybook/react";
import type { StoryChapterResponseDto } from "@/api/generated";
import StoryChapterTable from "./story-chapter-table";

const meta: Meta<typeof StoryChapterTable> = {
	title: "Admin/Stories/StoryChapterTable",
	component: StoryChapterTable,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockChapters: StoryChapterResponseDto[] = [
	{
		storyChapterId: "CHAPTER-001",
		storyId: "STORY-001",
		touristSpotId: "SPOT-KIYOMIZU",
		chapterNumber: "Prologue",
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
	},
	{
		storyChapterId: "CHAPTER-002", 
		storyId: "STORY-001",
		touristSpotId: "SPOT-FUSHIMI",
		chapterNumber: "Chapter 1",
		chapterTitle: "Journey to the Sacred Grove",
		chapterDesc: "Our heroes venture into the mystical bamboo forest where ancient spirits dwell.",
		characterNameList: ["Sakura", "Yuki", "Elder Matsumoto"],
		isUnlocked: false,
		delFlag: false,
		sagaName: "The Legend of Sakura",
		chapterImage: "https://example.com/chapter2.jpg",
		realWorldImage: "https://example.com/fushimi.jpg",
		chapterVideoUrl: "",
		chapterVideoMobileUrl: "",
		chapterPdfUrl: "",
		insDateTime: "2025-06-20T11:15:00Z",
		updDateTime: "2025-06-21T15:30:00Z",
		insUserId: "ADMIN-001",
		updUserId: "ADMIN-001",
	},
	{
		storyChapterId: "CHAPTER-003",
		storyId: "STORY-001", 
		touristSpotId: "SPOT-GION",
		chapterNumber: "Chapter 2",
		chapterTitle: "The Guardian's Trial",
		chapterDesc: "A test of courage and wisdom awaits in the historic district of Gion.",
		characterNameList: [],
		isUnlocked: false,
		delFlag: false,
		sagaName: "The Legend of Sakura",
		chapterImage: "",
		realWorldImage: "https://example.com/gion.jpg",
		chapterVideoUrl: "https://example.com/video3.mp4",
		chapterVideoMobileUrl: "https://example.com/mobile3.mp4",
		chapterPdfUrl: "https://example.com/chapter3.pdf",
		insDateTime: "2025-06-20T12:00:00Z",
		updDateTime: "2025-06-21T16:15:00Z",
		insUserId: "ADMIN-002",
		updUserId: "ADMIN-002",
	},
];

export const Default: Story = {
	args: {
		chapters: mockChapters,
		selectedChapters: [],
		deletingChapterId: null,
		storyId: "STORY-001",
		onToggleSelection: (chapterId: string) => console.log("Toggle selection:", chapterId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (chapter: StoryChapterResponseDto) => console.log("Edit chapter:", chapter.chapterTitle),
		onDelete: (chapterId: string, chapterTitle: string) => console.log("Delete chapter:", chapterId, chapterTitle),
	},
};

export const WithSelection: Story = {
	args: {
		chapters: mockChapters,
		selectedChapters: ["CHAPTER-001", "CHAPTER-003"],
		deletingChapterId: null,
		storyId: "STORY-001",
		onToggleSelection: (chapterId: string) => console.log("Toggle selection:", chapterId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (chapter: StoryChapterResponseDto) => console.log("Edit chapter:", chapter.chapterTitle),
		onDelete: (chapterId: string, chapterTitle: string) => console.log("Delete chapter:", chapterId, chapterTitle),
	},
};

export const Deleting: Story = {
	args: {
		chapters: mockChapters,
		selectedChapters: [],
		deletingChapterId: "CHAPTER-002",
		storyId: "STORY-001",
		onToggleSelection: (chapterId: string) => console.log("Toggle selection:", chapterId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (chapter: StoryChapterResponseDto) => console.log("Edit chapter:", chapter.chapterTitle),
		onDelete: (chapterId: string, chapterTitle: string) => console.log("Delete chapter:", chapterId, chapterTitle),
	},
};

export const EmptyState: Story = {
	args: {
		chapters: [],
		selectedChapters: [],
		deletingChapterId: null,
		storyId: "STORY-001",
		onToggleSelection: (chapterId: string) => console.log("Toggle selection:", chapterId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (chapter: StoryChapterResponseDto) => console.log("Edit chapter:", chapter.chapterTitle),
		onDelete: (chapterId: string, chapterTitle: string) => console.log("Delete chapter:", chapterId, chapterTitle),
	},
};