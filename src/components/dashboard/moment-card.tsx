import type { MomentListResponseDto } from "@/api/generated";
import Image from "next/image";
import { useMemo } from "react";

interface MomentCardProps {
  moment: NonNullable<MomentListResponseDto['moments']>[0];
}

export function MomentCard({ moment }: MomentCardProps) {
  // Memoize time formatting for better performance with many cards
  const formattedTime = useMemo(() => {
    const formatTimeAgo = (timestamp: string) => {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return "Just now";
      if (diffInHours < 24) return `${diffInHours}h ago`;
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `${diffInDays}d ago`;
      return date.toLocaleDateString();
    };
    return formatTimeAgo(moment.insDateTime);
  }, [moment.insDateTime]);

  // Memoize alt text for accessibility
  const imageAltText = useMemo(() => {
    if (moment.description) {
      return `Moment: ${moment.description.slice(0, 100)}${moment.description.length > 100 ? '...' : ''}`;
    }
    return "Travel moment";
  }, [moment.description]);

  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Image */}
      <div className="aspect-video bg-gray-100 relative">
        {moment.imageUrl ? (
          <Image
            src={moment.imageUrl}
            alt={imageAltText}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-gray-400 text-sm">No image</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Username */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-indigo-600">
              {moment.username?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {moment.username || "Anonymous"}
          </span>
          <span className="text-xs text-gray-500 ml-auto">
            {formattedTime}
          </span>
        </div>

        {/* Description */}
        {moment.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {moment.description}
          </p>
        )}

        {/* Reward */}
        {moment.rewardText && (
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
            <span>🎉</span>
            {moment.rewardText}
          </div>
        )}
      </div>
    </div>
  );
}