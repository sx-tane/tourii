/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserEntity } from '../models/UserEntity';
import type { UserResponseDto } from '../models/UserResponseDto';
import type { UserSensitiveInfoResponseDto } from '../models/UserSensitiveInfoResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Get user sensitive info
     * Get user sensitive info
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns UserSensitiveInfoResponseDto User sensitive info
     * @throws ApiError
     */
    public static touriiBackendControllerGetUserSensitiveInfo(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<UserSensitiveInfoResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/sensitive-info',
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
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns UserResponseDto Current user basic profile
     * @throws ApiError
     */
    public static touriiBackendControllerMe(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<UserResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/me',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            errors: {
                400: `Bad Request - Invalid request body or version`,
                404: `User not found`,
            },
        });
    }
}
