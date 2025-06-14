/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MomentListResponseDto = {
    moments: Array<{
        /**
         * URL of the moment image
         */
        imageUrl?: string | null;
        /**
         * Traveler display name
         */
        username?: string | null;
        /**
         * Short moment description
         */
        description?: string | null;
        /**
         * Text describing earned rewards
         */
        rewardText?: string | null;
        /**
         * Timestamp when the moment occurred
         */
        insDateTime: string;
    }>;
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

