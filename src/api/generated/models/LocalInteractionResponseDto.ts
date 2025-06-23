/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LocalInteractionResponseDto = {
    /**
     * Status message
     */
    message: string;
    /**
     * Task status after submission
     */
    status: LocalInteractionResponseDto.status;
    /**
     * Expected review timeframe
     */
    estimatedReviewTime: string;
};
export namespace LocalInteractionResponseDto {
    /**
     * Task status after submission
     */
    export enum status {
        AVAILABLE = 'AVAILABLE',
        ONGOING = 'ONGOING',
        COMPLETED = 'COMPLETED',
        FAILED = 'FAILED',
    }
}

