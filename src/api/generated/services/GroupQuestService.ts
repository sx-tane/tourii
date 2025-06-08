/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GroupMembersResponseDto } from '../models/GroupMembersResponseDto';
import type { StartGroupQuestResponseDto } from '../models/StartGroupQuestResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GroupQuestService {
    /**
     * Get Group Members
     * Return current members of the group quest.
     * @param questId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns GroupMembersResponseDto Member list
     * @throws ApiError
     */
    public static touriiBackendControllerGetGroupMembers(
        questId: string,
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<GroupMembersResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quests/{questId}/group/members',
            path: {
                'questId': questId,
            },
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Start Group Quest
     * Leader starts the quest for all members.
     * @param questId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Start group quest request
     * @returns StartGroupQuestResponseDto Group quest started
     * @throws ApiError
     */
    public static touriiBackendControllerStartGroupQuest(
        questId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
            /**
             * User ID of the quest leader starting the quest
             */
            userId: string;
        },
    ): CancelablePromise<StartGroupQuestResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/quests/{questId}/group/start',
            path: {
                'questId': questId,
            },
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
}
