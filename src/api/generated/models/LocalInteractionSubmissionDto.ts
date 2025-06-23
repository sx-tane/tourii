/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LocalInteractionSubmissionDto = {
    /**
     * Type of interaction content
     */
    interactionType: LocalInteractionSubmissionDto.interactionType;
    /**
     * Text content or base64 encoded file
     */
    content: string;
    /**
     * Optional latitude for anti-cheat verification
     */
    latitude?: number;
    /**
     * Optional longitude for anti-cheat verification
     */
    longitude?: number;
};
export namespace LocalInteractionSubmissionDto {
    /**
     * Type of interaction content
     */
    export enum interactionType {
        TEXT = 'text',
        PHOTO = 'photo',
        AUDIO = 'audio',
    }
}

