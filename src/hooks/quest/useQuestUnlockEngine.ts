"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { QuestUnlockEngine } from "@/lib/quest-unlock/engine";
import type {
  QuestUnlockStatus,
  UnlockEventPayload,
  UnlockConditionType,
} from "@/lib/quest-unlock/types";

/**
 * Enhanced Quest Unlock Hook
 * Provides quest unlock status evaluation and real-time updates
 */
export function useQuestUnlockEngine(questIds: string[] = []) {
  const { data: session } = useSession();
  const [engine] = useState(() => new QuestUnlockEngine());
  const [unlockStatuses, setUnlockStatuses] = useState<Map<string, QuestUnlockStatus>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Evaluate unlock status for all provided quest IDs
   */
  const evaluateQuests = useCallback(async (questIdsToEvaluate: string[] = questIds) => {
    if (!session?.user?.id || questIdsToEvaluate.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const userContext = {
        level: (session.user as any).level || 1,
        isPremium: (session.user as any).isPremium || false,
        location: null, // Would get from geolocation API
        resources: {
          MAGATAMA_POINTS: 0,
          TRAVEL_DISTANCE: 0,
          CHECKINS: 0,
          PHOTOS: 0,
        },
      };

      const statuses = await engine.evaluateMultipleQuests(
        questIdsToEvaluate,
        session.user.id,
        userContext
      );

      const statusMap = new Map<string, QuestUnlockStatus>();
      statuses.forEach(status => statusMap.set(status.questId, status));
      
      setUnlockStatuses(statusMap);
    } catch (err) {
      console.error("Failed to evaluate quest unlocks:", err);
      setError("Failed to evaluate quest unlock status");
    } finally {
      setIsLoading(false);
    }
  }, [questIds, session?.user?.id, engine]);

  /**
   * Handle unlock events (story completion, level up, etc.)
   */
  const handleUnlockEvent = useCallback(async (
    eventType: UnlockConditionType,
    eventData: any
  ): Promise<UnlockEventPayload[]> => {
    if (!session?.user?.id) return [];

    try {
      const unlockEvents = await engine.handleUnlockEvent(
        eventType,
        eventData,
        session.user.id
      );

      // Re-evaluate affected quests
      const affectedQuestIds = unlockEvents.map(event => event.questId);
      if (affectedQuestIds.length > 0) {
        await evaluateQuests(affectedQuestIds);
      }

      return unlockEvents;
    } catch (err) {
      console.error("Failed to handle unlock event:", err);
      return [];
    }
  }, [session?.user?.id, engine, evaluateQuests]);

  /**
   * Get unlock status for a specific quest
   */
  const getQuestUnlockStatus = useCallback((questId: string): QuestUnlockStatus | null => {
    return unlockStatuses.get(questId) || null;
  }, [unlockStatuses]);

  /**
   * Check if a quest is unlocked
   */
  const isQuestUnlocked = useCallback((questId: string): boolean => {
    const status = unlockStatuses.get(questId);
    return status?.isUnlocked ?? true; // Default to unlocked if no status
  }, [unlockStatuses]);

  /**
   * Get progress towards unlocking a quest
   */
  const getUnlockProgress = useCallback((questId: string): number => {
    const status = unlockStatuses.get(questId);
    if (!status || status.isUnlocked) return 100;
    
    const totalProgress = status.progress.reduce((sum, p) => sum + p.progress, 0);
    return status.progress.length > 0 ? totalProgress / status.progress.length : 0;
  }, [unlockStatuses]);

  /**
   * Get next unlock requirement for a quest
   */
  const getNextUnlockRequirement = useCallback((questId: string): string | null => {
    const status = unlockStatuses.get(questId);
    return status?.nextUnlockCondition?.description || null;
  }, [unlockStatuses]);

  /**
   * Trigger story completion event
   */
  const handleStoryCompletion = useCallback(async (storyId: string, chapterId: string) => {
    return handleUnlockEvent("STORY_COMPLETION", { storyId, chapterId });
  }, [handleUnlockEvent]);

  /**
   * Trigger quest completion event
   */
  const handleQuestCompletion = useCallback(async (questId: string, score?: number) => {
    return handleUnlockEvent("QUEST_COMPLETION", { questId, score });
  }, [handleUnlockEvent]);

  /**
   * Trigger level up event
   */
  const handleLevelUp = useCallback(async (newLevel: number, levelType: string = "USER") => {
    return handleUnlockEvent("LEVEL_REQUIREMENT", { newLevel, levelType });
  }, [handleUnlockEvent]);

  /**
   * Trigger location check event
   */
  const handleLocationCheck = useCallback(async (location: { lat: number; lng: number }) => {
    return handleUnlockEvent("LOCATION_PROXIMITY", { location });
  }, [handleUnlockEvent]);

  // Initial evaluation when quest IDs or session changes
  useEffect(() => {
    if (questIds.length > 0) {
      evaluateQuests();
    }
  }, [questIds, evaluateQuests]);

  return {
    // State
    unlockStatuses: Array.from(unlockStatuses.values()),
    isLoading,
    error,

    // Quest status queries
    getQuestUnlockStatus,
    isQuestUnlocked,
    getUnlockProgress,
    getNextUnlockRequirement,

    // Actions
    evaluateQuests,
    handleUnlockEvent,

    // Convenience event handlers
    handleStoryCompletion,
    handleQuestCompletion,
    handleLevelUp,
    handleLocationCheck,

    // Utils
    refreshUnlockStatus: () => evaluateQuests(),
  };
}