/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminUserListResponseDto } from '../models/AdminUserListResponseDto';
import type { VerifySubmissionRequestDto } from '../models/VerifySubmissionRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
    /**
     * Get all users with pagination and filtering (Admin only)
     * Retrieve all users with comprehensive details, pagination, and advanced filtering options for admin dashboard.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xUserId User ID for authentication
     * @param xApiKey API key for authentication
     * @param sortOrder Sort order (default: desc)
     * @param sortBy Sort field (default: registered_at)
     * @param endDate Filter by registration end date (ISO format)
     * @param startDate Filter by registration start date (ISO format)
     * @param isBanned Filter by banned status (true/false)
     * @param isPremium Filter by premium status (true/false)
     * @param role Filter by user role
     * @param searchTerm Search in username, email, discord/twitter usernames
     * @param limit Users per page (default: 20, max: 100)
     * @param page Page number (default: 1)
     * @returns AdminUserListResponseDto All users retrieved successfully with pagination and filtering
     * @throws ApiError
     */
    public static touriiBackendControllerGetAllUsersForAdmin(
        acceptVersion: string,
        xUserId: string,
        xApiKey: string,
        sortOrder?: 'asc' | 'desc',
        sortBy?: 'username' | 'registered_at' | 'total_quest_completed' | 'total_travel_distance',
        endDate?: string,
        startDate?: string,
        isBanned?: string,
        isPremium?: string,
        role?: 'USER' | 'MODERATOR' | 'ADMIN',
        searchTerm?: string,
        limit?: number,
        page?: number,
    ): CancelablePromise<AdminUserListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/users',
            headers: {
                'accept-version': acceptVersion,
                'x-user-id': xUserId,
                'x-api-key': xApiKey,
            },
            query: {
                'sortOrder': sortOrder,
                'sortBy': sortBy,
                'endDate': endDate,
                'startDate': startDate,
                'isBanned': isBanned,
                'isPremium': isPremium,
                'role': role,
                'searchTerm': searchTerm,
                'limit': limit,
                'page': page,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Get pending task submissions for manual verification (Admin only)
     * Retrieve photo upload, social share, and text answer submissions awaiting admin approval.
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xUserId User ID for authentication
     * @param xApiKey API key for authentication
     * @param page Page number (default: 1)
     * @param limit Submissions per page (default: 20, max: 100)
     * @param taskType Filter by task type
     * @returns any Pending submissions retrieved successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGetPendingSubmissions(
        acceptVersion: string,
        xUserId: string,
        xApiKey: string,
        page?: number,
        limit?: number,
        taskType?: 'PHOTO_UPLOAD' | 'SHARE_SOCIAL' | 'ANSWER_TEXT',
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/pending-submissions',
            headers: {
                'accept-version': acceptVersion,
                'x-user-id': xUserId,
                'x-api-key': xApiKey,
            },
            query: {
                'page': page,
                'limit': limit,
                'taskType': taskType,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Manually approve or reject task submission (Admin only)
     * Admin endpoint to approve or reject pending photo/social share/text answer submissions.
     * @param id
     * @param acceptVersion API version (e.g., 1.0.0)
     * @param xUserId User ID for authentication
     * @param xApiKey API key for authentication
     * @param requestBody Submission verification request
     * @returns any Submission verification completed
     * @throws ApiError
     */
    public static touriiBackendControllerVerifySubmission(
        id: string,
        acceptVersion: string,
        xUserId: string,
        xApiKey: string,
        requestBody: VerifySubmissionRequestDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/submissions/{id}/verify',
            path: {
                'id': id,
            },
            headers: {
                'accept-version': acceptVersion,
                'x-user-id': xUserId,
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
