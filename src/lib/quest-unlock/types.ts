// Enhanced Quest Unlocking System Types

export interface QuestUnlockCondition {
  id: string;
  type: UnlockConditionType;
  description: string;
  metadata: Record<string, any>;
}

export type UnlockConditionType =
  | "STORY_COMPLETION"      // Complete specific story chapters
  | "QUEST_COMPLETION"      // Complete other quests
  | "TASK_COMPLETION"       // Complete specific tasks
  | "LEVEL_REQUIREMENT"     // User level requirement
  | "ACHIEVEMENT_UNLOCK"    // Earn specific achievements
  | "LOCATION_PROXIMITY"    // GPS proximity to tourist spots
  | "TIME_BASED"           // Scheduled unlock times
  | "RESOURCE_REQUIREMENT"  // Points, items, or other resources
  | "SOCIAL_REQUIREMENT"   // Complete with friends
  | "PREMIUM_GATE"         // Premium subscription required
  | "MANUAL_ADMIN";        // Manual admin unlock

export interface QuestUnlockRule {
  questId: string;
  conditions: QuestUnlockCondition[];
  operator: "AND" | "OR"; // How to combine multiple conditions
  priority: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface UnlockProgress {
  conditionId: string;
  completed: boolean;
  progress: number; // 0-100 percentage
  completedAt?: string;
  data?: Record<string, any>;
}

export interface QuestUnlockStatus {
  questId: string;
  isUnlocked: boolean;
  canUnlock: boolean;
  progress: UnlockProgress[];
  nextUnlockCondition?: QuestUnlockCondition;
  estimatedUnlockTime?: string;
}

export interface UnlockEventPayload {
  questId: string;
  previousStatus: QuestUnlockStatus;
  newStatus: QuestUnlockStatus;
  trigger: {
    type: UnlockConditionType;
    data: Record<string, any>;
  };
  userId: string;
  timestamp: string;
}

// Story-based unlock condition
export interface StoryCompletionCondition extends QuestUnlockCondition {
  type: "STORY_COMPLETION";
  metadata: {
    storyId: string;
    chapterIds: string[];
    requireAllChapters: boolean;
  };
}

// Quest dependency condition
export interface QuestCompletionCondition extends QuestUnlockCondition {
  type: "QUEST_COMPLETION";
  metadata: {
    questIds: string[];
    requireAllQuests: boolean;
    minimumScore?: number;
  };
}

// Level requirement condition
export interface LevelRequirementCondition extends QuestUnlockCondition {
  type: "LEVEL_REQUIREMENT";
  metadata: {
    minimumLevel: number;
    levelType: "USER" | "REGION" | "STORY";
  };
}

// Achievement unlock condition
export interface AchievementUnlockCondition extends QuestUnlockCondition {
  type: "ACHIEVEMENT_UNLOCK";
  metadata: {
    achievementIds: string[];
    requireAllAchievements: boolean;
  };
}

// Location proximity condition
export interface LocationProximityCondition extends QuestUnlockCondition {
  type: "LOCATION_PROXIMITY";
  metadata: {
    touristSpotId: string;
    radiusMeters: number;
    requireCheckin: boolean;
    validTimeRange?: {
      startTime: string;
      endTime: string;
    };
  };
}

// Time-based unlock condition
export interface TimeBasedCondition extends QuestUnlockCondition {
  type: "TIME_BASED";
  metadata: {
    unlockTime: string;
    timeZone: string;
    recurring?: {
      type: "DAILY" | "WEEKLY" | "MONTHLY";
      days?: number[]; // 0-6 for weekly, 1-31 for monthly
    };
  };
}

// Resource requirement condition
export interface ResourceRequirementCondition extends QuestUnlockCondition {
  type: "RESOURCE_REQUIREMENT";
  metadata: {
    resourceType: "MAGATAMA_POINTS" | "TRAVEL_DISTANCE" | "CHECKINS" | "PHOTOS";
    minimumAmount: number;
    deductOnUnlock?: boolean;
  };
}