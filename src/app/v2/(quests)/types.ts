import type { ReactNode } from "react";

export type QuestType =
	| "UNKNOWN"
	| "TRAVEL_TO_EARN"
	| "EARN_TO_TRAVEL"
	| "CAMPAIGN"
	| "COMMUNITY_EVENT";
export type TaskStatus = "completed" | "in-progress" | "not-started";
export type QuestDifficulty = "Easy" | "Medium" | "Hard";
export type TaskTheme =
	| "STORY"
	| "LOCAL_CULTURE"
	| "FOOD"
	| "URBAN_EXPLORE"
	| "NATURE";
export type TaskType =
	| "VISIT_LOCATION"
	| "PHOTO_UPLOAD"
	| "ANSWER_TEXT"
	| "SELECT_OPTION"
	| "SHARE_SOCIAL"
	| "CHECK_IN"
	| "GROUP_ACTIVITY"
	| "LOCAL_INTERACTION";
export type RewardType =
	| "UNKNOWN"
	| "LOCAL_EXPERIENCES"
	| "CULINARY"
	| "ADVENTURE_NATURE"
	| "CULTURAL_COMMUNITY"
	| "HIDDEN_PERKS"
	| "SURPRISE_TREATS"
	| "BONUS_UPGRADES"
	| "SOCIAL_RECOGNITION"
	| "RETURNING_VISITOR_BONUS"
	| "ELITE_EXPERIENCES"
	| "WELLNESS"
	| "SHOPPING"
	| "ENTERTAINMENT"
	| "TRANSPORT_CONNECTIVITY"
	| "LOCAL_PARTNERSHIPS";

export interface QuestTask {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;
	theme?: TaskTheme;
	type: TaskType;
	isUnlocked: boolean;
	requiredAction?: string;
	groupActivityMembers?: Array<{
		userId: string;
		discordId: string;
		groupName: string;
	}>;
	selectOptions?: Array<{
		optionText: string;
		answerFlag: boolean;
		image?: string;
	}>;
	antiCheatRules?: {
		claimOnce?: boolean;
		cooldownHours?: number;
		maxAttempts?: number;
		verifyLink?: boolean;
		verifyTeam?: boolean;
	};
	magatamaPointAwarded: number;
	totalMagatamaPointAwarded: number;
	completedAt?: string;
	startedAt?: string;
	notes?: string;
	rating?: number;
}

export interface Quest {
	id: string;
	title: string;
	type: QuestType;
	location: string;
	description: string;
	questImage?: string;
	isUnlocked: boolean;
	isPremium: boolean;
	reward: {
		icon: ReactNode;
		value: ReactNode;
		type: RewardType;
		items?: Array<{
			itemName: string;
			itemDesc: string;
			itemImage?: string;
		}>;
		magatamaPoints: number;
	};
	difficulty: QuestDifficulty;
	deadline: string;
	progress: number;
	totalTasks: number;
	onlineTasks: QuestTask[];
	offlineTasks: QuestTask[];
	requirements?: {
		level?: number;
		prerequisites?: string[];
	};
	tags?: string[];
	createdAt: string;
	updatedAt: string;
}
