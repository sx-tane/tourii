/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserEntity } from '../models/UserEntity';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
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
                401: `Unauthorized - Invalid or missing API key`,
            },
        });
    }
    /**
     * Get User by ID
     * Retrieve user information by their user ID.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns UserEntity User found successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGetUserByUserId(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<UserEntity> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{userId}/user',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
                401: `Unauthorized - Invalid or missing API key`,
                404: `User not found`,
            },
        });
    }
}
