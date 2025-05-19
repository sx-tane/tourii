/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QuestResponseDto = {
    quests: Array<{
        /**
         * Unique identifier for the quest
         */
        questId: string;
        /**
         * Name of the quest
         */
        questName: string;
        /**
         * Description of the quest
         */
        questDesc: string;
        /**
         * URL to the quest image
         */
        questImage?: string;
        /**
         * Quest type
         */
        questType: 'UNKNOWN' | 'TRAVEL_TO_EARN' | 'EARN_TO_TRAVEL' | 'CAMPAIGN' | 'COMMUNITY_EVENT';
        /**
         * Whether quest is unlocked
         */
        isUnlocked: boolean;
        /**
         * Whether quest is premium
         */
        isPremium: boolean;
        /**
         * Total Magatama points awarded
         */
        totalMagatamaPointAwarded: number;
    }>;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalQuests: number;
    };
};

