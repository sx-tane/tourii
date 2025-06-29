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
export class RoutesTouristSpotsService {
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
             * Unique identifier for the story (optional for standalone routes)
             */
            storyId?: string;
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
                 * Unique identifier for the story chapter. Leave undefined to skip story chapter linking.
                 */
                storyChapterId?: string;
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
     * Get Model Routes with Filtering and Pagination
     * Retrieve model routes with optional filtering by AI-generated status, region, user, and pagination support.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param offset Number of routes to skip for pagination (default: 0)
     * @param limit Maximum number of routes to return (1-100, default: 20)
     * @param userId Filter routes created by specific user ID
     * @param region Filter routes by region name (case-insensitive partial match)
     * @param source Filter routes by source: ai (AI-generated), manual (user-created), or all (default: all)
     * @returns ModelRouteResponseDto Successfully retrieved model routes
     * @throws ApiError
     */
    public static touriiBackendControllerGetRoutes(
        acceptVersion: string,
        xApiKey: string,
        offset?: string,
        limit?: string,
        userId?: string,
        region?: string,
        source?: 'ai' | 'manual' | 'all',
    ): CancelablePromise<Array<ModelRouteResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/routes',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            query: {
                'offset': offset,
                'limit': limit,
                'userId': userId,
                'region': region,
                'source': source,
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
             * Unique identifier for the story chapter. Leave undefined to skip story chapter linking.
             */
            storyChapterId?: string;
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
     * Create Standalone Tourist Spot
     * Create a standalone tourist spot without associating it to a specific route. This allows creating individual tourist spots that can later be added to multiple routes or used independently.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Standalone tourist spot creation request
     * @returns TouristSpotResponseDto Successfully created standalone tourist spot
     * @throws ApiError
     */
    public static touriiBackendControllerCreateStandaloneTouristSpot(
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
            /**
             * Unique identifier for the story chapter. Leave undefined to skip story chapter linking.
             */
            storyChapterId?: string;
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
            url: '/tourist-spots',
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
     * Create User Tourist Route
     * Create a user-generated tourist route by combining existing tourist spots. Unlike model routes which are predefined, this allows users to create custom routes from available tourist spots.
     * @param xUserId User ID for route ownership
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody User tourist route creation request
     * @returns ModelRouteResponseDto Successfully created user tourist route
     * @throws ApiError
     */
    public static touriiBackendControllerCreateTouristRoute(
        xUserId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
            /**
             * Name of the tourist route (1-100 characters)
             */
            routeName: string;
            /**
             * Description of the route (1-500 characters)
             */
            regionDesc: string;
            /**
             * List of recommendations for this route (1-10 items)
             */
            recommendations: Array<string>;
            /**
             * Array of existing tourist spot IDs to include (1-20 spots)
             */
            touristSpotIds: Array<string>;
        },
    ): CancelablePromise<ModelRouteResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tourist/routes',
            headers: {
                'x-user-id': xUserId,
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
     * Get Standalone Tourist Spots
     * Get only standalone tourist spots (not embedded in routes) with pagination support.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param offset Number of tourist spots to skip for pagination (default: 0)
     * @param limit Maximum number of tourist spots to return (1-100, default: 20)
     * @returns TouristSpotResponseDto Successfully retrieved standalone tourist spots
     * @throws ApiError
     */
    public static touriiBackendControllerGetStandaloneTouristSpots(
        acceptVersion: string,
        xApiKey: string,
        offset?: string,
        limit?: string,
    ): CancelablePromise<Array<TouristSpotResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tourist-spots/standalone',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            query: {
                'offset': offset,
                'limit': limit,
            },
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
             * Unique identifier for the story (optional for standalone routes)
             */
            storyId?: string;
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
                 * Unique identifier for the story chapter. Leave undefined to skip story chapter linking.
                 */
                storyChapterId?: string;
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
             * Unique identifier for the story chapter. Leave undefined to skip story chapter linking.
             */
            storyChapterId?: string;
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
     * Search Tourist Spots
     * Server-side search with filters for performance. Search in name, description, address, and hashtags.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param offset Number of tourist spots to skip for pagination (default: 0)
     * @param limit Maximum number of tourist spots to return (1-100, default: 20)
     * @param hashtags Comma-separated hashtags to filter by (e.g., "food,shrine,nature")
     * @param location Search in address and location data (case-insensitive partial match)
     * @param query Search in tourist spot name and description (case-insensitive partial match)
     * @returns TouristSpotResponseDto Successfully retrieved tourist spots matching search criteria
     * @throws ApiError
     */
    public static touriiBackendControllerSearchTouristSpots(
        acceptVersion: string,
        xApiKey: string,
        offset?: string,
        limit?: string,
        hashtags?: string,
        location?: string,
        query?: string,
    ): CancelablePromise<Array<TouristSpotResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tourist-spots/search',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            query: {
                'offset': offset,
                'limit': limit,
                'hashtags': hashtags,
                'location': location,
                'query': query,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Get Tourist Spot by ID
     * Get specific tourist spot by ID without searching through routes.
     * @param touristSpotId Tourist spot ID
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns TouristSpotResponseDto Successfully retrieved tourist spot
     * @throws ApiError
     */
    public static touriiBackendControllerGetTouristSpotById(
        touristSpotId: string,
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<TouristSpotResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tourist-spots/{touristSpotId}',
            path: {
                'touristSpotId': touristSpotId,
            },
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
                404: `Tourist spot not found`,
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
}
