/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TouristSpotCreateRequestDto = {
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
};

