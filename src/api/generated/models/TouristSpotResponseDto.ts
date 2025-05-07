/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TouristSpotResponseDto = {
    /**
     * Unique identifier for the tourist spot
     */
    touristSpotId: string;
    /**
     * Unique identifier for the story chapter
     */
    storyChapterId: string;
    /**
     * Name of the tourist spot
     */
    touristSpotName: string;
    /**
     * Description of the tourist spot
     */
    touristSpotDesc: string;
    /**
     * Best visit time of the tourist spot
     */
    bestVisitTime: string;
    /**
     * Address of the tourist spot
     */
    address: string;
    /**
     * Latitude of the tourist spot
     */
    touristSpotLatitude: number;
    /**
     * Longitude of the tourist spot
     */
    touristSpotLongitude: number;
    /**
     * Hashtags associated with this location
     */
    touristSpotHashtag: Array<string>;
    /**
     * Link to the related story chapter
     */
    storyChapterLink?: string;
    /**
     * Image set for the tourist spot
     */
    imageSet?: {
        /**
         * Main image of the tourist spot
         */
        main: string;
        /**
         * Small images of the tourist spot
         */
        small: Array<string>;
    };
    /**
     * Weather info for the tourist spot
     */
    weatherInfo?: {
        /**
         * Temperature of the weather
         */
        temperatureCelsius: number;
        /**
         * Name of the weather
         */
        weatherName: string;
        /**
         * Description of the weather
         */
        weatherDesc: string;
    };
    /**
     * Flag to indicate if the tourist spot is deleted
     */
    delFlag: boolean;
    /**
     * ID of user who created this record
     */
    insUserId: string;
    /**
     * Timestamp of record creation
     */
    insDateTime: string;
    /**
     * ID of user who last updated this record
     */
    updUserId: string;
    /**
     * Timestamp of last record update
     */
    updDateTime: string;
};

