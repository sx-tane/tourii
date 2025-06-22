/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StoryUpdateRequestDto = {
    /**
     * Name of the story saga (e.g., 'Prologue', 'Bungo Ono')
     */
    sagaName: string;
    /**
     * Detailed description of the saga's narrative
     */
    sagaDesc: string;
    /**
     * URL to the saga's cover media (image or video)
     */
    backgroundMedia: string;
    /**
     * URL to the map image for the saga
     */
    mapImage?: string;
    /**
     * Real-world location of the saga (e.g., 'Tokyo')
     */
    location?: string;
    /**
     * Display order in the saga list
     */
    order: number;
    /**
     * Whether the saga is a prologue
     */
    isPrologue: boolean;
    /**
     * Whether the saga is selected by default
     */
    isSelected: boolean;
    /**
     * List of chapters
     */
    chapterList: Array<{
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
        /**
         * Unique identifier for the story chapter
         */
        storyChapterId: string;
        /**
         * Flag to indicate if the story chapter is deleted
         */
        delFlag: boolean;
        /**
         * Unique identifier for the user who updated the story chapter
         */
        updUserId: string;
    }>;
    /**
     * Unique identifier for the story saga
     */
    sagaId: string;
    /**
     * Flag to indicate if the story saga is deleted
     */
    delFlag: boolean;
    /**
     * Unique identifier for the user who updated the story saga
     */
    updUserId: string;
};

