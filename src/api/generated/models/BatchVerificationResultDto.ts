/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BatchVerificationResultDto = {
    /**
     * Individual verification results
     */
    results: Array<{
        /**
         * Whether the verification was successful
         */
        valid: boolean;
        /**
         * Token ID of the verified passport
         */
        tokenId: string;
        /**
         * Timestamp of verification
         */
        verifiedAt: string;
        /**
         * Token expiration timestamp
         */
        expiresAt?: string;
        /**
         * Passport holder data if verification successful
         */
        passportData?: {
            /**
             * Username of the passport holder
             */
            username: string;
            /**
             * User level (e.g., E-Class Amatsukami)
             */
            level: string;
            /**
             * Type of passport (e.g., Amatsukami)
             */
            passportType: string;
            /**
             * Number of quests completed
             */
            questsCompleted: number;
            /**
             * Total travel distance in km
             */
            travelDistance: number;
            /**
             * Total Magatama points earned
             */
            magatamaPoints: number;
            /**
             * Registration date
             */
            registeredAt: string;
        };
        /**
         * Error message if verification failed
         */
        error?: string;
    }>;
    /**
     * Summary statistics
     */
    summary: {
        /**
         * Total number of tokens verified
         */
        total: number;
        /**
         * Number of valid tokens
         */
        valid: number;
        /**
         * Number of invalid tokens
         */
        invalid: number;
    };
};

