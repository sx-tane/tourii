/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StoryChapterCreateRequestDto } from '../models/StoryChapterCreateRequestDto';
import type { StoryChapterResponseDto } from '../models/StoryChapterResponseDto';
import type { StoryCreateRequestDto } from '../models/StoryCreateRequestDto';
import type { StoryResponseDto } from '../models/StoryResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StoriesService {
    /**
     * Create Story Saga
     * Create a new story saga with optional chapters.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Story Saga creation request
     * @returns StoryResponseDto Successfully created story saga
     * @throws ApiError
     */
    public static touriiBackendControllerCreateStory(
        acceptVersion: string,
        xApiKey: string,
        requestBody: StoryCreateRequestDto,
    ): CancelablePromise<StoryResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/stories/create-saga',
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
     * Create Story Chapter
     * Create a new story chapter.
     * @param storyId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Story Chapter creation request
     * @returns StoryChapterResponseDto Successfully created story chapter
     * @throws ApiError
     */
    public static touriiBackendControllerCreateStoryChapter(
        storyId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: StoryChapterCreateRequestDto,
    ): CancelablePromise<StoryChapterResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/stories/create-chapter/{storyId}',
            path: {
                'storyId': storyId,
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
     * Update Story Saga
     * Update an existing story saga.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Story Saga update request
     * @returns StoryResponseDto Successfully updated story saga
     * @throws ApiError
     */
    public static touriiBackendControllerUpdateStory(
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
            /**
             * Name of the story saga (e.g., 'Prologue', 'Bungo Ono')
             */
            sagaName: string;
            /**
             * Detailed description of the saga's narrative
             */
            sagaDesc: string;
            /**
             * URL to the saga's cover media (image or video)
             */
            backgroundMedia: string;
            /**
             * URL to the map image for the saga
             */
            mapImage?: string;
            /**
             * Real-world location of the saga (e.g., 'Tokyo')
             */
            location?: string;
            /**
             * Display order in the saga list
             */
            order: number;
            /**
             * Whether the saga is a prologue
             */
            isPrologue: boolean;
            /**
             * Whether the saga is selected by default
             */
            isSelected: boolean;
            /**
             * List of chapters
             */
            chapterList: Array<{
                /**
                 * Unique identifier for the tourist spot
                 */
                touristSpotId: string;
                /**
                 * Chapter number or position (e.g., 'Prologue', 'Chapter 1')
                 */
                chapterNumber: string;
                /**
                 * Title of the story chapter
                 */
                chapterTitle: string;
                /**
                 * Detailed description or content of the story
                 */
                chapterDesc: string;
                /**
                 * URL to the fictional chapter image
                 */
                chapterImage: string;
                /**
                 * List of character names involved in the chapter
                 */
                characterNameList: Array<string>;
                /**
                 * URL to the real-world location image
                 */
                realWorldImage: string;
                /**
                 * URL to the chapter video for desktop viewing
                 */
                chapterVideoUrl: string;
                /**
                 * URL to the chapter video optimized for mobile
                 */
                chapterVideoMobileUrl: string;
                /**
                 * URL to the downloadable PDF version
                 */
                chapterPdfUrl: string;
                /**
                 * Whether the chapter is available to users without prerequisites
                 */
                isUnlocked: boolean;
                /**
                 * Unique identifier for the story chapter
                 */
                storyChapterId: string;
                /**
                 * Flag to indicate if the story chapter is deleted
                 */
                delFlag: boolean;
                /**
                 * Unique identifier for the user who updated the story chapter
                 */
                updUserId: string;
            }>;
            /**
             * Unique identifier for the story saga
             */
            sagaId: string;
            /**
             * Flag to indicate if the story saga is deleted
             */
            delFlag: boolean;
            /**
             * Unique identifier for the user who updated the story saga
             */
            updUserId: string;
        },
    ): CancelablePromise<StoryResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/stories/update-saga',
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
     * Update Story Chapter
     * Update an existing story chapter.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Story Chapter update request
     * @returns StoryChapterResponseDto Successfully updated story chapter
     * @throws ApiError
     */
    public static touriiBackendControllerUpdateStoryChapter(
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
            /**
             * Unique identifier for the tourist spot
             */
            touristSpotId: string;
            /**
             * Chapter number or position (e.g., 'Prologue', 'Chapter 1')
             */
            chapterNumber: string;
            /**
             * Title of the story chapter
             */
            chapterTitle: string;
            /**
             * Detailed description or content of the story
             */
            chapterDesc: string;
            /**
             * URL to the fictional chapter image
             */
            chapterImage: string;
            /**
             * List of character names involved in the chapter
             */
            characterNameList: Array<string>;
            /**
             * URL to the real-world location image
             */
            realWorldImage: string;
            /**
             * URL to the chapter video for desktop viewing
             */
            chapterVideoUrl: string;
            /**
             * URL to the chapter video optimized for mobile
             */
            chapterVideoMobileUrl: string;
            /**
             * URL to the downloadable PDF version
             */
            chapterPdfUrl: string;
            /**
             * Whether the chapter is available to users without prerequisites
             */
            isUnlocked: boolean;
            /**
             * Unique identifier for the story chapter
             */
            storyChapterId: string;
            /**
             * Flag to indicate if the story chapter is deleted
             */
            delFlag: boolean;
            /**
             * Unique identifier for the user who updated the story chapter
             */
            updUserId: string;
        },
    ): CancelablePromise<StoryChapterResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/stories/update-chapter',
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
     * Delete Story
     * Delete a story saga.
     * @param storyId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns void
     * @throws ApiError
     */
    public static touriiBackendControllerDeleteStory(
        storyId: string,
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/stories/{storyId}',
            path: {
                'storyId': storyId,
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
     * Delete Story Chapter
     * Delete a story chapter.
     * @param chapterId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns void
     * @throws ApiError
     */
    public static touriiBackendControllerDeleteStoryChapter(
        chapterId: string,
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/stories/chapters/{chapterId}',
            path: {
                'chapterId': chapterId,
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
     * Get All Story Sagas
     * Retrieve all available story sagas.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns StoryResponseDto Successfully retrieved all sagas
     * @throws ApiError
     */
    public static touriiBackendControllerGetSagas(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<Array<StoryResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stories/sagas',
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
     * Get Story Chapters
     * Retrieve all chapters for a specific story.
     * @param storyId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns any Successfully retrieved all chapters for a specific story.
     * @throws ApiError
     */
    public static touriiBackendControllerGetStoryChaptersByStoryId(
        storyId: string,
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<{
        /**
         * Unique identifier for the story
         */
        storyId: string;
        /**
         * Unique identifier for the tourist spot
         */
        touristSpotId: string;
        /**
         * Unique identifier for the story chapter
         */
        storyChapterId: string;
        /**
         * Name of the saga
         */
        sagaName: string;
        /**
         * Chapter number or position
         */
        chapterNumber: string;
        /**
         * Title of the chapter
         */
        chapterTitle: string;
        /**
         * Detailed description of the chapter
         */
        chapterDesc: string;
        /**
         * URL to the fictional chapter image
         */
        chapterImage: string;
        /**
         * List of character names involved in the chapter
         */
        characterNameList: Array<string>;
        /**
         * URL to the real-world location image
         */
        realWorldImage: string;
        /**
         * URL to the chapter video for desktop viewing
         */
        chapterVideoUrl: string;
        /**
         * URL to the chapter video optimized for mobile
         */
        chapterVideoMobileUrl: string;
        /**
         * URL to the downloadable PDF version
         */
        chapterPdfUrl: string;
        /**
         * Whether the chapter is available to users without prerequisites
         */
        isUnlocked: boolean;
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
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stories/sagas/{storyId}/chapters',
            path: {
                'storyId': storyId,
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
     * Save chapter reading progress
     * Track user reading progress for a story chapter
     * @param chapterId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Progress request
     * @returns any Progress recorded
     * @throws ApiError
     */
    public static touriiBackendControllerMarkChapterProgress(
        chapterId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
            /**
             * ID of the user reading the chapter
             */
            userId: string;
            /**
             * Current story status
             */
            status: 'UNREAD' | 'IN_PROGRESS' | 'COMPLETED';
            /**
             * Optional latitude for location tracking
             */
            latitude?: number;
            /**
             * Optional longitude for location tracking
             */
            longitude?: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/stories/chapters/{chapterId}/progress',
            path: {
                'chapterId': chapterId,
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
     * Consolidated story action endpoint
     * Handles story start, complete, and progress actions based on X-Story-Action header
     * @param chapterId
     * @param xStoryAction Story action to perform: start, complete, or progress
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param userId User ID (used for progress action when body is not provided)
     * @param requestBody Story action request (required for start/complete, optional for progress)
     * @returns any Story action completed successfully
     * @throws ApiError
     */
    public static touriiBackendControllerHandleStoryAction(
        chapterId: string,
        xStoryAction: 'start' | 'complete' | 'progress',
        acceptVersion: string,
        xApiKey: string,
        userId?: string,
        requestBody?: {
            /**
             * ID of the user performing the story action
             */
            userId: string;
        },
    ): CancelablePromise<({
        success?: boolean;
        message?: string;
    } | {
        /**
         * Whether the story completion was successful
         */
        success: boolean;
        /**
         * Success or error message
         */
        message: string;
        /**
         * Story progress information
         */
        storyProgress: {
            /**
             * ID of the completed story chapter
             */
            storyChapterId: string;
            /**
             * Title of the completed chapter
             */
            chapterTitle: string;
            /**
             * Current story status
             */
            status: 'UNREAD' | 'IN_PROGRESS' | 'COMPLETED';
            /**
             * Timestamp when the story was completed
             */
            completedAt: any;
        };
        /**
         * List of quests unlocked by completing this story
         */
        unlockedQuests: Array<{
            /**
             * ID of the unlocked quest
             */
            questId: string;
            /**
             * Name of the unlocked quest
             */
            questName: string;
            /**
             * Description of the unlocked quest
             */
            questDesc: string;
            /**
             * Image URL for the quest
             */
            questImage: string | null;
            /**
             * Name of the tourist spot where the quest is located
             */
            touristSpotName: string;
            /**
             * Total magatama points awarded for completing this quest
             */
            totalMagatamaPointAwarded: number;
            /**
             * Whether this is a premium quest
             */
            isPremium: boolean;
        }>;
        /**
         * Rewards earned from story completion
         */
        rewards: {
            /**
             * Total magatama points earned from story completion and achievements
             */
            magatamaPointsEarned: number;
            /**
             * List of achievement names unlocked
             */
            achievementsUnlocked: Array<string>;
        };
    } | {
        /**
         * ID of the story chapter
         */
        storyChapterId: string;
        /**
         * Current reading status
         */
        status: 'UNREAD' | 'IN_PROGRESS' | 'COMPLETED';
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
    })> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/stories/chapters/{chapterId}/action',
            path: {
                'chapterId': chapterId,
            },
            headers: {
                'X-Story-Action': xStoryAction,
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            query: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
}
