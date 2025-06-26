/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VerificationStatsDto = {
    /**
     * Token ID if specific stats requested
     */
    tokenId?: string;
    /**
     * Total verification count
     */
    totalVerifications: number;
    /**
     * Verifications today
     */
    todayVerifications: number;
    /**
     * Last verification timestamp
     */
    lastVerified?: string;
    /**
     * Most verified passports
     */
    popularPassports?: Array<{
        /**
         * Token ID
         */
        tokenId: string;
        /**
         * Username
         */
        username: string;
        /**
         * Number of verifications
         */
        verificationCount: number;
    }>;
};

