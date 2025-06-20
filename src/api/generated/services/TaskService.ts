/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubmitAnswerTextRequestTaskDto } from '../models/SubmitAnswerTextRequestTaskDto';
import type { SubmitCheckInTaskRequestDto } from '../models/SubmitCheckInTaskRequestDto';
import type { SubmitSelectOptionsTaskRequestDto } from '../models/SubmitSelectOptionsTaskRequestDto';
import type { SubmitTaskResponseDto } from '../models/SubmitTaskResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TaskService {
    /**
     * Submit answer text task
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Submit answer text task request
     * @returns SubmitTaskResponseDto Submit answer text task successfully
     * @throws ApiError
     */
    public static touriiBackendControllerSubmitAnswerTextTask(
        acceptVersion: string,
        xApiKey: string,
        requestBody: SubmitAnswerTextRequestTaskDto,
    ): CancelablePromise<SubmitTaskResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/answer-text',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Submit select option task
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Submit select option task request
     * @returns SubmitTaskResponseDto Submit select option task successfully
     * @throws ApiError
     */
    public static touriiBackendControllerSubmitSelectOptionTask(
        acceptVersion: string,
        xApiKey: string,
        requestBody: SubmitSelectOptionsTaskRequestDto,
    ): CancelablePromise<SubmitTaskResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/select-option',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Submit checkin task
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Submit checkin task request
     * @returns SubmitTaskResponseDto Submit checkin task successfully
     * @throws ApiError
     */
    public static touriiBackendControllerSubmitCheckInTask(
        acceptVersion: string,
        xApiKey: string,
        requestBody: SubmitCheckInTaskRequestDto,
    ): CancelablePromise<SubmitTaskResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/checkin',
            headers: {
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
}
