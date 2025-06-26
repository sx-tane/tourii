/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PassportPdfResponseDto = {
    /**
     * The token ID of the Digital Passport NFT
     */
    tokenId: string;
    /**
     * URL to download the generated PDF
     */
    downloadUrl: string;
    /**
     * JWT token for QR code verification
     */
    qrCode: string;
    /**
     * Expiration date of the PDF
     */
    expiresAt: string;
};

