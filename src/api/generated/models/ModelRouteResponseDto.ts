/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ModelRouteResponseDto = {
    /**
     * Unique identifier for the model route
     */
    modelRouteId: string;
    /**
     * Unique identifier for the story (optional for standalone routes)
     */
    storyId?: string;
    /**
     * Name of the model route
     */
    routeName: string;
    /**
     * Region of the model route
     */
    region: string;
    /**
     * Description of the region
     */
    regionDesc: string;
    /**
     * Recommendation of the model route
     */
    recommendation: Array<string>;
    /**
     * Latitude of the region
     */
    regionLatitude: number;
    /**
     * Longitude of the region
     */
    regionLongitude: number;
    /**
     * URL to the region's cover media
     */
    regionBackgroundMedia: string;
    /**
     * List of tourist spots in the model route
     */
    touristSpotList: Array<{
        /**
         * Unique identifier for the tourist spot
         */
        touristSpotId: string;
        /**
         * Unique identifier for the story chapter
         */
        storyChapterId?: string;
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
         * Flag to indicate if the record is deleted
         */
        delFlag?: boolean;
        /**
         * ID of user who created this record
         */
        insUserId?: string;
        /**
         * Timestamp of record creation
         */
        insDateTime?: string;
        /**
         * ID of user who last updated this record
         */
        updUserId?: string;
        /**
         * Timestamp of last record update
         */
        updDateTime?: string;
    }>;
    /**
     * Current weather info for the region
     */
    regionWeatherInfo: {
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
        /**
         * Name of the region
         */
        regionName: string;
    };
    /**
     * Flag to indicate if the record is deleted
     */
    delFlag?: boolean;
    /**
     * ID of user who created this record
     */
    insUserId?: string;
    /**
     * Timestamp of record creation
     */
    insDateTime?: string;
    /**
     * ID of user who last updated this record
     */
    updUserId?: string;
    /**
     * Timestamp of last record update
     */
    updDateTime?: string;
};

