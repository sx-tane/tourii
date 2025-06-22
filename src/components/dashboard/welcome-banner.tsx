"use client";

import { motion } from "framer-motion";
import type { UserResponseDto } from "@/api/generated";

interface WelcomeBannerProps {
  username?: string;
  userLevel?: UserResponseDto.level;
  userStatus?: UserResponseDto.userDigitalPassportType;
}

export function WelcomeBanner({ 
  username, 
  userLevel,
  userStatus 
}: WelcomeBannerProps) {
  const displayName = username || "Explorer";
  
  // Format the level display
  const formatLevel = (level?: UserResponseDto.level) => {
    if (!level) return "BONJIN";
    
    // Extract class and type from level enum (e.g., "E_CLASS_AMATSUKAMI" -> "E AMATSUKAMI")
    const parts = level.split('_');
    if (parts.length === 3) {
      return `${parts[0]} ${parts[2]}`;
    }
    return level.replace(/_/g, ' ');
  };

  const displayLevel = formatLevel(userLevel);
  const displayStatus = userStatus?.replace(/_/g, ' ') || 'AMATSUKAMI';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-6 text-white overflow-hidden relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10 rounded-lg" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left side - Welcome message */}
          <div className="flex-1">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl lg:text-3xl font-bold mb-2 leading-tight"
            >
              IT'S A GOOD DAY TO GO
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl lg:text-3xl font-bold mb-1 leading-tight"
            >
              ADVENTURE, {displayName.toUpperCase()}!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-indigo-100 text-sm lg:text-base"
            >
              Continue your journey through Japan's mystical tales
            </motion.p>
          </div>

          {/* Right side - Level and status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 border border-white/20">
              <div className="text-center">
                <div className="text-xs lg:text-sm text-indigo-100 mb-1 font-medium">
                  CURRENT LEVEL
                </div>
                <div className="text-lg lg:text-xl font-bold mb-1">
                  LEVEL {displayLevel}
                </div>
                <div className="text-xs lg:text-sm text-indigo-100 opacity-90">
                  {displayStatus}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}