/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserTravelLogListResponseDto = {
    /**
     * List of user travel log checkins
     */
    checkins: Array<{
        /**
         * Travel log ID
         */
        userTravelLogId: string;
        /**
         * User ID
         */
        userId: string;
        /**
         * Quest ID
         */
        questId: string;
        /**
         * Task ID
         */
        taskId: string;
        /**
         * Tourist spot ID
         */
        touristSpotId: string;
        /**
         * User longitude
         */
        userLongitude: number;
        /**
         * User latitude
         */
        userLatitude: number;
        /**
         * Distance from target
         */
        travelDistanceFromTarget?: number;
        /**
         * Travel distance
         */
        travelDistance: number;
        /**
         * QR code value
         */
        qrCodeValue?: string;
        /**
         * Check-in method
         */
        checkInMethod?: 'QR_CODE' | 'GPS' | 'AUTO_DETECTED' | 'BACKGROUND_GPS';
        /**
         * Fraud detected
         */
        detectedFraud?: boolean;
        /**
         * Fraud reason
         */
        fraudReason?: string;
        /**
         * Flag to indicate if the record is deleted
         */
        delFlag?: boolean;
        /**
         * ID of user who created this record
         */
        insUserId?: string;
        /**
         * Timestamp of record creation
         */
        insDateTime?: string;
        /**
         * ID of user who last updated this record
         */
        updUserId?: string;
        /**
         * Timestamp of last record update
         */
        updDateTime?: string;
    }>;
    /**
     * Pagination information
     */
    pagination: {
        /**
         * Current page number
         */
        currentPage: number;
        /**
         * Total number of pages
         */
        totalPages: number;
        /**
         * Total number of items
         */
        totalItems: number;
    };
};

