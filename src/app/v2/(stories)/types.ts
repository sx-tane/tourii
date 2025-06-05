export type StoryStatus = "draft" | "published" | "archived";
export type ChapterStatus = "locked" | "unlocked" | "completed";

export interface StorySelection {
	title: string;
	chapterNumber?: number;
	selectedStoryId: string | undefined;
	isSelected: boolean;
	isPrologue: boolean;
}

export interface ChapterSelectionItem {
	storyChapterId: string;
	isSelected: boolean;
	chapterNumber: string;
	chapterTitle: string;
}

export interface CharacterProps {
	id: string;
	name?: string;
	kanjiname?: string;
	image?: string;
	thumbnailImage?: string;
	description?: string;
	dob?: string;
	realm?: string;
	height?: string;
	weapon?: string;
	kami?: string;
}
