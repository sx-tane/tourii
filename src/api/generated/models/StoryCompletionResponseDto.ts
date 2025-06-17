/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StoryCompletionResponseDto = {
    /**
     * Whether the story completion was successful
     */
    success: boolean;
    /**
     * Success or error message
     */
    message: string;
    /**
     * Story progress information
     */
    storyProgress: {
        /**
         * ID of the completed story chapter
         */
        storyChapterId: string;
        /**
         * Title of the completed chapter
         */
        chapterTitle: string;
        /**
         * Current story status
         */
        status: StoryCompletionResponseDto.status;
        /**
         * Timestamp when the story was completed
         */
        completedAt: any;
    };
    /**
     * List of quests unlocked by completing this story
     */
    unlockedQuests: Array<{
        /**
         * ID of the unlocked quest
         */
        questId: string;
        /**
         * Name of the unlocked quest
         */
        questName: string;
        /**
         * Description of the unlocked quest
         */
        questDesc: string;
        /**
         * Image URL for the quest
         */
        questImage: string | null;
        /**
         * Name of the tourist spot where the quest is located
         */
        touristSpotName: string;
        /**
         * Total magatama points awarded for completing this quest
         */
        totalMagatamaPointAwarded: number;
        /**
         * Whether this is a premium quest
         */
        isPremium: boolean;
    }>;
    /**
     * Rewards earned from story completion
     */
    rewards: {
        /**
         * Total magatama points earned from story completion and achievements
         */
        magatamaPointsEarned: number;
        /**
         * List of achievement names unlocked
         */
        achievementsUnlocked: Array<string>;
    };
};
export namespace StoryCompletionResponseDto {
    /**
     * Current story status
     */
    export enum status {
        UNREAD = 'UNREAD',
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
    }
}

