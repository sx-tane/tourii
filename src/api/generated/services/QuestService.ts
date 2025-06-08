/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestListResponseDto } from '../models/QuestListResponseDto';
import type { QuestResponseDto } from '../models/QuestResponseDto';
import type { TaskResponseDto } from '../models/TaskResponseDto';
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
    /**
     * Delete Quest
     * Delete a quest and its tasks.
     * @param questId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns void
     * @throws ApiError
     */
    public static touriiBackendControllerDeleteQuest(
        questId: string,
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
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
    /**
     * Create Quest
     * Create a new quest.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Quest create request
     * @returns QuestResponseDto Successfully created quest
     * @throws ApiError
     */
    public static touriiBackendControllerCreateQuest(
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
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
            /**
             * Reward type
             */
            rewardType: 'UNKNOWN' | 'LOCAL_EXPERIENCES' | 'CULINARY' | 'ADVENTURE_NATURE' | 'CULTURAL_COMMUNITY' | 'HIDDEN_PERKS' | 'SURPRISE_TREATS' | 'BONUS_UPGRADES' | 'SOCIAL_RECOGNITION' | 'RETURNING_VISITOR_BONUS' | 'ELITE_EXPERIENCES' | 'WELLNESS' | 'SHOPPING' | 'ENTERTAINMENT' | 'TRANSPORT_CONNECTIVITY' | 'LOCAL_PARTNERSHIPS';
            /**
             * Flag to indicate if the quest is deleted
             */
            delFlag: boolean;
        },
    ): CancelablePromise<QuestResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/quests/create-quest',
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
    /**
     * Create Quest Task
     * Create a new quest task.
     * @param questId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Quest task create request
     * @returns TaskResponseDto Successfully created quest task
     * @throws ApiError
     */
    public static touriiBackendControllerCreateQuestTask(
        questId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
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
        },
    ): CancelablePromise<TaskResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/quests/create-task/{questId}',
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
    /**
     * Update Quest
     * Update an existing quest.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Quest update request
     * @returns QuestResponseDto Successfully updated quest
     * @throws ApiError
     */
    public static touriiBackendControllerUpdateQuest(
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
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
            /**
             * Reward type
             */
            rewardType: 'UNKNOWN' | 'LOCAL_EXPERIENCES' | 'CULINARY' | 'ADVENTURE_NATURE' | 'CULTURAL_COMMUNITY' | 'HIDDEN_PERKS' | 'SURPRISE_TREATS' | 'BONUS_UPGRADES' | 'SOCIAL_RECOGNITION' | 'RETURNING_VISITOR_BONUS' | 'ELITE_EXPERIENCES' | 'WELLNESS' | 'SHOPPING' | 'ENTERTAINMENT' | 'TRANSPORT_CONNECTIVITY' | 'LOCAL_PARTNERSHIPS';
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
        },
    ): CancelablePromise<QuestResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/quests/update-quest',
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
    /**
     * Update Quest Task
     * Update an existing quest task.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Quest task update request
     * @returns TaskResponseDto Successfully updated quest task
     * @throws ApiError
     */
    public static touriiBackendControllerUpdateQuestTask(
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
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
        },
    ): CancelablePromise<TaskResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/quests/update-task',
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
    /**
     * Delete Quest Task
     * Delete an individual quest task.
     * @param taskId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns void
     * @throws ApiError
     */
    public static touriiBackendControllerDeleteQuestTask(
        taskId: string,
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/quests/tasks/{taskId}',
            path: {
                'taskId': taskId,
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
