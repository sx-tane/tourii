import type { UserResponseDto } from "@/api/generated";
import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { UseApiHookResult } from "../types";

/**
 * Extract passport-related information from UserResponseDto
 */
export interface PassportData {
	// Core passport info
	passportType: UserResponseDto.userDigitalPassportType | null;
	digitalPassportAddress: string | null;
	level: UserResponseDto.level | null;

	// User stats
	magatamaPoints: number;
	totalQuestCompleted: number;
	totalTravelDistance: number;
	isPremium: boolean;

	// User profile
	username: string;
	userId: string;

	// Achievements and travel history
	achievements: Array<{
		achievementName: string;
		achievementDesc?: string;
		iconUrl?: string;
		achievementType: string;
		magatamaPointAwarded: number;
	}>;

	travelHistory: Array<{
		location: string;
		date: string;
		verified: boolean;
		travelDistance: number;
		checkInMethod?: string;
	}>;

	// Items and perks
	onchainItems: Array<{
		itemType: string;
		status: string;
		mintedAt?: any;
		blockchainType: string;
	}>;
}

/**
 * Transform UserResponseDto to PassportData
 */
function transformUserToPassport(user: UserResponseDto): PassportData {
	return {
		// Core passport info
		passportType: user.userInfo?.userDigitalPassportType || null,
		digitalPassportAddress: user.userInfo?.digitalPassportAddress || null,
		level: user.userInfo?.level || null,

		// User stats
		magatamaPoints: user.userInfo?.magatamaPoints || 0,
		totalQuestCompleted: user.totalQuestCompleted,
		totalTravelDistance: user.totalTravelDistance,
		isPremium: user.isPremium,

		// User profile
		username: user.username || "Unknown User",
		userId: user.userId,

		// Achievements
		achievements: (user.userAchievements || []).map((achievement) => ({
			achievementName: achievement.achievementName,
			achievementDesc: achievement.achievementDesc,
			iconUrl: achievement.iconUrl,
			achievementType: achievement.achievementType,
			magatamaPointAwarded: achievement.magatamaPointAwarded,
		})),

		// Travel history
		travelHistory: (user.userTravelLogs || []).map((log) => ({
			location: log.touristSpotId, // Using touristSpotId as location identifier
			date: log.insDateTime || new Date().toISOString(),
			verified: !log.detectedFraud,
			travelDistance: log.travelDistance,
			checkInMethod: log.checkInMethod,
		})),

		// Onchain items
		onchainItems: (user.userOnchainItems || []).map((item) => ({
			itemType: item.itemType,
			status: item.status,
			mintedAt: item.mintedAt,
			blockchainType: item.blockchainType,
		})),
	};
}

/**
 * Hook to fetch current user's passport data using SWR.
 * Standardized API hook following the consistent pattern.
 *
 * @returns Standardized hook result with passport data
 */
export function usePassport(): UseApiHookResult<PassportData> & {
	passport: PassportData | undefined;
} {
	const {
		data: userData,
		error,
		isLoading,
		mutate,
	} = useProxySWR<UserResponseDto>("/api/passport");

	// Transform user data to passport data
	const passportData = userData ? transformUserToPassport(userData) : undefined;

	return {
		// Standardized properties
		data: passportData,
		isLoading,
		isError: Boolean(error),
		error: (error as Error) || null,
		mutate: async () => {
			const result = await mutate();
			return result ? transformUserToPassport(result) : undefined;
		},
		// Legacy property for backward compatibility
		passport: passportData,
	};
}
