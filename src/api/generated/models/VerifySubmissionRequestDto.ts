/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VerifySubmissionRequestDto = {
    /**
     * Action to take on the submission
     */
    action: VerifySubmissionRequestDto.action;
    /**
     * Reason for rejection (required when action is reject)
     */
    rejectionReason?: string;
};
export namespace VerifySubmissionRequestDto {
    /**
     * Action to take on the submission
     */
    export enum action {
        APPROVE = 'approve',
        REJECT = 'reject',
    }
}

