/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocalInteractionResponseDto } from '../models/LocalInteractionResponseDto';
import type { QrScanResponseDto } from '../models/QrScanResponseDto';
import type { QuestTaskPhotoUploadResponseDto } from '../models/QuestTaskPhotoUploadResponseDto';
import type { QuestTaskSocialShareResponseDto } from '../models/QuestTaskSocialShareResponseDto';
import type { SubmitAnswerTextRequestTaskDto } from '../models/SubmitAnswerTextRequestTaskDto';
import type { SubmitCheckInTaskRequestDto } from '../models/SubmitCheckInTaskRequestDto';
import type { SubmitSelectOptionsTaskRequestDto } from '../models/SubmitSelectOptionsTaskRequestDto';
import type { SubmitTaskResponseDto } from '../models/SubmitTaskResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TaskService {
    /**
     * Upload task photo
     * Upload photo for photo submission task completion.
     * @param taskId
     * @param xUserId User ID for authentication
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param formData Photo upload payload
     * @returns QuestTaskPhotoUploadResponseDto Photo submitted successfully
     * @throws ApiError
     */
    public static touriiBackendControllerUploadTaskPhoto(
        taskId: string,
        xUserId: string,
        acceptVersion: string,
        xApiKey: string,
        formData: {
            file?: Blob;
        },
    ): CancelablePromise<QuestTaskPhotoUploadResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/{taskId}/photo-upload',
            path: {
                'taskId': taskId,
            },
            headers: {
                'x-user-id': xUserId,
                'accept-version': acceptVersion,
                'x-api-key': xApiKey,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Complete social sharing task
     * Submit social media proof URL for task completion.
     * @param taskId
     * @param xUserId User ID for authentication
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Social share proof URL
     * @returns QuestTaskSocialShareResponseDto Social share recorded successfully
     * @throws ApiError
     */
    public static touriiBackendControllerCompleteSocialShareTask(
        taskId: string,
        xUserId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
            proofUrl: string;
            /**
             * Optional latitude for location tracking
             */
            latitude?: number;
            /**
             * Optional longitude for location tracking
             */
            longitude?: number;
        },
    ): CancelablePromise<QuestTaskSocialShareResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/{taskId}/social-share',
            path: {
                'taskId': taskId,
            },
            headers: {
                'x-user-id': xUserId,
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
     * Complete QR scan task
     * Validate scanned QR code and complete the task if correct
     * @param taskId
     * @param xUserId User ID for authentication
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody QR scan request
     * @returns QrScanResponseDto QR code validated and task completed
     * @throws ApiError
     */
    public static touriiBackendControllerCompleteQrScanTask(
        taskId: string,
        xUserId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: {
            code: string;
            latitude?: number;
            longitude?: number;
        },
    ): CancelablePromise<QrScanResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/{taskId}/qr-scan',
            path: {
                'taskId': taskId,
            },
            headers: {
                'x-user-id': xUserId,
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
     * Submit answer text task
     * Submit text answer for text-based task completion.
     * @param taskId
     * @param xUserId User ID for authentication
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Submit answer text task request
     * @returns SubmitTaskResponseDto Submit answer text task successfully
     * @throws ApiError
     */
    public static touriiBackendControllerSubmitAnswerTextTask(
        taskId: string,
        xUserId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: SubmitAnswerTextRequestTaskDto,
    ): CancelablePromise<SubmitTaskResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/{taskId}/answer-text',
            path: {
                'taskId': taskId,
            },
            headers: {
                'x-user-id': xUserId,
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
     * Submit selected options for multiple choice task completion.
     * @param taskId
     * @param xUserId User ID for authentication
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Submit select option task request
     * @returns SubmitTaskResponseDto Submit select option task successfully
     * @throws ApiError
     */
    public static touriiBackendControllerSubmitSelectOptionTask(
        taskId: string,
        xUserId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: SubmitSelectOptionsTaskRequestDto,
    ): CancelablePromise<SubmitTaskResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/{taskId}/select-option',
            path: {
                'taskId': taskId,
            },
            headers: {
                'x-user-id': xUserId,
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
     * Submit location coordinates for check-in task completion.
     * @param taskId
     * @param xUserId User ID for authentication
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Submit checkin task request
     * @returns SubmitTaskResponseDto Submit checkin task successfully
     * @throws ApiError
     */
    public static touriiBackendControllerSubmitCheckInTask(
        taskId: string,
        xUserId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: SubmitCheckInTaskRequestDto,
    ): CancelablePromise<SubmitTaskResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/{taskId}/checkin',
            path: {
                'taskId': taskId,
            },
            headers: {
                'x-user-id': xUserId,
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
     * Submit local interaction task
     * Submit text, photo, or audio content for local interaction tasks. Supports both JSON (with base64) and multipart file uploads.
     * @param taskId
     * @param xUserId User ID for authentication
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xApiKey API key for authentication
     * @param requestBody Local interaction submission - supports JSON with base64 or multipart file upload
     * @returns LocalInteractionResponseDto Local interaction submitted successfully
     * @throws ApiError
     */
    public static touriiBackendControllerSubmitLocalInteraction(
        taskId: string,
        xUserId: string,
        acceptVersion: string,
        xApiKey: string,
        requestBody: ({
            /**
             * Type of interaction content
             */
            interactionType: 'text' | 'photo' | 'audio';
            /**
             * Text content or base64 encoded file
             */
            content: string;
            /**
             * Optional latitude for anti-cheat verification
             */
            latitude?: number;
            /**
             * Optional longitude for anti-cheat verification
             */
            longitude?: number;
        } | {
            /**
             * Type of interaction content
             */
            interactionType: 'text' | 'photo' | 'audio';
            /**
             * Text content (for text type)
             */
            content?: string;
            /**
             * Photo or audio file (for photo/audio types)
             */
            file?: Blob;
            /**
             * Optional latitude for anti-cheat verification
             */
            latitude?: number;
            /**
             * Optional longitude for anti-cheat verification
             */
            longitude?: number;
        }),
    ): CancelablePromise<LocalInteractionResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/{taskId}/local-interaction',
            path: {
                'taskId': taskId,
            },
            headers: {
                'x-user-id': xUserId,
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
