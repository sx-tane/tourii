"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import QuestUnlockAnimation from "./QuestUnlockAnimation";
import QuestPreviewCard from "./QuestPreviewCard";
import type { QuestUnlockModalProps } from "@/types/quest-unlock-type";

/**
 * QuestUnlockModal Component
 * 
 * Main modal for displaying quest unlock notifications after story completion.
 * Features beautiful Torii gate animation, quest previews, and action buttons.
 */
const QuestUnlockModal: React.FC<QuestUnlockModalProps> = ({
  isOpen,
  onClose,
  storyCompletionData,
  onStartQuest,
  onViewAllQuests,
}) => {
  const { unlockedQuests, storyProgress, rewards } = storyCompletionData;
  
  // Get the first unlocked quest for primary display
  const primaryQuest = unlockedQuests[0];
  const hasMultipleQuests = unlockedQuests.length > 1;

  const handleStartQuest = (questId: string) => {
    onStartQuest?.(questId);
    onClose();
  };

  const handleViewAllQuests = () => {
    if (primaryQuest) {
      onViewAllQuests?.(primaryQuest.touristSpotName);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-b from-warmGrey to-white border-none shadow-2xl">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-2xl font-bold text-charcoal mb-2">
            You've unlocked a new Quest!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Torii Gate Animation */}
          <div className="flex justify-center">
            <QuestUnlockAnimation isVisible={isOpen} />
          </div>

          {/* Congratulatory Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center space-y-2"
          >
            <p className="text-warmGrey3 text-sm">
              Congratulations on completing "{storyProgress.chapterTitle}"!
            </p>
            <p className="text-charcoal font-medium">
              Your journey continues at {primaryQuest?.touristSpotName}
            </p>
          </motion.div>

          {/* Story Completion Rewards */}
          {rewards.magatamaPointsEarned > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-mustard/10 rounded-lg p-3 text-center"
            >
              <div className="flex items-center justify-center text-mustard mb-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mr-2"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-bold">
                  +{rewards.magatamaPointsEarned} Magatama Points
                </span>
              </div>
              <p className="text-xs text-warmGrey3">Story completion reward</p>
            </motion.div>
          )}

          {/* Primary Quest Preview */}
          {primaryQuest && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <QuestPreviewCard
                quest={primaryQuest}
                onStartQuest={handleStartQuest}
              />
            </motion.div>
          )}

          {/* Additional Quests Indicator */}
          {hasMultipleQuests && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-sm text-warmGrey3 mb-2">
                +{unlockedQuests.length - 1} more quest{unlockedQuests.length > 2 ? 's' : ''} available
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="space-y-3"
          >
            {hasMultipleQuests && (
              <button
                onClick={handleViewAllQuests}
                className="w-full bg-warmGrey2 text-charcoal font-semibold py-2.5 px-4 rounded-lg hover:bg-warmGrey3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-warmGrey3/50 focus:ring-offset-2"
              >
                View All Quests
              </button>
            )}
            
            <button
              onClick={onClose}
              className="w-full bg-transparent text-warmGrey3 font-medium py-2 px-4 rounded-lg hover:bg-warmGrey/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-warmGrey3/50 focus:ring-offset-2"
            >
              Continue Exploring
            </button>
          </motion.div>
        </div>

        {/* Custom close button (hidden by default due to DialogContent providing one) */}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default QuestUnlockModal;