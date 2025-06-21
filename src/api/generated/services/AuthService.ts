/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthSignupRequestDto } from '../models/AuthSignupRequestDto';
import type { AuthSignupResponseDto } from '../models/AuthSignupResponseDto';
import type { LoginRequestDto } from '../models/LoginRequestDto';
import type { UserEntity } from '../models/UserEntity';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * User Login
     * Login using username or other identifiers with optional wallet/social checks.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Login request
     * @returns UserEntity Login successful
     * @throws ApiError
     */
    public static touriiBackendControllerLogin(
        acceptVersion: string,
        xApiKey: string,
        requestBody: LoginRequestDto,
    ): CancelablePromise<UserEntity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid version format`,
                404: `User not found`,
            },
        });
    }
    /**
     * User signup with wallet
     * Create user account using wallet signature verification.
     * @param requestBody Signup info
     * @returns AuthSignupResponseDto Signup success
     * @throws ApiError
     */
    public static touriiBackendControllerSignup(
        requestBody: AuthSignupRequestDto,
    ): CancelablePromise<AuthSignupResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid request body or version`,
            },
        });
    }
}
