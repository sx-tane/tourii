import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { 
  UseQuestUnlockState,
  StoryCompletionResponseDto 
} from "@/types/quest-unlock-type";

/**
 * Custom hook for managing quest unlock modal state and navigation
 * 
 * Provides state management for the quest unlock notification system
 * and handles navigation to quest details and tourist spot pages
 */
export const useQuestUnlock = (): UseQuestUnlockState => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questUnlockData, setQuestUnlockData] = useState<StoryCompletionResponseDto | null>(null);
  const router = useRouter();

  /**
   * Show the quest unlock modal with completion data
   */
  const showUnlockModal = useCallback((data: StoryCompletionResponseDto) => {
    setQuestUnlockData(data);
    setIsModalOpen(true);
  }, []);

  /**
   * Hide the quest unlock modal and clear data
   */
  const hideUnlockModal = useCallback(() => {
    setIsModalOpen(false);
    // Clear data after animation completes
    setTimeout(() => {
      setQuestUnlockData(null);
    }, 300);
  }, []);

  /**
   * Handle navigation to specific quest details
   */
  const handleStartQuest = useCallback((questId: string) => {
    router.push(`/v2/quests/${questId}`);
  }, [router]);

  /**
   * Handle navigation to tourist spot page with all quests
   * For now, navigating to quest list - can be updated when tourist spot pages are ready
   */
  const handleViewAllQuests = useCallback((touristSpotName: string) => {
    // TODO: Update this when tourist spot pages are implemented
    // For now, navigate to general quest list
    router.push("/v2/quests");
  }, [router]);

  return {
    isModalOpen,
    questUnlockData,
    showUnlockModal,
    hideUnlockModal,
    handleStartQuest,
    handleViewAllQuests,
  };
};