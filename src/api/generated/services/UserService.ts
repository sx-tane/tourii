/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserEntity } from '../models/UserEntity';
import type { UserResponseDto } from '../models/UserResponseDto';
import type { UserSensitiveInfoResponseDto } from '../models/UserSensitiveInfoResponseDto';
import type { UserTravelLogListResponseDto } from '../models/UserTravelLogListResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Get user sensitive info
     * Get user sensitive info
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xUserId User ID for authentication
     * @param xApiKey API key for authentication
     * @returns UserSensitiveInfoResponseDto User sensitive info
     * @throws ApiError
     */
    public static touriiBackendControllerGetUserSensitiveInfo(
        acceptVersion: string,
        xUserId: string,
        xApiKey: string,
    ): CancelablePromise<UserSensitiveInfoResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/sensitive-info',
            headers: {
                'accept-version': acceptVersion,
                'x-user-id': xUserId,
                'x-api-key': xApiKey,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Create User
     * Create a new user in the system.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody User creation request
     * @returns UserEntity User created successfully
     * @throws ApiError
     */
    public static touriiBackendControllerCreateUser(
        acceptVersion: string,
        xApiKey: string,
        requestBody: UserEntity,
    ): CancelablePromise<UserEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - User already exists`,
            },
        });
    }
    /**
     * Get current user's basic profile
     * Retrieve authenticated user's profile information.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xUserId User ID for authentication
     * @param xApiKey API key for authentication
     * @returns UserResponseDto Current user basic profile
     * @throws ApiError
     */
    public static touriiBackendControllerMe(
        acceptVersion: string,
        xUserId: string,
        xApiKey: string,
    ): CancelablePromise<UserResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/me',
            headers: {
                'accept-version': acceptVersion,
                'x-user-id': xUserId,
                'x-api-key': xApiKey,
            },
            errors: {
                400: `Bad Request - Invalid request body or version`,
                404: `User not found`,
            },
        });
    }
    /**
     * Get User Travel Checkins
     * Retrieve user travel checkin history with location coordinates for map rendering. Supports pagination and filtering by quest, tourist spot, and date range.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xUserId User ID for authentication
     * @param xApiKey API key for authentication
     * @param endDate Filter to date (ISO format)
     * @param startDate Filter from date (ISO format)
     * @param touristSpotId Filter by specific tourist spot ID
     * @param questId Filter by specific quest ID
     * @param userId Filter by specific user ID (admin only)
     * @param limit Items per page (default: 20, max: 100)
     * @param page Page number (default: 1)
     * @returns UserTravelLogListResponseDto User travel checkins retrieved successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGetCheckins(
        acceptVersion: string,
        xUserId: string,
        xApiKey: string,
        endDate?: string,
        startDate?: string,
        touristSpotId?: string,
        questId?: string,
        userId?: string,
        limit?: number,
        page?: number,
    ): CancelablePromise<UserTravelLogListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/checkins',
            headers: {
                'accept-version': acceptVersion,
                'x-user-id': xUserId,
                'x-api-key': xApiKey,
            },
            query: {
                'endDate': endDate,
                'startDate': startDate,
                'touristSpotId': touristSpotId,
                'questId': questId,
                'userId': userId,
                'limit': limit,
                'page': page,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
}
