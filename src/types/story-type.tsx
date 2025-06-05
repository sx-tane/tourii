import type { bungoOnoChapterSelectionData } from "@/lib/data/touriiverse/chapter-data";

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
	videoLink?: string;
	videoMobileLink?: string;
	storyUnlocked?: boolean;
}

export interface ChapterButtonProps {
	areaLink: string;
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
	placeName?: string;
	selectionData: typeof bungoOnoChapterSelectionData;
	handleSelectChapter: (selectedChapterId: string) => void;
	selectedButtonRef: React.RefObject<HTMLDivElement | null>;
}

export type ChapterSelectionButtonProps = {
	selection: ChapterSelection;
	onSelect: (selectedStoryId: string) => void;
};

export interface VideoIframeProps {
	iframeSrc: string | undefined;
	title: string;
}

export interface StoryVideoNavigationButtonsProps {
	returnLink: string;
	isMuted: boolean;
	toggleSound: () => void;
	handlePreviousChapter: () => void;
	handleNextChapter: () => void;
	previousChapterUnlocked: boolean;
	nextChapterUnlocked: boolean;
}

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
