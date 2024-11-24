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
	selecedStoryId: string | undefined;
	isSelected: boolean;
	isPrologue: boolean;
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

export interface ChapterSelection {
	selectedChapterId: string | undefined;
	chapter: string | undefined;
	placeName: string | undefined;
	isSelected: boolean;
}

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
