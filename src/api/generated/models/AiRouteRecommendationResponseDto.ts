/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AiRouteRecommendationResponseDto = {
    /**
     * AI-generated routes based on keyword search
     */
    generatedRoutes: Array<{
        /**
         * Generated model route ID
         */
        modelRouteId: string;
        /**
         * AI-generated route name
         */
        routeName: string;
        /**
         * AI-generated region description
         */
        regionDesc: string;
        /**
         * AI-generated recommendation hashtags
         */
        recommendations: Array<string>;
        /**
         * Route region
         */
        region: string;
        /**
         * Center latitude of the route
         */
        regionLatitude: number;
        /**
         * Center longitude of the route
         */
        regionLongitude: number;
        /**
         * AI-estimated duration for the route
         */
        estimatedDuration: string;
        /**
         * AI confidence score (0-1)
         */
        confidenceScore: number;
        /**
         * Number of tourist spots in this route
         */
        spotCount: number;
        /**
         * Average distance from center in kilometers
         */
        averageDistance: number;
        /**
         * Tourist spots included in this route
         */
        touristSpots: Array<{
            /**
             * Tourist spot ID
             */
            touristSpotId: string;
            /**
             * Tourist spot name
             */
            touristSpotName: string;
            /**
             * Tourist spot description
             */
            touristSpotDesc?: string;
            /**
             * Latitude coordinate
             */
            latitude: number;
            /**
             * Longitude coordinate
             */
            longitude: number;
            /**
             * Hashtags for this tourist spot
             */
            touristSpotHashtag: Array<string>;
            /**
             * Keywords that matched for this spot
             */
            matchedKeywords: Array<string>;
        }>;
        /**
         * Route generation metadata
         */
        metadata: {
            /**
             * Original search keywords
             */
            sourceKeywords: Array<string>;
            /**
             * When the route was generated
             */
            generatedAt: string;
            /**
             * Algorithm version used
             */
            algorithm: string;
            /**
             * Indicates this was AI-generated
             */
            aiGenerated?: boolean;
        };
    }>;
    /**
     * Processing summary and statistics
     */
    summary: {
        /**
         * Total tourist spots found matching keywords
         */
        totalSpotsFound: number;
        /**
         * Number of geographic clusters formed
         */
        clustersFormed: number;
        /**
         * Number of AI routes successfully generated
         */
        routesGenerated: number;
        /**
         * Total processing time in milliseconds
         */
        processingTimeMs: number;
        /**
         * Whether AI content generation was available
         */
        aiAvailable: boolean;
    };
    /**
     * Success message
     */
    message?: string;
};

