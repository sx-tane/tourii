/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BothWalletPassesResultDto = {
    /**
     * Token ID of the Digital Passport NFT
     */
    tokenId: string;
    /**
     * Apple Wallet pass data
     */
    apple: {
        /**
         * Token ID of the Digital Passport NFT
         */
        tokenId: string;
        /**
         * Wallet platform (apple or google)
         */
        platform: BothWalletPassesResultDto.platform;
        /**
         * Direct download URL for Apple passes
         */
        downloadUrl?: string;
        /**
         * URL to add pass to wallet
         */
        redirectUrl: string;
        /**
         * Pass expiration timestamp
         */
        expiresAt: string;
        /**
         * Pass file buffer (for direct downloads)
         */
        passBuffer?: any;
    };
    /**
     * Google Pay pass data
     */
    google: {
        /**
         * Token ID of the Digital Passport NFT
         */
        tokenId: string;
        /**
         * Wallet platform (apple or google)
         */
        platform: BothWalletPassesResultDto.platform;
        /**
         * Direct download URL for Apple passes
         */
        downloadUrl?: string;
        /**
         * URL to add pass to wallet
         */
        redirectUrl: string;
        /**
         * Pass expiration timestamp
         */
        expiresAt: string;
        /**
         * Pass file buffer (for direct downloads)
         */
        passBuffer?: any;
    };
};
export namespace BothWalletPassesResultDto {
    /**
     * Wallet platform (apple or google)
     */
    export enum platform {
        APPLE = 'apple',
        GOOGLE = 'google',
    }
}

