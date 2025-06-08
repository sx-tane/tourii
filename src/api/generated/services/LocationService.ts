/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LocationService {
    /**
     * Get Location Info
     * Retrieve basic location details using Google Places.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns any Successfully retrieved location info
     * @throws ApiError
     */
    public static touriiBackendControllerGetLocationInfo(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<{
        name?: string;
        formattedAddress?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/location-info',
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
