/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QuestResponseDto = {
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
         * Reward earned for this task
         */
        rewardEarned?: string;
        /**
         * Whether task is completed
         */
        isCompleted: boolean;
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
    }>;
    /**
     * Tourist spot associated with this quest
     */
    touristSpot?: {
        /**
         * Unique identifier for the tourist spot
         */
        touristSpotId: string;
        /**
         * Unique identifier for the story chapter
         */
        storyChapterId?: string;
        /**
         * Name of the tourist spot
         */
        touristSpotName: string;
        /**
         * Description of the tourist spot
         */
        touristSpotDesc: string;
        /**
         * Best visit time of the tourist spot
         */
        bestVisitTime: string;
        /**
         * Address of the tourist spot
         */
        address: string;
        /**
         * Latitude of the tourist spot
         */
        touristSpotLatitude: number;
        /**
         * Longitude of the tourist spot
         */
        touristSpotLongitude: number;
        /**
         * Hashtags associated with this location
         */
        touristSpotHashtag: Array<string>;
        /**
         * Link to the related story chapter
         */
        storyChapterLink?: string;
        /**
         * Image set for the tourist spot
         */
        imageSet?: {
            /**
             * Main image of the tourist spot
             */
            main: string;
            /**
             * Small images of the tourist spot
             */
            small: Array<string>;
        };
        /**
         * Weather info for the tourist spot
         */
        weatherInfo?: {
            /**
             * Temperature of the weather
             */
            temperatureCelsius: number;
            /**
             * Name of the weather
             */
            weatherName: string;
            /**
             * Description of the weather
             */
            weatherDesc: string;
        };
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

