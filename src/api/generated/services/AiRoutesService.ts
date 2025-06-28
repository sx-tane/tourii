/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AiRouteRecommendationRequestDto } from '../models/AiRouteRecommendationRequestDto';
import type { AiRouteRecommendationResponseDto } from '../models/AiRouteRecommendationResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AiRoutesService {
    /**
     * 🤖 Get AI Travel Route Recommendations
     *
     * **Create personalized travel routes using AI!**
     *
     * 📍 **How it works:**
     * 1. Enter keywords (e.g., "anime", "food", "nature", "temple")
     * 2. AI finds matching tourist spots and groups them by location
     * 3. Generates themed routes with names, descriptions, and recommendations
     *
     * 💡 **Examples:**
     * - Keywords: ["anime", "tokyo"] → "Otaku Paradise Route in Tokyo"
     * - Keywords: ["food", "osaka"] → "Culinary Adventure in Osaka"
     * - Keywords: ["temple", "kyoto"] → "Sacred Journey Through Kyoto"
     *
     * ⚡ **Perfect for:** Discovering new travel experiences based on your interests!
     *
     * @param xUserId
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Route recommendation request with keywords and preferences
     * @returns AiRouteRecommendationResponseDto AI route recommendations generated successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGenerateAiRouteRecommendations(
        xUserId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: AiRouteRecommendationRequestDto,
    ): CancelablePromise<AiRouteRecommendationResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai/routes/recommendations',
            headers: {
                'x-user-id': xUserId,
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request parameters`,
                429: `Rate limit exceeded for AI route generation`,
                503: `AI service temporarily unavailable`,
            },
        });
    }
    /**
     * 🏷️ Browse Available Keywords & Hashtags
     *
     * **Discover what keywords you can use for AI route recommendations!**
     *
     * 🔍 **This endpoint helps you:**
     * - See all available hashtags in the system
     * - Find popular keywords for better route matching
     * - Understand what themes and interests are covered
     *
     * 📊 **Returns:**
     * - Complete list of hashtags (e.g., "anime", "food", "temple", "nature")
     * - Total count of available hashtags
     * - Top 20 most popular hashtags
     *
     * 💡 **Pro tip:** Use these hashtags as keywords in the route recommendation endpoint!
     *
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns any Available hashtags retrieved successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGetAvailableHashtags(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai/routes/hashtags/available',
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
