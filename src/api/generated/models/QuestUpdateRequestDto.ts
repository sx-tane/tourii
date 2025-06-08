/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QuestUpdateRequestDto = {
    /**
     * Unique identifier for the quest
     */
    questId: string;
    /**
     * Unique identifier for the tourist spot
     */
    touristSpotId: string;
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
    questType: QuestUpdateRequestDto.questType;
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
     * Reward type
     */
    rewardType: QuestUpdateRequestDto.rewardType;
    /**
     * Flag to indicate if the quest is deleted
     */
    delFlag: boolean;
    /**
     * Unique identifier for the user who updated the quest
     */
    updUserId: string;
    /**
     * List of tasks for the quest
     */
    taskList?: Array<{
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
        /**
         * Flag to indicate if the task is deleted
         */
        delFlag: boolean;
        /**
         * Unique identifier for the user who updated the task
         */
        updUserId: string;
    }>;
};
export namespace QuestUpdateRequestDto {
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
    /**
     * Reward type
     */
    export enum rewardType {
        UNKNOWN = 'UNKNOWN',
        LOCAL_EXPERIENCES = 'LOCAL_EXPERIENCES',
        CULINARY = 'CULINARY',
        ADVENTURE_NATURE = 'ADVENTURE_NATURE',
        CULTURAL_COMMUNITY = 'CULTURAL_COMMUNITY',
        HIDDEN_PERKS = 'HIDDEN_PERKS',
        SURPRISE_TREATS = 'SURPRISE_TREATS',
        BONUS_UPGRADES = 'BONUS_UPGRADES',
        SOCIAL_RECOGNITION = 'SOCIAL_RECOGNITION',
        RETURNING_VISITOR_BONUS = 'RETURNING_VISITOR_BONUS',
        ELITE_EXPERIENCES = 'ELITE_EXPERIENCES',
        WELLNESS = 'WELLNESS',
        SHOPPING = 'SHOPPING',
        ENTERTAINMENT = 'ENTERTAINMENT',
        TRANSPORT_CONNECTIVITY = 'TRANSPORT_CONNECTIVITY',
        LOCAL_PARTNERSHIPS = 'LOCAL_PARTNERSHIPS',
    }
}

