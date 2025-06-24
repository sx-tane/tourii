import type {
  QuestUnlockRule,
  QuestUnlockStatus,
  UnlockProgress,
  QuestUnlockCondition,
  UnlockConditionType,
  StoryCompletionCondition,
  QuestCompletionCondition,
  LevelRequirementCondition,
  LocationProximityCondition,
  TimeBasedCondition,
  ResourceRequirementCondition,
  UnlockEventPayload,
} from "./types";

/**
 * Enhanced Quest Unlock Engine
 * Evaluates complex unlock conditions and manages quest availability
 */
export class QuestUnlockEngine {
  private rules: Map<string, QuestUnlockRule> = new Map();
  private userCache: Map<string, any> = new Map();
  
  /**
   * Load unlock rules for quests
   */
  async loadRules(questIds: string[]): Promise<void> {
    // In production, this would load from your database
    // For now, return mock rules
    const mockRules = this.getMockRules(questIds);
    
    for (const rule of mockRules) {
      this.rules.set(rule.questId, rule);
    }
  }

  /**
   * Evaluate unlock status for a specific quest
   */
  async evaluateQuestUnlock(
    questId: string,
    userId: string,
    userContext?: any
  ): Promise<QuestUnlockStatus> {
    const rule = this.rules.get(questId);
    
    if (!rule || !rule.enabled) {
      return {
        questId,
        isUnlocked: true, // Default unlocked if no rules
        canUnlock: true,
        progress: [],
      };
    }

    const conditionResults = await Promise.all(
      rule.conditions.map(condition => 
        this.evaluateCondition(condition, userId, userContext)
      )
    );

    const isUnlocked = this.combineConditionResults(
      conditionResults.map(r => r.completed),
      rule.operator
    );

    const canUnlock = conditionResults.some(r => !r.completed) ? 
      this.checkCanUnlock(conditionResults) : true;

    const nextUnlockCondition = conditionResults.find(r => !r.completed)?.condition;

    return {
      questId,
      isUnlocked,
      canUnlock,
      progress: conditionResults,
      nextUnlockCondition,
      estimatedUnlockTime: await this.estimateUnlockTime(conditionResults, userId),
    };
  }

  /**
   * Evaluate multiple quests unlock status
   */
  async evaluateMultipleQuests(
    questIds: string[],
    userId: string,
    userContext?: any
  ): Promise<QuestUnlockStatus[]> {
    await this.loadRules(questIds);
    
    return Promise.all(
      questIds.map(questId => 
        this.evaluateQuestUnlock(questId, userId, userContext)
      )
    );
  }

  /**
   * Handle unlock events (story completion, level up, etc.)
   */
  async handleUnlockEvent(
    eventType: UnlockConditionType,
    eventData: any,
    userId: string
  ): Promise<UnlockEventPayload[]> {
    const affectedQuests = this.findQuestsAffectedByEvent(eventType, eventData);
    const unlockEvents: UnlockEventPayload[] = [];

    for (const questId of affectedQuests) {
      const previousStatus = await this.evaluateQuestUnlock(questId, userId);
      
      // Clear cache for this user to get fresh data
      this.clearUserCache(userId);
      
      const newStatus = await this.evaluateQuestUnlock(questId, userId);

      if (!previousStatus.isUnlocked && newStatus.isUnlocked) {
        unlockEvents.push({
          questId,
          previousStatus,
          newStatus,
          trigger: {
            type: eventType,
            data: eventData,
          },
          userId,
          timestamp: new Date().toISOString(),
        });
      }
    }

    return unlockEvents;
  }

  /**
   * Evaluate individual unlock condition
   */
  private async evaluateCondition(
    condition: QuestUnlockCondition,
    userId: string,
    userContext?: any
  ): Promise<UnlockProgress & { condition: QuestUnlockCondition }> {
    let completed = false;
    let progress = 0;
    let data: Record<string, any> = {};

    switch (condition.type) {
      case "STORY_COMPLETION":
        ({ completed, progress, data } = await this.evaluateStoryCompletion(
          condition as StoryCompletionCondition,
          userId
        ));
        break;

      case "QUEST_COMPLETION":
        ({ completed, progress, data } = await this.evaluateQuestCompletion(
          condition as QuestCompletionCondition,
          userId
        ));
        break;

      case "LEVEL_REQUIREMENT":
        ({ completed, progress, data } = await this.evaluateLevelRequirement(
          condition as LevelRequirementCondition,
          userId,
          userContext
        ));
        break;

      case "LOCATION_PROXIMITY":
        ({ completed, progress, data } = await this.evaluateLocationProximity(
          condition as LocationProximityCondition,
          userId,
          userContext
        ));
        break;

      case "TIME_BASED":
        ({ completed, progress, data } = await this.evaluateTimeBased(
          condition as TimeBasedCondition
        ));
        break;

      case "RESOURCE_REQUIREMENT":
        ({ completed, progress, data } = await this.evaluateResourceRequirement(
          condition as ResourceRequirementCondition,
          userId,
          userContext
        ));
        break;

      case "PREMIUM_GATE":
        ({ completed, progress, data } = await this.evaluatePremiumGate(userId, userContext));
        break;

      case "MANUAL_ADMIN":
        ({ completed, progress, data } = await this.evaluateManualAdmin(condition, userId));
        break;

      default:
        completed = true; // Default to unlocked for unknown conditions
        progress = 100;
    }

    return {
      conditionId: condition.id,
      completed,
      progress,
      completedAt: completed ? new Date().toISOString() : undefined,
      data,
      condition,
    };
  }

  /**
   * Story completion evaluation
   */
  private async evaluateStoryCompletion(
    condition: StoryCompletionCondition,
    userId: string
  ): Promise<{ completed: boolean; progress: number; data: any }> {
    // In production, query user's completed story chapters
    const userStoryProgress = await this.getUserStoryProgress(userId);
    
    const requiredChapters = condition.metadata.chapterIds;
    const completedChapters = requiredChapters.filter(chapterId =>
      userStoryProgress.completedChapters?.includes(chapterId)
    );

    const progress = (completedChapters.length / requiredChapters.length) * 100;
    const completed = condition.metadata.requireAllChapters
      ? completedChapters.length === requiredChapters.length
      : completedChapters.length > 0;

    return {
      completed,
      progress,
      data: {
        completedChapters,
        requiredChapters,
        storyId: condition.metadata.storyId,
      },
    };
  }

  /**
   * Quest completion evaluation
   */
  private async evaluateQuestCompletion(
    condition: QuestCompletionCondition,
    userId: string
  ): Promise<{ completed: boolean; progress: number; data: any }> {
    const userQuestProgress = await this.getUserQuestProgress(userId);
    
    const requiredQuests = condition.metadata.questIds;
    const completedQuests = requiredQuests.filter(questId =>
      userQuestProgress.completedQuests?.includes(questId)
    );

    const progress = (completedQuests.length / requiredQuests.length) * 100;
    const completed = condition.metadata.requireAllQuests
      ? completedQuests.length === requiredQuests.length
      : completedQuests.length > 0;

    return {
      completed,
      progress,
      data: {
        completedQuests,
        requiredQuests,
      },
    };
  }

  /**
   * Level requirement evaluation
   */
  private async evaluateLevelRequirement(
    condition: LevelRequirementCondition,
    userId: string,
    userContext?: any
  ): Promise<{ completed: boolean; progress: number; data: any }> {
    const userLevel = userContext?.level || await this.getUserLevel(userId);
    const requiredLevel = condition.metadata.minimumLevel;
    
    const progress = Math.min((userLevel / requiredLevel) * 100, 100);
    const completed = userLevel >= requiredLevel;

    return {
      completed,
      progress,
      data: {
        currentLevel: userLevel,
        requiredLevel,
        levelType: condition.metadata.levelType,
      },
    };
  }

  /**
   * Location proximity evaluation
   */
  private async evaluateLocationProximity(
    condition: LocationProximityCondition,
    userId: string,
    userContext?: any
  ): Promise<{ completed: boolean; progress: number; data: any }> {
    const userLocation = userContext?.location;
    const touristSpot = await this.getTouristSpotLocation(condition.metadata.touristSpotId);
    
    if (!userLocation || !touristSpot) {
      return { completed: false, progress: 0, data: { error: "Location unavailable" } };
    }

    const distance = this.calculateDistance(userLocation, touristSpot);
    const requiredDistance = condition.metadata.radiusMeters;
    
    const progress = Math.max(0, 100 - (distance / requiredDistance) * 100);
    const completed = distance <= requiredDistance;

    return {
      completed,
      progress,
      data: {
        distance,
        requiredDistance,
        touristSpotId: condition.metadata.touristSpotId,
      },
    };
  }

  /**
   * Time-based evaluation
   */
  private async evaluateTimeBased(
    condition: TimeBasedCondition
  ): Promise<{ completed: boolean; progress: number; data: any }> {
    const now = new Date();
    const unlockTime = new Date(condition.metadata.unlockTime);
    
    const completed = now >= unlockTime;
    const progress = completed ? 100 : 0;

    return {
      completed,
      progress,
      data: {
        unlockTime: condition.metadata.unlockTime,
        currentTime: now.toISOString(),
      },
    };
  }

  /**
   * Resource requirement evaluation
   */
  private async evaluateResourceRequirement(
    condition: ResourceRequirementCondition,
    userId: string,
    userContext?: any
  ): Promise<{ completed: boolean; progress: number; data: any }> {
    const userResources = userContext?.resources || await this.getUserResources(userId);
    const resourceType = condition.metadata.resourceType;
    const requiredAmount = condition.metadata.minimumAmount;
    
    const currentAmount = userResources[resourceType] || 0;
    const progress = Math.min((currentAmount / requiredAmount) * 100, 100);
    const completed = currentAmount >= requiredAmount;

    return {
      completed,
      progress,
      data: {
        resourceType,
        currentAmount,
        requiredAmount,
      },
    };
  }

  /**
   * Premium gate evaluation
   */
  private async evaluatePremiumGate(
    userId: string,
    userContext?: any
  ): Promise<{ completed: boolean; progress: number; data: any }> {
    const isPremium = userContext?.isPremium || await this.getUserPremiumStatus(userId);
    
    return {
      completed: isPremium,
      progress: isPremium ? 100 : 0,
      data: { isPremium },
    };
  }

  /**
   * Manual admin unlock evaluation
   */
  private async evaluateManualAdmin(
    condition: QuestUnlockCondition,
    userId: string
  ): Promise<{ completed: boolean; progress: number; data: any }> {
    const adminUnlocks = await this.getAdminUnlocks(userId);
    const completed = adminUnlocks.includes(condition.id);
    
    return {
      completed,
      progress: completed ? 100 : 0,
      data: { adminUnlocked: completed },
    };
  }

  /**
   * Combine multiple condition results based on operator
   */
  private combineConditionResults(results: boolean[], operator: "AND" | "OR"): boolean {
    return operator === "AND" 
      ? results.every(r => r)
      : results.some(r => r);
  }

  /**
   * Check if quest can be unlocked soon
   */
  private checkCanUnlock(results: UnlockProgress[]): boolean {
    return results.some(r => r.progress > 50); // Can unlock if any condition is > 50%
  }

  /**
   * Estimate unlock time based on progress
   */
  private async estimateUnlockTime(
    results: UnlockProgress[],
    userId: string
  ): Promise<string | undefined> {
    // Simple estimation - in production, this would be more sophisticated
    const incompleteConditions = results.filter(r => !r.completed);
    
    if (incompleteConditions.length === 0) return undefined;
    
    // Return estimated time based on user's typical progress rate
    const avgProgress = incompleteConditions.reduce((sum, r) => sum + r.progress, 0) / incompleteConditions.length;
    const estimatedDays = Math.ceil((100 - avgProgress) / 10); // Rough estimate
    
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + estimatedDays);
    
    return estimatedDate.toISOString();
  }

  /**
   * Find quests affected by unlock events
   */
  private findQuestsAffectedByEvent(eventType: UnlockConditionType, eventData: any): string[] {
    const affectedQuests: string[] = [];
    
    for (const [questId, rule] of this.rules) {
      const hasMatchingCondition = rule.conditions.some(condition => {
        if (condition.type !== eventType) return false;
        
        // Check if event data matches condition metadata
        switch (eventType) {
          case "STORY_COMPLETION":
            return condition.metadata.storyId === eventData.storyId ||
                   condition.metadata.chapterIds?.includes(eventData.chapterId);
          
          case "QUEST_COMPLETION":
            return condition.metadata.questIds?.includes(eventData.questId);
          
          case "LEVEL_REQUIREMENT":
            return true; // Level changes affect all level-based conditions
          
          default:
            return true;
        }
      });
      
      if (hasMatchingCondition) {
        affectedQuests.push(questId);
      }
    }
    
    return affectedQuests;
  }

  /**
   * Helper methods for data fetching (would integrate with your actual database/API)
   */
  private async getUserStoryProgress(userId: string): Promise<any> {
    return this.userCache.get(`story_${userId}`) || { completedChapters: [] };
  }

  private async getUserQuestProgress(userId: string): Promise<any> {
    return this.userCache.get(`quest_${userId}`) || { completedQuests: [] };
  }

  private async getUserLevel(userId: string): Promise<number> {
    return this.userCache.get(`level_${userId}`) || 1;
  }

  private async getUserResources(userId: string): Promise<any> {
    return this.userCache.get(`resources_${userId}`) || {};
  }

  private async getUserPremiumStatus(userId: string): Promise<boolean> {
    return this.userCache.get(`premium_${userId}`) || false;
  }

  private async getAdminUnlocks(userId: string): Promise<string[]> {
    return this.userCache.get(`admin_unlocks_${userId}`) || [];
  }

  private async getTouristSpotLocation(spotId: string): Promise<any> {
    // Return mock location data
    return { lat: 35.6762, lng: 139.6503 };
  }

  private calculateDistance(pos1: any, pos2: any): number {
    // Simple distance calculation - use proper geolocation in production
    const R = 6371e3; // Earth's radius in meters
    const φ1 = pos1.lat * Math.PI/180;
    const φ2 = pos2.lat * Math.PI/180;
    const Δφ = (pos2.lat - pos1.lat) * Math.PI/180;
    const Δλ = (pos2.lng - pos1.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  private clearUserCache(userId: string): void {
    const keysToDelete = Array.from(this.userCache.keys()).filter(key => key.includes(userId));
    keysToDelete.forEach(key => this.userCache.delete(key));
  }

  /**
   * Generate mock rules for testing
   */
  private getMockRules(questIds: string[]): QuestUnlockRule[] {
    return questIds.map((questId, index) => ({
      questId,
      conditions: [
        {
          id: `story_${questId}`,
          type: "STORY_COMPLETION" as const,
          description: "Complete Chapter 1 of Kyoto Tales",
          metadata: {
            storyId: "STO202506-e086f3-131748-623667-BAAA",
            chapterIds: ["SCT202506-e80737-131748-5f0cbe-DAAA"],
            requireAllChapters: true,
          },
        },
        {
          id: `level_${questId}`,
          type: "LEVEL_REQUIREMENT" as const,
          description: "Reach Level 2",
          metadata: {
            minimumLevel: 2,
            levelType: "USER",
          },
        },
      ],
      operator: "OR" as const,
      priority: index,
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "system",
    }));
  }
}