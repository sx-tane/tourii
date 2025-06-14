/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QuestTaskUpdateRequestDto = {
    /**
     * Theme of the task
     */
    taskTheme: QuestTaskUpdateRequestDto.taskTheme;
    /**
     * Type of the task
     */
    taskType: QuestTaskUpdateRequestDto.taskType;
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
     * Unique identifier for the task
     */
    taskId: string;
    /**
     * Flag to indicate if the task is deleted
     */
    delFlag: boolean;
    /**
     * Unique identifier for the user who updated the task
     */
    updUserId: string;
};
export namespace QuestTaskUpdateRequestDto {
    /**
     * Theme of the task
     */
    export enum taskTheme {
        STORY = 'STORY',
        LOCAL_CULTURE = 'LOCAL_CULTURE',
        FOOD = 'FOOD',
        URBAN_EXPLORE = 'URBAN_EXPLORE',
        NATURE = 'NATURE',
    }
    /**
     * Type of the task
     */
    export enum taskType {
        VISIT_LOCATION = 'VISIT_LOCATION',
        PHOTO_UPLOAD = 'PHOTO_UPLOAD',
        ANSWER_TEXT = 'ANSWER_TEXT',
        SELECT_OPTION = 'SELECT_OPTION',
        SHARE_SOCIAL = 'SHARE_SOCIAL',
        CHECK_IN = 'CHECK_IN',
        GROUP_ACTIVITY = 'GROUP_ACTIVITY',
        LOCAL_INTERACTION = 'LOCAL_INTERACTION',
    }
}

