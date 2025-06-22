"use client";

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { QuestPreviewCardProps } from "@/types/quest-unlock-type";

/**
 * QuestPreviewCard Component
 * 
 * Displays a compact preview of an unlocked quest with key information
 * including image, title, type, rewards, and premium status
 */
const QuestPreviewCard: React.FC<QuestPreviewCardProps> = ({
  quest,
  onStartQuest,
  className = "",
}) => {
  const handleStartQuest = () => {
    onStartQuest?.(quest.questId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
    >
      {/* Quest Image */}
      <div className="relative h-32 w-full bg-gradient-to-br from-warmGrey to-warmGrey2">
        {quest.questImage ? (
          <Image
            src={quest.questImage}
            alt={quest.questName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          // Fallback gradient background with quest icon
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              className="text-warmGrey3"
            >
              <path
                d="M12 2L13.09 8.26L18 7L16.74 12.74L21 12L17.74 18.26L19 19L12 17L5 19L6.26 18.26L3 12L7.26 12.74L6 7L10.91 8.26L12 2Z"
                fill="currentColor"
                opacity="0.6"
              />
            </svg>
          </div>
        )}
        
        {/* Premium badge */}
        {quest.isPremium && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
            Premium
          </div>
        )}
      </div>

      {/* Quest Information */}
      <div className="p-4">
        {/* Quest Title */}
        <h3 className="font-bold text-charcoal text-lg mb-1 line-clamp-2">
          {quest.questName}
        </h3>
        
        {/* Tourist Spot */}
        <div className="flex items-center text-warmGrey3 text-sm mb-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="mr-1"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="currentColor"
            />
          </svg>
          {quest.touristSpotName}
        </div>

        {/* Quest Description */}
        <p className="text-warmGrey3 text-sm mb-3 line-clamp-2">
          {quest.questDesc}
        </p>

        {/* Rewards */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-mustard">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="mr-1"
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="currentColor"
              />
            </svg>
            <span className="font-semibold text-sm">
              {quest.totalMagatamaPointAwarded.toLocaleString()} pts
            </span>
          </div>
          
          {/* Quest Type Badge */}
          <span className="bg-charcoal/10 text-charcoal text-xs font-medium px-2 py-1 rounded-full">
            Travel to Earn
          </span>
        </div>

        {/* Start Quest Button */}
        <button
          onClick={handleStartQuest}
          className="w-full bg-charcoal text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-charcoal/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-charcoal/50 focus:ring-offset-2"
        >
          Start Quest
        </button>
      </div>
    </motion.div>
  );
};

export default QuestPreviewCard;