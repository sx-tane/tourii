export interface Story {
  storyId: string;
  title: string;
  backgroundImage: string;
  image?: string;
  description?: string;
  chapter?: Chapter[];
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
  area?: string;
  chapter: string;
  title: string;
  description: string;
  image: string;
  vnLink?: string;
  vnUnlocked?: boolean;
}

export interface ChapterSelection {
  chapter: string;
  selectedChapterId: string;
  title: string;
  image: string;
  isSelected: boolean;
  isIntro: boolean;
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
