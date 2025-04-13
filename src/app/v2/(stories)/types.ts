export type StoryStatus = "draft" | "published" | "archived";
export type ChapterStatus = "locked" | "unlocked" | "completed";

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
