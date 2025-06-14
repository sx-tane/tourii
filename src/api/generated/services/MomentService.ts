/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MomentListResponseDto } from '../models/MomentListResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MomentService {
    /**
     * Get latest moments
     * Latest traveler moments
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param limit Items per page
     * @param page Page number
     * @returns MomentListResponseDto Fetch moments successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGetMoments(
        acceptVersion: string,
        xApiKey: string,
        limit?: number,
        page?: number,
    ): CancelablePromise<MomentListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/moments',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            query: {
                'limit': limit,
                'page': page,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
}
