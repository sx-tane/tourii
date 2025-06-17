/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type HomepageHighlightsResponseDto = {
    latestChapter: {
        /**
         * Story ID
         */
        storyId: string;
        /**
         * Chapter ID
         */
        chapterId: string;
        /**
         * Chapter title
         */
        title: string;
        /**
         * Cover image URL
         */
        imageUrl: string | null;
        /**
         * Deep link to chapter
         */
        link: string | null;
    } | null;
    /**
     * Top 3 popular quests
     */
    popularQuests: Array<{
        /**
         * Quest ID
         */
        questId: string;
        /**
         * Quest title
         */
        title: string;
        /**
         * Quest image URL
         */
        imageUrl: string | null;
        /**
         * Deep link to quest
         */
        link: string | null;
    }>;
};

