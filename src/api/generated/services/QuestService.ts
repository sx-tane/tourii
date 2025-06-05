/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestListResponseDto } from '../models/QuestListResponseDto';
import type { QuestResponseDto } from '../models/QuestResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestService {
    /**
     * Get quest with pagination
     * Get quest with pagination
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param questType Filter by quest type
     * @param isUnlocked Filter by unlocked status
     * @param isPremium Filter by premium status
     * @param limit Number of quests per page (default: 20, max: 100)
     * @param page Page number for pagination (default: 1)
     * @returns QuestListResponseDto Fetch quests successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGetQuestList(
        acceptVersion: string,
        xApiKey: string,
        questType?: 'UNKNOWN' | 'TRAVEL_TO_EARN' | 'EARN_TO_TRAVEL' | 'CAMPAIGN' | 'COMMUNITY_EVENT',
        isUnlocked?: boolean,
        isPremium?: boolean,
        limit?: number,
        page?: number,
    ): CancelablePromise<QuestListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quests',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            query: {
                'questType': questType,
                'isUnlocked': isUnlocked,
                'isPremium': isPremium,
                'limit': limit,
                'page': page,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Get quest by ID
     * Get quest by ID
     * @param questId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns QuestResponseDto Quest found successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGetQuestById(
        questId: string,
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<QuestResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quests/{questId}',
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
}
