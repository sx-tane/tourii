/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QuestResponseDto = {
    quest: {
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
        questType: QuestResponseDto.questType;
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
        /**
         * Tasks associated with this quest
         */
        tasks?: Array<{
            /**
             * Unique identifier for the task
             */
            taskId: string;
            /**
             * ID of the parent quest
             */
            questId: string;
            /**
             * Theme of the task
             */
            taskTheme: 'STORY' | 'LOCAL_CULTURE' | 'FOOD' | 'URBAN_EXPLORE' | 'NATURE';
            /**
             * Type of the task
             */
            taskType: 'VISIT_LOCATION' | 'PHOTO_UPLOAD' | 'ANSWER_TEXT' | 'SELECT_OPTION' | 'SHARE_SOCIAL' | 'CHECK_IN' | 'GROUP_ACTIVITY' | 'LOCAL_INTERACTION';
            /**
             * Name of the task
             */
            taskName: string;
            /**
             * Description of the task
             */
            taskDesc: string;
            /**
             * Whether task is unlocked
             */
            isUnlocked: boolean;
            /**
             * Action required to complete the task
             */
            requiredAction: string;
            /**
             * Members for group activities
             */
            groupActivityMembers?: Array<any>;
            /**
             * Options for selection tasks
             */
            selectOptions?: Array<any>;
            /**
             * Rules to prevent cheating
             */
            antiCheatRules: any;
            /**
             * Magatama points awarded for this task
             */
            magatamaPointAwarded: number;
            /**
             * Total Magatama points awarded
             */
            totalMagatamaPointAwarded: number;
        }>;
    };
};
export namespace QuestResponseDto {
    /**
     * Quest type
     */
    export enum questType {
        UNKNOWN = 'UNKNOWN',
        TRAVEL_TO_EARN = 'TRAVEL_TO_EARN',
        EARN_TO_TRAVEL = 'EARN_TO_TRAVEL',
        CAMPAIGN = 'CAMPAIGN',
        COMMUNITY_EVENT = 'COMMUNITY_EVENT',
    }
}

