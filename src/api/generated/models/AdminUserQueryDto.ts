/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AdminUserQueryDto = {
    /**
     * Page number
     */
    page?: string;
    /**
     * Users per page (max 100)
     */
    limit?: string;
    /**
     * Search in username, email, discord/twitter usernames
     */
    searchTerm?: string;
    /**
     * Filter by user role
     */
    role?: AdminUserQueryDto.role;
    /**
     * Filter by premium status (true/false)
     */
    isPremium?: string;
    /**
     * Filter by banned status (true/false)
     */
    isBanned?: string;
    /**
     * Filter by registration start date (ISO format)
     */
    startDate?: string;
    /**
     * Filter by registration end date (ISO format)
     */
    endDate?: string;
    /**
     * Sort field
     */
    sortBy?: AdminUserQueryDto.sortBy;
    /**
     * Sort order
     */
    sortOrder?: AdminUserQueryDto.sortOrder;
};
export namespace AdminUserQueryDto {
    /**
     * Filter by user role
     */
    export enum role {
        USER = 'USER',
        MODERATOR = 'MODERATOR',
        ADMIN = 'ADMIN',
    }
    /**
     * Sort field
     */
    export enum sortBy {
        USERNAME = 'username',
        REGISTERED_AT = 'registered_at',
        TOTAL_QUEST_COMPLETED = 'total_quest_completed',
        TOTAL_TRAVEL_DISTANCE = 'total_travel_distance',
    }
    /**
     * Sort order
     */
    export enum sortOrder {
        ASC = 'asc',
        DESC = 'desc',
    }
}

