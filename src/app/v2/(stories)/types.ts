export type StoryStatus = "draft" | "published" | "archived";
export type ChapterStatus = "locked" | "unlocked" | "completed";

export interface BackendStoryChapter {
	storyId: string;
	storyChapterId: string;
	sagaName: string;
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
	insUserId?: string;
	insDateTime?: string;
	updUserId?: string;
	updDateTime?: string;
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
