/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LocationInfoResponseDto = {
    /**
     * Location name from Google Places
     */
    name: string;
    /**
     * Formatted address from Google Places
     */
    formattedAddress?: string;
    /**
     * International phone number
     */
    phoneNumber?: string;
    /**
     * Website URL
     */
    website?: string;
    /**
     * Google Places rating (1-5 scale)
     */
    rating?: number;
    /**
     * Direct Google Maps URL
     */
    googleMapsUrl?: string;
    /**
     * Opening hours for each day of the week
     */
    openingHours?: Array<string>;
    /**
     * Thumbnail images of the location (up to 3 images, 400x400px)
     */
    images?: Array<{
        /**
         * Direct URL to the image from Google Places Photos API
         */
        url: string;
        /**
         * Image width in pixels
         */
        width: number;
        /**
         * Image height in pixels
         */
        height: number;
        /**
         * Google Places photo reference ID
         */
        photoReference: string;
    }>;
};

