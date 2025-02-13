import type { bungoOnoChapterSelectionData } from "@/lib/data/touriiverse/chapter-data";

export interface Story {
	storyId: string;
	title: string;
	backgroundImage: string;
	image?: string;
	description?: string;
	url?: string;
	chapter?: Chapter | Chapter[];
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

export interface Chapter {
	chapterId: string;
	part: number;
	area?: string;
	placeName?: string;
	chapterNumber: string;
	title: string;
	content: string;
	image: string;
	realImage: string;
	vnLink?: string;
	vnUnlocked?: boolean;
}

export interface ChapterButtonProps {
	vnUnlocked?: boolean;
	chapterId?: string;
	chapterNumber?: string;
}

export interface ChapterSelection {
	selectedChapterId: string | undefined;
	chapter: string | undefined;
	placeName: string | undefined;
	isSelected: boolean;
}

export interface ChapterSelectionProps {
	selectionData: typeof bungoOnoChapterSelectionData;
	handleSelectChapter: (selectedChapterId: string) => void;
	selectedButtonRef: React.RefObject<HTMLDivElement | null>;
}

export type ChapterSelectionButtonProps = {
	selection: ChapterSelection;
	onSelect: (selectedStoryId: string) => void;
};

// User is implemented
interface FutureUse {
	lastUpdated: Date;
	lastUpdatedBy: string;
	availableLanguages: string[];
	readingTime: number;
	difficultyLevel: string;
	userRating: number;
	commentCount: number;
	readStatus: string;
	unlockConditions: string;
	tags: string[];
}
