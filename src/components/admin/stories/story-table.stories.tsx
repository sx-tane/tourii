import type { Meta, StoryObj } from "@storybook/react";
import type { StoryResponseDto } from "@/api/generated";
import StoryTable from "./story-table";

const meta: Meta<typeof StoryTable> = {
	title: "Admin/Stories/StoryTable",
	component: StoryTable,
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof StoryTable>;

const mockStories: StoryResponseDto[] = [
	{
		storyId: "story-1",
		sagaName: "Tokyo Mythology Adventure",
		sagaDesc: "Explore the ancient myths hidden in modern Tokyo",
		location: "Tokyo, Japan",
		order: 1,
		isPrologue: true,
		isSelected: true,
		backgroundMedia: "https://example.com/tokyo-bg.jpg",
		mapImage: "https://example.com/tokyo-map.jpg",
		chapterList: [
			{
				storyId: "story-1",
				touristSpotId: "SPOT-SHIBUYA",
				storyChapterId: "ch1",
				sagaName: "Tokyo Mythology Adventure",
				chapterNumber: "1",
				chapterTitle: "The Hidden Shrine",
				chapterDesc: "Discover a hidden shrine in the heart of Shibuya",
				chapterImage: "https://example.com/shrine.jpg",
				characterNameList: ["Akira", "Mei"],
				realWorldImage: "https://example.com/shibuya.jpg",
				chapterVideoUrl: "https://example.com/video-ch1.mp4",
				chapterVideoMobileUrl: "https://example.com/mobile-ch1.mp4",
				chapterPdfUrl: "https://example.com/chapter1.pdf",
				isUnlocked: true,
				delFlag: false,
			},
			{
				storyId: "story-1",
				touristSpotId: "SPOT-HARAJUKU",
				storyChapterId: "ch2",
				sagaName: "Tokyo Mythology Adventure",
				chapterNumber: "2",
				chapterTitle: "Ancient Spirits",
				chapterDesc: "Meet the ancient spirits that guard Harajuku",
				chapterImage: "https://example.com/spirits.jpg",
				characterNameList: ["Akira", "Mei", "Spirit Guardian"],
				realWorldImage: "https://example.com/harajuku.jpg",
				chapterVideoUrl: "",
				chapterVideoMobileUrl: "",
				chapterPdfUrl: "",
				isUnlocked: false,
				delFlag: false,
			},
		],
	},
	{
		storyId: "story-2",
		sagaName: "Kyoto Temple Quest",
		sagaDesc: "Discover the secrets of Kyoto's sacred temples",
		location: "Kyoto, Japan",
		order: 2,
		isPrologue: false,
		isSelected: false,
		backgroundMedia: "https://example.com/kyoto-bg.jpg",
		mapImage: "https://example.com/kyoto-map.jpg",
		chapterList: [],
	},
	{
		storyId: "story-3",
		sagaName: "Osaka Food Journey",
		sagaDesc: "A culinary adventure through Osaka's street food scene",
		location: "Osaka, Japan",
		order: 3,
		isPrologue: false,
		isSelected: true,
		backgroundMedia: "https://example.com/osaka-bg.jpg",
		mapImage: "https://example.com/osaka-map.jpg",
		chapterList: [
			{
				storyId: "story-3",
				touristSpotId: "SPOT-DOTONBORI",
				storyChapterId: "ch3",
				sagaName: "Osaka Food Journey",
				chapterNumber: "1",
				chapterTitle: "Takoyaki Masters",
				chapterDesc: "Learn the art of takoyaki making in Dotonbori",
				chapterImage: "https://example.com/takoyaki.jpg",
				characterNameList: ["Chef Yamamoto", "Kenji"],
				realWorldImage: "https://example.com/dotonbori.jpg",
				chapterVideoUrl: "https://example.com/takoyaki-video.mp4",
				chapterVideoMobileUrl: "https://example.com/takoyaki-mobile.mp4",
				chapterPdfUrl: "https://example.com/takoyaki-guide.pdf",
				isUnlocked: true,
				delFlag: false,
			},
		],
	},
];

export const Default: Story = {
	args: {
		stories: mockStories,
		selectedStories: [],
		onToggleSelection: (storyId: string) =>
			console.log("Toggle selection:", storyId),
		onToggleSelectAll: () => console.log("Toggle select all"),
		onEdit: (story: StoryResponseDto) =>
			console.log("Edit story:", story.sagaName),
		onDelete: (_storyId: string, sagaName: string) =>
			console.log("Delete:", sagaName),
		deletingStoryId: null,
	},
};

export const WithSelections: Story = {
	args: {
		...Default.args,
		selectedStories: ["story-1", "story-3"],
	},
};

export const WithDeletion: Story = {
	args: {
		...Default.args,
		deletingStoryId: "story-2",
	},
};

export const EmptyState: Story = {
	args: {
		...Default.args,
		stories: [],
	},
};
