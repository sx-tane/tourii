/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StoryChapterResponseDto = {
    /**
     * Unique identifier for the story
     */
    storyId: string;
    /**
     * Unique identifier for the tourist spot
     */
    touristSpotId: string;
    /**
     * Unique identifier for the story chapter
     */
    storyChapterId: string;
    /**
     * Name of the saga
     */
    sagaName: string;
    /**
     * Chapter number or position
     */
    chapterNumber: string;
    /**
     * Title of the chapter
     */
    chapterTitle: string;
    /**
     * Detailed description of the chapter
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
    /**
     * Flag to indicate if the record is deleted
     */
    delFlag?: boolean;
    /**
     * ID of user who created this record
     */
    insUserId?: string;
    /**
     * Timestamp of record creation
     */
    insDateTime?: string;
    /**
     * ID of user who last updated this record
     */
    updUserId?: string;
    /**
     * Timestamp of last record update
     */
    updDateTime?: string;
};

