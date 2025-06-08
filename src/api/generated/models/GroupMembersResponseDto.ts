/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GroupMembersResponseDto = {
    /**
     * Unique identifier for the group
     */
    groupId: string;
    /**
     * User ID of the group leader
     */
    leaderUserId: string;
    /**
     * List of group members
     */
    members: Array<{
        /**
         * User ID of the member
         */
        userId: string;
        /**
         * Username of the member
         */
        username: string;
    }>;
};

