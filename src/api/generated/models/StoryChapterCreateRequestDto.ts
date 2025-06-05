/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StoryChapterCreateRequestDto = {
    /**
     * Unique identifier for the tourist spot
     */
    touristSpotId: string;
    /**
     * Chapter number or position (e.g., 'Prologue', 'Chapter 1')
     */
    chapterNumber: string;
    /**
     * Title of the story chapter
     */
    chapterTitle: string;
    /**
     * Detailed description or content of the story
     */
    chapterDesc: string;
    /**
     * URL to the fictional chapter image
     */
    chapterImage: string;
    /**
     * List of character names involved in the chapter
     */
    characterNameList: Array<string>;
    /**
     * URL to the real-world location image
     */
    realWorldImage: string;
    /**
     * URL to the chapter video for desktop viewing
     */
    chapterVideoUrl: string;
    /**
     * URL to the chapter video optimized for mobile
     */
    chapterVideoMobileUrl: string;
    /**
     * URL to the downloadable PDF version
     */
    chapterPdfUrl: string;
    /**
     * Whether the chapter is available to users without prerequisites
     */
    isUnlocked: boolean;
};

