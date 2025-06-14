/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HomepageHighlightsResponseDto } from '../models/HomepageHighlightsResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HomepageService {
    /**
     * Get homepage highlights
     * Latest chapter and popular quest
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @returns HomepageHighlightsResponseDto Homepage highlights
     * @throws ApiError
     */
    public static touriiBackendControllerGetHomepageHighlights(
        acceptVersion: string,
        xApiKey: string,
    ): CancelablePromise<HomepageHighlightsResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v2/homepage/highlights',
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
