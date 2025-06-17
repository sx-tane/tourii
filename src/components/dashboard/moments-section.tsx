"use client";

import Link from "next/link";
import { useMoments } from "@/hooks/api";
import { MomentCard } from "./moment-card";
import { Button } from "@/components/ui/button";

// Mock data for development/fallback
const mockMoments = [
  {
    imageUrl: "/image/model-route/1/miyazaki/1.jpg",
    username: "TravelExplorer",
    description: "Just visited this amazing shrine in Miyazaki! The architecture is breathtaking.",
    rewardText: "Earned 50 Tourii Points",
    insDateTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    imageUrl: "/image/model-route/2/fukoji-temple/1.jpg",
    username: "AdventureSeeker",
    description: "Completed the temple visit quest. Such a peaceful experience!",
    rewardText: "Earned Temple Visitor Badge",
    insDateTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
  },
  {
    imageUrl: "/image/model-route/3/inazumi-cave/1.jpg",
    username: "CaveExplorer",
    description: "The Inazumi Cave was incredible! Perfect for the underground quest.",
    rewardText: "Earned 75 Tourii Points",
    insDateTime: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
  },
  {
    imageUrl: "/image/model-route/1/kashima-shrine/1.jpg",
    username: "ShrineHunter",
    description: "Another beautiful shrine added to my collection!",
    rewardText: "Earned Shrine Collector Badge",
    insDateTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    imageUrl: "/image/model-route/4/omi-shrine/1.jpeg",
    username: "QuestMaster",
    description: "Completed the Omi Shrine photo challenge. What a view!",
    rewardText: "Earned 100 Tourii Points",
    insDateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
];

export function MomentsSection() {
  // Use API hook with fallback to mock data
  const { data: momentsData, isLoading, isError, error } = useMoments("/api/moments?page=1&limit=5");

  // Log API errors for debugging while using fallback data
  if (isError && error) {
    console.warn('Moments API failed, using fallback data:', error);
  }

  // Use mock data if API fails or is unavailable
  const moments = momentsData?.moments || mockMoments;

  if (isLoading) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Latest Moments</h2>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Latest Moments</h2>
        <Link href="/v2/moments">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {/* Moments Cards */}
      {moments.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
          {moments.map((moment, index) => (
            <MomentCard key={`${moment.username}-${index}`} moment={moment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-sm mb-2">📸</div>
          <p className="text-gray-500 text-sm">No moments to display yet.</p>
          <p className="text-gray-400 text-xs mt-1">
            Complete quests and share your journey to see moments here!
          </p>
        </div>
      )}

      {/* Error state indicator (subtle) */}
      {isError && (
        <div className="text-xs text-gray-400 text-center mt-2">
          Using sample data - connect to see live moments
        </div>
      )}
    </div>
  );
}