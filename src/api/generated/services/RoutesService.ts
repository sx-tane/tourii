/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationInfoResponseDto } from '../models/LocationInfoResponseDto';
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
             * Description of the region
             */
            regionDesc: string;
            /**
             * Background media of the region
             */
            regionBackgroundMedia: string;
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
                /**
                 * Address for enhanced search accuracy
                 */
                address?: string;
            }>;
        },
    ): CancelablePromise<ModelRouteResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/routes',
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
     * Get All Model Routes
     * Retrieve a list of all available model routes with their details.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns ModelRouteResponseDto Successfully retrieved all model routes
     * @throws ApiError
     */
    public static touriiBackendControllerGetRoutes(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<Array<ModelRouteResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes',
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
     * Create Tourist Spot
     * Create a new tourist spot.
     * @param routeId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Tourist Spot creation request
     * @returns TouristSpotResponseDto Successfully created tourist spot
     * @throws ApiError
     */
    public static touriiBackendControllerCreateTouristSpot(
        routeId: string,
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
            /**
             * Address for enhanced search accuracy
             */
            address?: string;
        },
    ): CancelablePromise<TouristSpotResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/routes/{routeId}/tourist-spots',
            path: {
                'routeId': routeId,
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
     * Update Model Route
     * Update an existing model route.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Model Route update request
     * @returns ModelRouteResponseDto Successfully updated model route
     * @throws ApiError
     */
    public static touriiBackendControllerUpdateModelRoute(
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
             * Description of the region
             */
            regionDesc: string;
            /**
             * Background media of the region
             */
            regionBackgroundMedia: string;
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
                /**
                 * Address for enhanced search accuracy
                 */
                address?: string;
                /**
                 * Unique identifier for the tourist spot
                 */
                touristSpotId: string;
                /**
                 * Flag to indicate if the tourist spot is deleted
                 */
                delFlag: boolean;
                /**
                 * Unique identifier for the user who updated the tourist spot
                 */
                updUserId: string;
            }>;
            /**
             * Unique identifier for the model route
             */
            modelRouteId: string;
            /**
             * Flag to indicate if the model route is deleted
             */
            delFlag: boolean;
            /**
             * Unique identifier for the user who updated the model route
             */
            updUserId: string;
        },
    ): CancelablePromise<ModelRouteResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/routes/update-model-route',
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
     * Update Tourist Spot
     * Update an existing tourist spot.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Tourist Spot update request
     * @returns TouristSpotResponseDto Successfully updated tourist spot
     * @throws ApiError
     */
    public static touriiBackendControllerUpdateTouristSpot(
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
            /**
             * Address for enhanced search accuracy
             */
            address?: string;
            /**
             * Unique identifier for the tourist spot
             */
            touristSpotId: string;
            /**
             * Flag to indicate if the tourist spot is deleted
             */
            delFlag: boolean;
            /**
             * Unique identifier for the user who updated the tourist spot
             */
            updUserId: string;
        },
    ): CancelablePromise<TouristSpotResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/routes/update-tourist-spot',
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
     * Delete Model Route
     * Delete an existing model route.
     * @param routeId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns void
     * @throws ApiError
     */
    public static touriiBackendControllerDeleteModelRoute(
        routeId: string,
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/routes/{routeId}',
            path: {
                'routeId': routeId,
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
     * Delete Tourist Spot
     * Delete a tourist spot.
     * @param touristSpotId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns void
     * @throws ApiError
     */
    public static touriiBackendControllerDeleteTouristSpot(
        touristSpotId: string,
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/routes/tourist-spots/{touristSpotId}',
            path: {
                'touristSpotId': touristSpotId,
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
     * Get Tourist Spots by Story Chapter
     * Retrieve tourist spot information linked to a story chapter.
     * @param storyChapterId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns TouristSpotResponseDto Successfully retrieved tourist spots
     * @throws ApiError
     */
    public static touriiBackendControllerGetTouristSpotsByChapterId(
        storyChapterId: string,
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<Array<TouristSpotResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/tourist-spots/{storyChapterId}',
            path: {
                'storyChapterId': storyChapterId,
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
     * Get Model Route by ID
     * Retrieve a specific model route by its ID, including tourist spots and weather data.
     * @param id
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns ModelRouteResponseDto Successfully retrieved the model route
     * @throws ApiError
     */
    public static touriiBackendControllerGetRouteById(
        id: string,
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<ModelRouteResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes/{id}',
            path: {
                'id': id,
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
     * Get Location Info
     * Retrieve basic location details with thumbnail images using Google Places.
     * @param query Place name or search query
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param address Address for enhanced search accuracy
     * @param longitude Longitude for location bias
     * @param latitude Latitude for location bias
     * @returns LocationInfoResponseDto Successfully retrieved location info with images
     * @throws ApiError
     */
    public static touriiBackendControllerGetLocationInfo(
        query: string,
        acceptVersion: string,
        xApiKey: string,
        address?: string,
        longitude?: string,
        latitude?: string,
    ): CancelablePromise<LocationInfoResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations/info',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            query: {
                'address': address,
                'longitude': longitude,
                'latitude': latitude,
                'query': query,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
}
