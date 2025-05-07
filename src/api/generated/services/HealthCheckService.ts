/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthCheckService {
    /**
     * Health Check
     * Check if the API is running and accessible.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns string API is healthy
     * @throws ApiError
     */
    public static touriiBackendControllerCheckHealth(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health-check',
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
