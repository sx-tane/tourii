/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CheckinsFetchRequestDto = {
    /**
     * Page number (default: 1)
     */
    page: string;
    /**
     * Items per page (default: 20, max: 100)
     */
    limit: string;
    /**
     * Filter by specific user ID (admin only)
     */
    userId?: string;
    /**
     * Filter by specific quest ID
     */
    questId?: string;
    /**
     * Filter by specific tourist spot ID
     */
    touristSpotId?: string;
    /**
     * Filter by check-in method
     */
    checkInMethod?: CheckinsFetchRequestDto.checkInMethod;
    /**
     * Filter by source type (manual=QR_CODE|GPS, auto=AUTO_DETECTED|BACKGROUND_GPS)
     */
    source?: CheckinsFetchRequestDto.source;
    /**
     * Filter from date (ISO format)
     */
    startDate: string;
    /**
     * Filter to date (ISO format)
     */
    endDate: string;
};
export namespace CheckinsFetchRequestDto {
    /**
     * Filter by check-in method
     */
    export enum checkInMethod {
        QR_CODE = 'QR_CODE',
        GPS = 'GPS',
        AUTO_DETECTED = 'AUTO_DETECTED',
        BACKGROUND_GPS = 'BACKGROUND_GPS',
    }
    /**
     * Filter by source type (manual=QR_CODE|GPS, auto=AUTO_DETECTED|BACKGROUND_GPS)
     */
    export enum source {
        MANUAL = 'manual',
        AUTO = 'auto',
    }
}

