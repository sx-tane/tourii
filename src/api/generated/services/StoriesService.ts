/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
     * @returns any Success
     * @throws ApiError
     */
    public static touriiBackendControllerCreateStory(
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
             * List of chapters in the saga
             */
            chapterList?: Array<{
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
            }>;
        },
    ): CancelablePromise<{
        /**
         * Unique identifier for the story saga
         */
        storyId: string;
        /**
         * Name of the story saga
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
        mapImage: string;
        /**
         * Real-world location of the saga
         */
        location: string;
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
         * List of stories in the saga
         */
        chapterList?: Array<{
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
             * Flag to indicate if the story chapter is deleted
             */
            delFlag: boolean;
            /**
             * ID of user who created this record
             */
            insUserId: string;
            /**
             * Timestamp of record creation
             */
            insDateTime: string;
            /**
             * ID of user who last updated this record
             */
            updUserId: string;
            /**
             * Timestamp of last record update
             */
            updDateTime: string;
        }>;
        /**
         * Flag to indicate if the story is deleted
         */
        delFlag: boolean;
        /**
         * ID of user who created this record
         */
        insUserId: string;
        /**
         * Timestamp of record creation
         */
        insDateTime: string;
        /**
         * ID of user who last updated this record
         */
        updUserId: string;
        /**
         * Timestamp of last record update
         */
        updDateTime: string;
    }> {
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
                401: `Unauthorized - Invalid or missing API key`,
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
     * @returns any Success
     * @throws ApiError
     */
    public static touriiBackendControllerCreateStoryChapter(
        storyId: string,
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
        },
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
         * Flag to indicate if the story chapter is deleted
         */
        delFlag: boolean;
        /**
         * ID of user who created this record
         */
        insUserId: string;
        /**
         * Timestamp of record creation
         */
        insDateTime: string;
        /**
         * ID of user who last updated this record
         */
        updUserId: string;
        /**
         * Timestamp of last record update
         */
        updDateTime: string;
    }> {
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
                401: `Unauthorized - Invalid or missing API key`,
            },
        });
    }
    /**
     * Update Story Saga
     * Update an existing story saga.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Story Saga update request
     * @returns any Success
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
             * List of chapters in the saga
             */
            chapterList?: Array<{
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
    ): CancelablePromise<{
        /**
         * Unique identifier for the story saga
         */
        storyId: string;
        /**
         * Name of the story saga
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
        mapImage: string;
        /**
         * Real-world location of the saga
         */
        location: string;
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
         * List of stories in the saga
         */
        chapterList?: Array<{
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
             * Flag to indicate if the story chapter is deleted
             */
            delFlag: boolean;
            /**
             * ID of user who created this record
             */
            insUserId: string;
            /**
             * Timestamp of record creation
             */
            insDateTime: string;
            /**
             * ID of user who last updated this record
             */
            updUserId: string;
            /**
             * Timestamp of last record update
             */
            updDateTime: string;
        }>;
        /**
         * Flag to indicate if the story is deleted
         */
        delFlag: boolean;
        /**
         * ID of user who created this record
         */
        insUserId: string;
        /**
         * Timestamp of record creation
         */
        insDateTime: string;
        /**
         * ID of user who last updated this record
         */
        updUserId: string;
        /**
         * Timestamp of last record update
         */
        updDateTime: string;
    }> {
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
                401: `Unauthorized - Invalid or missing API key`,
            },
        });
    }
    /**
     * Update Story Chapter
     * Update an existing story chapter.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Story Chapter update request
     * @returns any Success
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
         * Flag to indicate if the story chapter is deleted
         */
        delFlag: boolean;
        /**
         * ID of user who created this record
         */
        insUserId: string;
        /**
         * Timestamp of record creation
         */
        insDateTime: string;
        /**
         * ID of user who last updated this record
         */
        updUserId: string;
        /**
         * Timestamp of last record update
         */
        updDateTime: string;
    }> {
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
                401: `Unauthorized - Invalid or missing API key`,
            },
        });
    }
    /**
     * Get All Story Sagas
     * Retrieve all available story sagas.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns any Successfully retrieved all sagas
     * @throws ApiError
     */
    public static touriiBackendControllerGetSagas(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<{
        /**
         * Unique identifier for the story saga
         */
        storyId: string;
        /**
         * Name of the story saga
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
        mapImage: string;
        /**
         * Real-world location of the saga
         */
        location: string;
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
         * List of stories in the saga
         */
        chapterList?: Array<{
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
             * Flag to indicate if the story chapter is deleted
             */
            delFlag: boolean;
            /**
             * ID of user who created this record
             */
            insUserId: string;
            /**
             * Timestamp of record creation
             */
            insDateTime: string;
            /**
             * ID of user who last updated this record
             */
            updUserId: string;
            /**
             * Timestamp of last record update
             */
            updDateTime: string;
        }>;
        /**
         * Flag to indicate if the story is deleted
         */
        delFlag: boolean;
        /**
         * ID of user who created this record
         */
        insUserId: string;
        /**
         * Timestamp of record creation
         */
        insDateTime: string;
        /**
         * ID of user who last updated this record
         */
        updUserId: string;
        /**
         * Timestamp of last record update
         */
        updDateTime: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stories/sagas',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
                401: `Unauthorized - Invalid or missing API key`,
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
         * Flag to indicate if the story chapter is deleted
         */
        delFlag: boolean;
        /**
         * ID of user who created this record
         */
        insUserId: string;
        /**
         * Timestamp of record creation
         */
        insDateTime: string;
        /**
         * ID of user who last updated this record
         */
        updUserId: string;
        /**
         * Timestamp of last record update
         */
        updDateTime: string;
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
                401: `Unauthorized - Invalid or missing API key`,
            },
        });
    }
}
