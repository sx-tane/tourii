/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestingService {
    /**
     * Test Security Headers
     * Tests the security headers set by SecurityMiddleware. Returns all configured security headers in the response.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns any Security headers test successful
     * @throws ApiError
     */
    public static testControllerTestHeaders(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/headers',
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
     * Test Rate Limiting
     * Tests the rate limiting middleware. Limited to 3 requests per second.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns any Rate limit test successful
     * @throws ApiError
     */
    public static testControllerTestRateLimit(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/rate-limit',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            errors: {
                401: `Unauthorized - Invalid or missing API key`,
                429: `Too Many Requests`,
            },
        });
    }
    /**
     * Test API Key Validation
     * Tests the API key validation middleware.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns any API key validation successful
     * @throws ApiError
     */
    public static testControllerTestApiKey(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/api-key',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            errors: {
                401: `Unauthorized - Missing API key`,
            },
        });
    }
    /**
     * Test Version Validation
     * Tests the API version validation middleware.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns any Version validation successful
     * @throws ApiError
     */
    public static testControllerTestVersion(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/version',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            errors: {
                400: `Bad Request - Missing version header`,
                401: `Unauthorized - Invalid or missing API key`,
            },
        });
    }
}
