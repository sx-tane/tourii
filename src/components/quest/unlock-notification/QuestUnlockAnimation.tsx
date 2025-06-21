"use client";

import React from "react";
import { motion } from "framer-motion";
import type { QuestUnlockAnimationProps } from "@/types/quest-unlock-type";

/**
 * QuestUnlockAnimation Component
 * 
 * Renders an animated Torii gate with sunset background and sparkle effects
 * Based on the reference design showing a beautiful shrine scene
 */
const QuestUnlockAnimation: React.FC<QuestUnlockAnimationProps> = ({
  className = "",
  isVisible = true,
}) => {
  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: [0, 1, 0], 
      scale: [0, 1, 0],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        repeatType: "loop" as const,
        ease: "easeInOut" 
      }
    }
  };

  const toriiVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`relative w-full max-w-sm mx-auto ${className}`}>
      {/* Background gradient container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-b from-blue-900 via-orange-400 to-orange-600">
        {/* Mountains silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3">
          <svg viewBox="0 0 300 100" className="absolute bottom-0 w-full h-full fill-black/20">
            <path d="M0,100 L0,60 L50,30 L100,50 L150,20 L200,40 L250,25 L300,45 L300,100 Z" />
          </svg>
        </div>

        {/* Torii Gate */}
        <motion.div
          variants={toriiVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg 
            viewBox="0 0 120 80" 
            className="w-24 h-20 fill-red-800"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
          >
            {/* Top horizontal beam (kasagi) */}
            <rect x="10" y="15" width="100" height="6" rx="3" />
            {/* Second horizontal beam */}
            <rect x="15" y="28" width="90" height="4" rx="2" />
            {/* Left vertical pillar */}
            <rect x="25" y="20" width="8" height="50" rx="4" />
            {/* Right vertical pillar */}
            <rect x="87" y="20" width="8" height="50" rx="4" />
            {/* Central connecting beam */}
            <rect x="33" y="45" width="54" height="3" rx="1.5" />
          </svg>
        </motion.div>

        {/* Sparkle effects */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={sparkleVariants}
            initial="hidden"
            animate="visible"
            className="absolute w-2 h-2 bg-yellow-200 rounded-full"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${15 + (i % 2) * 10}%`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            {/* Sparkle star shape */}
            <div className="absolute inset-0 bg-yellow-200 rounded-full animate-pulse" />
            <div className="absolute inset-0 bg-yellow-200 rounded-full transform rotate-45 animate-pulse" />
          </motion.div>
        ))}

        {/* Sun/moon glow in background */}
        <div className="absolute top-8 right-8 w-12 h-12 bg-yellow-300/60 rounded-full blur-sm" />
        
        {/* Additional atmospheric effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5" />
      </div>
    </div>
  );
};

export default QuestUnlockAnimation;