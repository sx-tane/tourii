// import type { Chapter } from "@/types/story-type";

export type StoryStatus = "draft" | "published" | "archived";
export type ChapterStatus = "locked" | "unlocked" | "completed";

export interface BackendStoryChapter {
	storyId: string;
	touristSpotId: string;
	chapterNumber: string;
	chapterTitle: string;
	chapterDesc: string;
	chapterImage: string;
	characterNameList: string[];
	realWorldImage: string;
	chapterVideoUrl: string;
	chapterVideoMobileUrl: string;
	chapterPdfUrl: string;
	isUnlocked: boolean;
	insUserId: string;
	insDateTime: string;
	updUserId: string;
	updDateTime: string;
}

export interface Story {
	storyId: string;
	sagaName: string;
	sagaDesc?: string;
	backgroundMedia: string;
	mapImage?: string;
	location?: string;
	order?: number;
	isPrologue?: boolean;
	isSelected?: boolean;
	chapterList?: BackendStoryChapter[];
	insUserId?: string;
	insDateTime?: string;
	updUserId?: string;
	updDateTime?: string;
}

export interface StorySelection {
	title: string;
	chapterNumber?: number;
	selectedStoryId: string | undefined;
	isSelected: boolean;
	isPrologue: boolean;
}

export type StorySelectionButtonProps = {
	selection: StorySelection;
	onSelect: (selectedStoryId: string) => void;
};

export interface StorySelectionListProps {
	selectionData: StorySelection[];
	onSelect: (selectedStoryId: string) => void;
}

// --- Remove or comment out old StoryChapter and StorySaga types if unused ---
/* 
export interface StoryChapter {
	id: string;
	sagaId: string;
	title: string;
	description: string;
	status: ChapterStatus;
	content: string;
	estimatedDuration: string;
	requirements?: {
		previousChapter?: string;
		level?: number;
		quests?: string[];
	};
	unlockConditions?: {
		points?: number;
		badges?: string[];
		completedQuests?: string[];
	};
	reward?: {
		type: "points" | "badge" | "item";
		value: string;
		icon?: string;
	};
	location?: {
		name: string;
		coordinates?: [number, number];
		address?: string;
	};
	media?: {
		type: "image" | "audio" | "video";
		url: string;
		thumbnailUrl?: string;
	}[];
	createdAt: string;
	updatedAt: string;
}

export interface StorySaga {
	id: string;
	title: string;
	description: string;
	status: StoryStatus;
	coverImage: string;
	author: {
		id: string;
		name: string;
		avatar?: string;
	};
	tags: string[];
	category: string;
	totalChapters: number;
	completedChapters: number;
	estimatedDuration: string;
	requirements?: {
		level?: number;
		previousSaga?: string[];
	};
	chapters: StoryChapter[];
	createdAt: string;
	updatedAt: string;
}
*/
