/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QuestCreateRequestDto = {
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
    questType: QuestCreateRequestDto.questType;
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
    rewardType: QuestCreateRequestDto.rewardType;
    /**
     * Flag to indicate if the quest is deleted
     */
    delFlag: boolean;
};
export namespace QuestCreateRequestDto {
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

