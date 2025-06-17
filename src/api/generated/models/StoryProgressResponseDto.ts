/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StoryProgressResponseDto = {
    /**
     * ID of the story chapter
     */
    storyChapterId: string;
    /**
     * Current reading status
     */
    status: StoryProgressResponseDto.status;
    /**
     * Timestamp when the user started reading
     */
    unlockedAt: any;
    /**
     * Timestamp when the user finished reading
     */
    finishedAt: any;
    /**
     * Whether the user can start reading this chapter
     */
    canStart: boolean;
    /**
     * Whether the user can complete this chapter
     */
    canComplete: boolean;
};
export namespace StoryProgressResponseDto {
    /**
     * Current reading status
     */
    export enum status {
        UNREAD = 'UNREAD',
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
    }
}

