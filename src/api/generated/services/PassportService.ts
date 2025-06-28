/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchVerificationRequestDto } from '../models/BatchVerificationRequestDto';
import type { BatchVerificationResultDto } from '../models/BatchVerificationResultDto';
import type { BothWalletPassesResultDto } from '../models/BothWalletPassesResultDto';
import type { PassportPdfResponseDto } from '../models/PassportPdfResponseDto';
import type { PassStatusDto } from '../models/PassStatusDto';
import type { VerificationResultDto } from '../models/VerificationResultDto';
import type { VerificationStatsDto } from '../models/VerificationStatsDto';
import type { WalletPassResultDto } from '../models/WalletPassResultDto';
import type { WalletPassUpdateRequestDto } from '../models/WalletPassUpdateRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PassportService {
    /**
     * Generate Digital Passport PDF
     * Generate a professional PDF passport document with user achievements and QR code verification. Uploads to cloud storage and returns download URL.
     * @param tokenId The token ID of the Digital Passport NFT
     * @returns PassportPdfResponseDto Passport PDF generated and uploaded successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGeneratePdf(
        tokenId: string,
    ): CancelablePromise<PassportPdfResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/passport/generate/{tokenId}',
            path: {
                'tokenId': tokenId,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
                404: `Passport not found`,
            },
        });
    }
    /**
     * Refresh Passport with New Achievements
     * Regenerate passport PDF with updated user achievements and progress
     * @param tokenId The token ID of the Digital Passport NFT
     * @returns any Passport refreshed successfully
     * @throws ApiError
     */
    public static touriiBackendControllerRefreshPassport(
        tokenId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/passport/refresh/{tokenId}',
            path: {
                'tokenId': tokenId,
            },
        });
    }
    /**
     * Generate Passport Preview
     * Generate a preview PDF without uploading to storage (for testing/preview purposes)
     * @param tokenId The token ID of the Digital Passport NFT
     * @returns binary Preview PDF generated successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGeneratePreview(
        tokenId: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/passport/preview/{tokenId}',
            path: {
                'tokenId': tokenId,
            },
        });
    }
    /**
     * Download Passport PDF
     * Generate and directly download passport PDF (generates on-demand)
     * @param tokenId The token ID of the Digital Passport NFT
     * @returns binary PDF downloaded successfully
     * @throws ApiError
     */
    public static touriiBackendControllerDownloadPdf(
        tokenId: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/passport/download/{tokenId}',
            path: {
                'tokenId': tokenId,
            },
        });
    }
    /**
     * Verify Passport Token
     * Verify a passport verification token (from QR code or manual entry). Public endpoint requiring no authentication.
     * @param verificationCode The verification token (JWT) from QR code or manual entry
     * @returns VerificationResultDto Verification completed (check valid field for result)
     * @throws ApiError
     */
    public static touriiBackendControllerVerifyPassport(
        verificationCode: string,
    ): CancelablePromise<VerificationResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/verify/{verificationCode}',
            path: {
                'verificationCode': verificationCode,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Batch Verify Multiple Passports
     * Verify multiple passport tokens at once. Useful for bulk verification scenarios.
     * @param requestBody
     * @returns BatchVerificationResultDto Batch verification completed
     * @throws ApiError
     */
    public static touriiBackendControllerBatchVerifyPassports(
        requestBody: BatchVerificationRequestDto,
    ): CancelablePromise<BatchVerificationResultDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/verify/batch',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Verify QR Code
     * Verify a passport using QR code data. Alias for standard verification endpoint.
     * @param qrCode The QR code data (JWT token)
     * @returns VerificationResultDto QR code verification completed
     * @throws ApiError
     */
    public static touriiBackendControllerVerifyQrCode(
        qrCode: string,
    ): CancelablePromise<VerificationResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/verify/qr/{qrCode}',
            path: {
                'qrCode': qrCode,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Get Verification Statistics
     * Get verification statistics for a specific token ID or global stats if no token ID provided
     * @param tokenId The token ID to get stats for (optional)
     * @returns VerificationStatsDto Verification statistics retrieved successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGetVerificationStats(
        tokenId?: string,
    ): CancelablePromise<VerificationStatsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/verify/stats/{tokenId}',
            path: {
                'tokenId': tokenId,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
    /**
     * Generate Apple Wallet Pass
     * Generate Apple Wallet pass (.pkpass file) for Digital Passport NFT
     * @param tokenId The token ID of the Digital Passport NFT
     * @returns WalletPassResultDto Apple Wallet pass generated successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGenerateAppleWalletPass(
        tokenId: string,
    ): CancelablePromise<WalletPassResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/passport/{tokenId}/wallet/apple',
            path: {
                'tokenId': tokenId,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
                404: `Passport not found`,
            },
        });
    }
    /**
     * Generate Google Pay Pass
     * Generate Google Pay pass for Digital Passport NFT
     * @param tokenId The token ID of the Digital Passport NFT
     * @returns WalletPassResultDto Google Pay pass generated successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGenerateGoogleWalletPass(
        tokenId: string,
    ): CancelablePromise<WalletPassResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/passport/{tokenId}/wallet/google',
            path: {
                'tokenId': tokenId,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
                404: `Passport not found`,
            },
        });
    }
    /**
     * Generate Both Wallet Passes
     * Generate both Apple Wallet and Google Pay passes for Digital Passport NFT
     * @param tokenId The token ID of the Digital Passport NFT
     * @returns BothWalletPassesResultDto Both wallet passes generated successfully
     * @throws ApiError
     */
    public static touriiBackendControllerGenerateBothWalletPasses(
        tokenId: string,
    ): CancelablePromise<BothWalletPassesResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/passport/{tokenId}/wallet/both',
            path: {
                'tokenId': tokenId,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
                404: `Passport not found`,
            },
        });
    }
    /**
     * Update Wallet Pass
     * Update an existing wallet pass for a specific platform
     * @param tokenId The token ID of the Digital Passport NFT
     * @param requestBody
     * @returns WalletPassResultDto Wallet pass updated successfully
     * @throws ApiError
     */
    public static touriiBackendControllerUpdateWalletPass(
        tokenId: string,
        requestBody: WalletPassUpdateRequestDto,
    ): CancelablePromise<WalletPassResultDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/passport/{tokenId}/wallet/update',
            path: {
                'tokenId': tokenId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid version format`,
                404: `Passport not found`,
            },
        });
    }
    /**
     * Validate Token ID
     * Check if a token ID exists and is valid for passport generation
     * @param tokenId The token ID to validate
     * @returns PassStatusDto Token validation result
     * @throws ApiError
     */
    public static touriiBackendControllerValidateTokenStatus(
        tokenId: string,
    ): CancelablePromise<PassStatusDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/passport/validate/{tokenId}',
            path: {
                'tokenId': tokenId,
            },
            errors: {
                400: `Bad Request - Invalid version format`,
            },
        });
    }
}
