/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WalletPassUpdateRequestDto = {
    /**
     * Token ID of the Digital Passport NFT
     */
    tokenId: string;
    /**
     * Wallet platform to update
     */
    platform: WalletPassUpdateRequestDto.platform;
};
export namespace WalletPassUpdateRequestDto {
    /**
     * Wallet platform to update
     */
    export enum platform {
        APPLE = 'apple',
        GOOGLE = 'google',
    }
}

