/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AiRouteRecommendationRequestDto = {
    /**
     * Keywords to search for in tourist spot hashtags
     */
    keywords: Array<string>;
    /**
     * Matching mode: "all" requires all keywords, "any" requires any keyword
     */
    mode?: AiRouteRecommendationRequestDto.mode;
    /**
     * Optional region filter
     */
    region?: string;
    /**
     * Proximity radius in kilometers for clustering spots
     */
    proximityRadiusKm?: number;
    /**
     * Minimum number of spots required to form a cluster
     */
    minSpotsPerCluster?: number;
    /**
     * Maximum number of spots allowed in a cluster
     */
    maxSpotsPerCluster?: number;
    /**
     * Maximum number of routes to generate
     */
    maxRoutes?: number;
};
export namespace AiRouteRecommendationRequestDto {
    /**
     * Matching mode: "all" requires all keywords, "any" requires any keyword
     */
    export enum mode {
        ALL = 'all',
        ANY = 'any',
    }
}

