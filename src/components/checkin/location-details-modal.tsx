"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Gift, ExternalLink, RotateCcw, Heart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { CheckinResponseDto } from "@/hooks/api/useCheckins";

export interface LocationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkin: CheckinResponseDto | null;
  onViewStory?: (storyId: string) => void;
  onReplayQuest?: (questId: string) => void;
  onAddToMemoryWall?: (checkinId: string) => void;
}

// Type indicator icons and colors
const typeStyles = {
  story: {
    icon: '⛩️',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  quest: {
    icon: '🏢',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  route: {
    icon: '💎',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
} as const;

const LocationDetailsModal: React.FC<LocationDetailsModalProps> = ({
  isOpen,
  onClose,
  checkin,
  onViewStory,
  onReplayQuest,
  onAddToMemoryWall,
}) => {
  if (!checkin) return null;

  const style = typeStyles[checkin.type];
  const visitDate = new Date(checkin.timestamp);

  const activities = [];
  if (checkin.quest) activities.push("Quest completed");
  if (checkin.story) activities.push("Story chapter read");
  if (checkin.type === 'route') activities.push("Route passed through");

  const handleViewStory = () => {
    if (checkin.story && onViewStory) {
      onViewStory(checkin.story.id);
    }
  };

  const handleReplayQuest = () => {
    if (checkin.quest && onReplayQuest) {
      onReplayQuest(checkin.quest.id);
    }
  };

  const handleAddToMemoryWall = () => {
    if (onAddToMemoryWall) {
      onAddToMemoryWall(checkin.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 overflow-hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              {/* Header with location icon */}
              <div className={`${style.bgColor} ${style.borderColor} border-b px-6 py-4`}>
                <DialogHeader>
                  <div className="flex items-center justify-center mb-3">
                    <motion.div
                      className="text-6xl"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20,
                        delay: 0.1 
                      }}
                    >
                      {style.icon}
                    </motion.div>
                  </div>
                  <DialogTitle className="text-center text-xl font-bold text-gray-900">
                    {checkin.touristSpot.name}
                  </DialogTitle>
                </DialogHeader>
              </div>

              <div className="p-6 space-y-6">
                {/* Visit details */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Visited {formatDistanceToNow(visitDate, { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {checkin.latitude.toFixed(4)}, {checkin.longitude.toFixed(4)}
                    </span>
                  </div>
                </motion.div>

                {/* Activities */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <h3 className="font-semibold text-gray-900">Activities:</h3>
                  <div className="space-y-2">
                    {activities.map((activity, index) => (
                      <motion.div
                        key={activity}
                        className="flex items-center gap-2 text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.2 }}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm">{activity}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Rewards */}
                {checkin.rewards.length > 0 && (
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      Earned rewards:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {checkin.rewards.map((reward, index) => (
                        <motion.div
                          key={reward.id}
                          className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.2 }}
                        >
                          {reward.imageUrl ? (
                            <img 
                              src={reward.imageUrl} 
                              alt={reward.name}
                              className="w-6 h-6 object-contain"
                            />
                          ) : (
                            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                              🏷️
                            </div>
                          )}
                          <span className="text-sm font-medium text-gray-700">
                            {reward.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Action buttons */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {checkin.story && (
                      <Button
                        onClick={handleViewStory}
                        variant="outline"
                        className="flex items-center gap-2 h-auto py-3"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">View Story</span>
                      </Button>
                    )}
                    
                    {checkin.quest && (
                      <Button
                        onClick={handleReplayQuest}
                        variant="outline"
                        className="flex items-center gap-2 h-auto py-3"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-sm">Replay Quest</span>
                      </Button>
                    )}
                  </div>
                  
                  <Button
                    onClick={handleAddToMemoryWall}
                    className="w-full flex items-center gap-2 h-auto py-3 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Add to Memory Wall</span>
                  </Button>
                </motion.div>
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDetailsModal;