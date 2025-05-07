/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ModelRouteResponseDto } from '../models/ModelRouteResponseDto';
import type { TouristSpotResponseDto } from '../models/TouristSpotResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RoutesService {
    /**
     * Create Model Route
     * Create a new model route.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Model Route creation request
     * @returns ModelRouteResponseDto Successfully created model route
     * @throws ApiError
     */
    public static touriiBackendControllerCreateModelRoute(
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
            /**
             * Unique identifier for the story
             */
            storyId: string;
            /**
             * Name of the model route
             */
            routeName: string;
            /**
             * Region of the model route
             */
            region: string;
            /**
             * Recommendation of the model route
             */
            recommendation: Array<string>;
            /**
             * List of tourist spots in the model route
             */
            touristSpotList: Array<{
                /**
                 * Unique identifier for the story chapter
                 */
                storyChapterId: string;
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
                 * Hashtags associated with this location
                 */
                touristSpotHashtag: Array<string>;
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
            }>;
        },
    ): CancelablePromise<ModelRouteResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/routes/create-model-route',
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
     * Create Tourist Spot
     * Create a new tourist spot.
     * @param modelRouteId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Tourist Spot creation request
     * @returns TouristSpotResponseDto Successfully created tourist spot
     * @throws ApiError
     */
    public static touriiBackendControllerCreateTouristSpot(
        modelRouteId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
            /**
             * Unique identifier for the story chapter
             */
            storyChapterId: string;
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
             * Hashtags associated with this location
             */
            touristSpotHashtag: Array<string>;
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
        },
    ): CancelablePromise<TouristSpotResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/routes/create-tourist-spot/{modelRouteId}',
            path: {
                'modelRouteId': modelRouteId,
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
}
