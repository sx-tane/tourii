/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LoginRequestDto = {
    /**
     * Username for login
     */
    username?: string;
    /**
     * User password
     */
    password: string;
    /**
     * Passport wallet address to validate
     */
    passportWalletAddress?: string;
    /**
     * Discord user ID
     */
    discordId?: string;
    /**
     * Google email address
     */
    googleEmail?: string;
};

