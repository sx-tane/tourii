/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ModelRouteUpdateRequestDto = {
    /**
     * Unique identifier for the story
     */
    storyId: string;
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
     * Background media of the region
     */
    regionBackgroundMedia: string;
    /**
     * Recommendation of the model route
     */
    recommendation: Array<string>;
    /**
     * List of tourist spots in the model route
     */
    touristSpotList: Array<{
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
         * Hashtags associated with this location
         */
        touristSpotHashtag: Array<string>;
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
         * Address for enhanced search accuracy
         */
        address?: string;
        /**
         * Unique identifier for the tourist spot
         */
        touristSpotId: string;
        /**
         * Flag to indicate if the tourist spot is deleted
         */
        delFlag: boolean;
        /**
         * Unique identifier for the user who updated the tourist spot
         */
        updUserId: string;
    }>;
    /**
     * Unique identifier for the model route
     */
    modelRouteId: string;
    /**
     * Flag to indicate if the model route is deleted
     */
    delFlag: boolean;
    /**
     * Unique identifier for the user who updated the model route
     */
    updUserId: string;
};

