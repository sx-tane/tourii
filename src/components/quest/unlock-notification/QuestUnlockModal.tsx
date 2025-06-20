import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryCompletionResponseDto } from '@/api/generated/models/StoryCompletionResponseDto';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XMarkIcon, TrophyIcon, StarIcon } from '@heroicons/react/24/outline';

interface QuestUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyCompletion: StoryCompletionResponseDto;
}

export function QuestUnlockModal({ isOpen, onClose, storyCompletion }: QuestUnlockModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
              {/* Header */}
              <div className="relative p-6 pb-4 border-b border-warmGrey-200">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-warmGrey-100 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-charcoal" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-50 rounded-full">
                    <TrophyIcon className="w-6 h-6 text-red" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-charcoal">
                      Quest Unlocked!
                    </h2>
                    <p className="text-warmGrey-600">
                      {storyCompletion.storyProgress.chapterTitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6 p-4 bg-green-50 rounded-lg"
                >
                  <p className="text-green-800 font-medium">
                    {storyCompletion.message}
                  </p>
                </motion.div>

                {/* Rewards */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-semibold text-charcoal mb-3">
                    Rewards Earned
                  </h3>
                  <div className="flex items-center gap-4 p-4 bg-warmGrey-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium text-charcoal">
                        {storyCompletion.rewards.magatamaPointsEarned} Magatama Points
                      </span>
                    </div>
                    {storyCompletion.rewards.achievementsUnlocked.length > 0 && (
                      <div className="flex items-center gap-2">
                        <TrophyIcon className="w-5 h-5 text-red" />
                        <span className="font-medium text-charcoal">
                          {storyCompletion.rewards.achievementsUnlocked.length} Achievement{storyCompletion.rewards.achievementsUnlocked.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Unlocked Quests */}
                {storyCompletion.unlockedQuests.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-charcoal mb-3">
                      New Quests Available ({storyCompletion.unlockedQuests.length})
                    </h3>
                    <div className="space-y-3">
                      {storyCompletion.unlockedQuests.map((quest, index) => (
                        <motion.div
                          key={quest.questId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="flex gap-4 p-4 bg-warmGrey-50 rounded-lg hover:bg-warmGrey-100 transition-colors"
                        >
                          {quest.questImage && (
                            <img
                              src={quest.questImage}
                              alt={quest.questName}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-charcoal">
                                {quest.questName}
                              </h4>
                              {quest.isPremium && (
                                <span className="px-2 py-1 text-xs font-medium bg-red text-white rounded-full">
                                  Premium
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-warmGrey-600 mb-2">
                              {quest.questDesc}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-warmGrey-700">
                                📍 {quest.touristSpotName}
                              </span>
                              <span className="font-medium text-charcoal">
                                ⭐ {quest.totalMagatamaPointAwarded} points
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 flex gap-3 justify-end"
                >
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="px-6"
                  >
                    Close
                  </Button>
                  {storyCompletion.unlockedQuests.length > 0 && (
                    <Button
                      onClick={onClose}
                      className="px-6 bg-red hover:bg-red/90"
                    >
                      Start Questing
                    </Button>
                  )}
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}