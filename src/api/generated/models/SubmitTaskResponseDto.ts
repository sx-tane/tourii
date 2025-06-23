/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubmitTaskResponseDto = {
    /**
     * Whether the answer is correct
     */
    success: boolean;
    /**
     * Message to the user
     */
    message: string;
    /**
     * Estimated time for admin review (only for manual verification tasks)
     */
    estimatedReviewTime?: string;
};

