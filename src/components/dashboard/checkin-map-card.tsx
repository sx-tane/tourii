"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, TrendingUp } from "lucide-react";
import { useCheckins } from "@/hooks/api/useCheckins";
import CheckinMapModal from "@/components/checkin/checkin-map-modal";

export interface CheckinMapCardProps {
  userId?: string;
  className?: string;
  onNavigateToStory?: (storyId: string) => void;
  onNavigateToQuest?: (questId: string) => void;
}

const CheckinMapCard: React.FC<CheckinMapCardProps> = ({
  userId,
  className = "",
  onNavigateToStory,
  onNavigateToQuest,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Fetch checkins data for summary
  const { data: checkinsData, isLoading } = useCheckins({
    userId,
    limit: 100,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Calculate stats
  const totalCheckins = checkinsData?.total || 0;
  const storyCheckins = checkinsData?.checkins?.filter(c => c.type === 'story').length || 0;
  const questCheckins = checkinsData?.checkins?.filter(c => c.type === 'quest').length || 0;
  const routeCheckins = checkinsData?.checkins?.filter(c => c.type === 'route').length || 0;

  // Get recent checkin
  const recentCheckin = checkinsData?.checkins?.[0];

  return (
    <>
      <motion.div
        className={`bg-white shadow-sm rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow ${className}`}
        onClick={handleOpenModal}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              className="p-2 bg-indigo-50 rounded-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <MapPin className="w-5 h-5 text-indigo-600" />
            </motion.div>
            <h3 className="font-semibold text-gray-900">Check-In Map</h3>
          </div>
          <motion.div
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </motion.div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
        ) : (
          <>
            {/* Main stat */}
            <div className="mb-4">
              <motion.div
                className="text-3xl font-bold text-indigo-600 mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              >
                {totalCheckins}
              </motion.div>
              <p className="text-sm text-gray-500">
                location{totalCheckins !== 1 ? 's' : ''} visited
              </p>
            </div>

            {/* Breakdown */}
            {totalCheckins > 0 && (
              <motion.div
                className="space-y-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span>Stories</span>
                  </div>
                  <span>{storyCheckins}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span>Quests</span>
                  </div>
                  <span>{questCheckins}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Routes</span>
                  </div>
                  <span>{routeCheckins}</span>
                </div>
              </motion.div>
            )}

            {/* Recent activity */}
            {recentCheckin && (
              <motion.div
                className="pt-3 border-t border-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <p className="text-xs text-gray-500 mb-1">Recent visit:</p>
                <p className="text-sm font-medium text-gray-700 truncate">
                  {recentCheckin.touristSpot.name}
                </p>
              </motion.div>
            )}

            {/* Empty state */}
            {totalCheckins === 0 && (
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="text-2xl mb-2">🗺️</div>
                <p className="text-sm text-gray-500">
                  Start exploring to see your check-ins!
                </p>
              </motion.div>
            )}
          </>
        )}

        {/* Click indicator */}
        <motion.div
          className="mt-4 text-xs text-indigo-600 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          Click to view map →
        </motion.div>
      </motion.div>

      {/* Modal */}
      <CheckinMapModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userId={userId}
        onNavigateToStory={onNavigateToStory}
        onNavigateToQuest={onNavigateToQuest}
      />
    </>
  );
};

export default CheckinMapCard;