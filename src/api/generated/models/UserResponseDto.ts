/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserResponseDto = {
    /**
     * User ID
     */
    userId: string;
    /**
     * Username
     */
    username: string;
    /**
     * Discord ID
     */
    discordId?: string;
    /**
     * Discord username
     */
    discordUsername?: string;
    /**
     * Twitter ID
     */
    twitterId?: string;
    /**
     * Twitter username
     */
    twitterUsername?: string;
    /**
     * Google email
     */
    googleEmail?: string;
    /**
     * Passport wallet address
     */
    passportWalletAddress?: string;
    /**
     * Perks wallet address
     */
    perksWalletAddress?: string;
    /**
     * Email
     */
    email?: string;
    /**
     * Premium status
     */
    isPremium: boolean;
    /**
     * Total quests completed
     */
    totalQuestCompleted: number;
    /**
     * Total travel distance
     */
    totalTravelDistance: number;
    /**
     * User role
     */
    role: UserResponseDto.role;
    /**
     * Registration date
     */
    registeredAt: any;
    /**
     * Discord joined date
     */
    discordJoinedAt: any;
    /**
     * Ban status
     */
    isBanned: boolean;
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
    /**
     * User info
     */
    userInfo?: {
        /**
         * User ID
         */
        userId: string;
        /**
         * Digital passport NFT address
         */
        digitalPassportAddress: string;
        /**
         * Log NFT address
         */
        logNftAddress: string;
        /**
         * Digital passport type
         */
        userDigitalPassportType?: UserResponseDto.userDigitalPassportType;
        /**
         * User level
         */
        level?: UserResponseDto.level;
        /**
         * User discount rate
         */
        discountRate?: number;
        /**
         * Magatama points balance
         */
        magatamaPoints: number;
        /**
         * Magatama bags count
         */
        magatamaBags?: number;
        /**
         * Total quests completed
         */
        totalQuestCompleted: number;
        /**
         * Total travel distance
         */
        totalTravelDistance: number;
        /**
         * Premium status
         */
        isPremium: boolean;
        /**
         * Prayer bead count
         */
        prayerBead?: number;
        /**
         * Sword count
         */
        sword?: number;
        /**
         * Orge mask count
         */
        orgeMask?: number;
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
    /**
     * User achievements
     */
    userAchievements?: Array<{
        /**
         * Achievement ID
         */
        userAchievementId: string;
        /**
         * User ID
         */
        userId: string;
        /**
         * Achievement name
         */
        achievementName: string;
        /**
         * Achievement description
         */
        achievementDesc?: string;
        /**
         * Icon URL
         */
        iconUrl?: string;
        /**
         * Achievement type
         */
        achievementType: 'UNKNOWN' | 'STORY' | 'TRAVEL' | 'EXPLORE' | 'COMMUNITY' | 'MILESTONE';
        /**
         * Magatama points awarded
         */
        magatamaPointAwarded: number;
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
     * User onchain items
     */
    userOnchainItems?: Array<{
        /**
         * Onchain item ID
         */
        userOnchainItemId: string;
        /**
         * User ID
         */
        userId?: string;
        /**
         * Item type
         */
        itemType: 'UNKNOWN' | 'LOG_NFT' | 'DIGITAL_PASSPORT' | 'PERK';
        /**
         * Transaction hash
         */
        itemTxnHash: string;
        /**
         * Blockchain type
         */
        blockchainType: 'UNKNOWN' | 'VARA' | 'CAMINO';
        /**
         * Minted date
         */
        mintedAt?: any;
        /**
         * Onchain item ID
         */
        onchainItemId?: string;
        /**
         * Item status
         */
        status: 'ACTIVE' | 'USED' | 'EXPIRED' | 'PENDING';
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
     * User item claim logs
     */
    userItemClaimLogs?: Array<{
        /**
         * Item claim log ID
         */
        userItemClaimLogId: string;
        /**
         * User ID
         */
        userId: string;
        /**
         * Onchain item ID
         */
        onchainItemId?: string;
        /**
         * Offchain item name
         */
        offchainItemName?: string;
        /**
         * Item amount
         */
        itemAmount: number;
        /**
         * Item details
         */
        itemDetails?: string;
        /**
         * Item type
         */
        type: 'ONCHAIN' | 'OFFCHAIN';
        /**
         * Claimed date
         */
        claimedAt?: any;
        /**
         * Claim status
         */
        status: 'SUCCESS' | 'FAILED';
        /**
         * Error message
         */
        errorMsg?: string;
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
     * User story logs
     */
    userStoryLogs?: Array<{
        /**
         * Story log ID
         */
        userStoryLogId: string;
        /**
         * User ID
         */
        userId: string;
        /**
         * Story chapter ID
         */
        storyChapterId: string;
        /**
         * Story status
         */
        status: 'UNREAD' | 'IN_PROGRESS' | 'COMPLETED';
        /**
         * Unlocked date
         */
        unlockedAt?: any;
        /**
         * Finished date
         */
        finishedAt?: any;
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
     * User task logs
     */
    userTaskLogs?: Array<{
        /**
         * Task log ID
         */
        userTaskLogId: string;
        /**
         * User ID
         */
        userId: string;
        /**
         * Quest ID
         */
        questId: string;
        /**
         * Task ID
         */
        taskId: string;
        /**
         * Task status
         */
        status: 'AVAILABLE' | 'ONGOING' | 'COMPLETED' | 'FAILED';
        /**
         * Task action type
         */
        action: 'VISIT_LOCATION' | 'PHOTO_UPLOAD' | 'ANSWER_TEXT' | 'SELECT_OPTION' | 'SHARE_SOCIAL' | 'CHECK_IN' | 'GROUP_ACTIVITY' | 'LOCAL_INTERACTION';
        /**
         * User response
         */
        userResponse?: string;
        /**
         * Group activity members
         */
        groupActivityMembers: Array<any>;
        /**
         * Submission data
         */
        submissionData?: any;
        /**
         * Failed reason
         */
        failedReason?: string;
        /**
         * Completed date
         */
        completedAt?: any;
        /**
         * Claimed date
         */
        claimedAt?: any;
        /**
         * Total magatama points awarded
         */
        totalMagatamaPointAwarded: number;
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
     * User travel logs
     */
    userTravelLogs?: Array<{
        /**
         * Travel log ID
         */
        userTravelLogId: string;
        /**
         * User ID
         */
        userId: string;
        /**
         * Quest ID
         */
        questId: string;
        /**
         * Task ID
         */
        taskId: string;
        /**
         * Tourist spot ID
         */
        touristSpotId: string;
        /**
         * User longitude
         */
        userLongitude: number;
        /**
         * User latitude
         */
        userLatitude: number;
        /**
         * Distance from target
         */
        travelDistanceFromTarget?: number;
        /**
         * Travel distance
         */
        travelDistance: number;
        /**
         * QR code value
         */
        qrCodeValue?: string;
        /**
         * Check-in method
         */
        checkInMethod?: 'QR_CODE' | 'GPS';
        /**
         * Fraud detected
         */
        detectedFraud?: boolean;
        /**
         * Fraud reason
         */
        fraudReason?: string;
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
     * Discord activity logs
     */
    discordActivityLogs?: Array<{
        /**
         * Discord activity log ID
         */
        discordActivityLogId: string;
        /**
         * User ID
         */
        userId: string;
        /**
         * Activity type
         */
        activityType: string;
        /**
         * Activity details
         */
        activityDetails?: string;
        /**
         * Magatama points awarded
         */
        magatamaPointAwarded: number;
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
     * Discord user roles
     */
    discordUserRoles?: Array<{
        /**
         * Discord user roles ID
         */
        discordUserRolesId: string;
        /**
         * User ID
         */
        userId: string;
        /**
         * Role ID
         */
        roleId: string;
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
     * Discord rewarded roles
     */
    discordRewardedRoles?: Array<{
        /**
         * Discord rewarded roles ID
         */
        discordRewardedRolesId: string;
        /**
         * User ID
         */
        userId: string;
        /**
         * Role ID
         */
        roleId: string;
        /**
         * Magatama points awarded
         */
        magatamaPointAwarded: number;
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
     * User invite logs
     */
    userInviteLogs?: Array<{
        /**
         * Invite log ID
         */
        inviteLogId: string;
        /**
         * User ID
         */
        userId: string;
        /**
         * Invitee Discord ID
         */
        inviteeDiscordId?: string;
        /**
         * Invitee user ID
         */
        inviteeUserId?: string;
        /**
         * Magatama points awarded
         */
        magatamaPointAwarded: number;
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
};
export namespace UserResponseDto {
    /**
     * User role
     */
    export enum role {
        USER = 'USER',
        MODERATOR = 'MODERATOR',
        ADMIN = 'ADMIN',
    }
    /**
     * Digital passport type
     */
    export enum userDigitalPassportType {
        BONJIN = 'BONJIN',
        AMATSUKAMI = 'AMATSUKAMI',
        KUNITSUKAMI = 'KUNITSUKAMI',
        YOKAI = 'YOKAI',
    }
    /**
     * User level
     */
    export enum level {
        BONJIN = 'BONJIN',
        E_CLASS_AMATSUKAMI = 'E_CLASS_AMATSUKAMI',
        E_CLASS_KUNITSUKAMI = 'E_CLASS_KUNITSUKAMI',
        E_CLASS_YOKAI = 'E_CLASS_YOKAI',
        D_CLASS_AMATSUKAMI = 'D_CLASS_AMATSUKAMI',
        D_CLASS_KUNITSUKAMI = 'D_CLASS_KUNITSUKAMI',
        D_CLASS_YOKAI = 'D_CLASS_YOKAI',
        C_CLASS_AMATSUKAMI = 'C_CLASS_AMATSUKAMI',
        C_CLASS_KUNITSUKAMI = 'C_CLASS_KUNITSUKAMI',
        C_CLASS_YOKAI = 'C_CLASS_YOKAI',
        B_CLASS_AMATSUKAMI = 'B_CLASS_AMATSUKAMI',
        B_CLASS_KUNITSUKAMI = 'B_CLASS_KUNITSUKAMI',
        B_CLASS_YOKAI = 'B_CLASS_YOKAI',
        A_CLASS_AMATSUKAMI = 'A_CLASS_AMATSUKAMI',
        A_CLASS_KUNITSUKAMI = 'A_CLASS_KUNITSUKAMI',
        A_CLASS_YOKAI = 'A_CLASS_YOKAI',
        S_CLASS_AMATSUKAMI = 'S_CLASS_AMATSUKAMI',
        S_CLASS_KUNITSUKAMI = 'S_CLASS_KUNITSUKAMI',
        S_CLASS_YOKAI = 'S_CLASS_YOKAI',
    }
}

