import { useState, useCallback, useEffect, useRef } from "react";
import type { 
  UseVideoCompletionState, 
  YouTubePlayerEvent,
  YouTubePlayerState 
} from "@/types/quest-unlock-type";

// Constants for video completion detection
const VIDEO_COMPLETION_THRESHOLD = 95; // Consider 95% as completed
const PROGRESS_UPDATE_INTERVAL = 1000; // Update progress every second

/**
 * Custom hook for YouTube video completion detection
 * 
 * Integrates with YouTube iframe API to monitor video playback progress
 * and detect when videos are completed, triggering story completion actions
 */
export const useVideoCompletion = (
  onVideoComplete?: () => void
): UseVideoCompletionState & {
  initializePlayer: (iframe: HTMLIFrameElement) => void;
  cleanupPlayer: () => void;
} => {
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Handle video end event
   */
  const handleVideoEnd = useCallback(() => {
    setIsVideoCompleted(true);
    setIsVideoPlaying(false);
    setVideoProgress(100);
    onVideoComplete?.();
  }, [onVideoComplete]);

  /**
   * Handle video progress updates
   */
  const handleVideoProgress = useCallback((progress: number) => {
    setVideoProgress(progress);
    
    // Consider video completed if it reaches threshold (to account for slight timing issues)
    if (progress >= VIDEO_COMPLETION_THRESHOLD && !isVideoCompleted) {
      handleVideoEnd();
    }
  }, [isVideoCompleted, handleVideoEnd]);

  /**
   * Reset video state
   */
  const resetVideoState = useCallback(() => {
    setIsVideoCompleted(false);
    setVideoProgress(0);
    setIsVideoPlaying(false);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  /**
   * YouTube player state change handler
   */
  const onPlayerStateChange = useCallback((event: YouTubePlayerEvent) => {
    const playerState = event.target.getPlayerState();
    
    switch (playerState) {
      case YouTubePlayerState.PLAYING:
        setIsVideoPlaying(true);
        // Start progress tracking
        if (!progressIntervalRef.current) {
          progressIntervalRef.current = setInterval(() => {
            if (playerRef.current) {
              try {
                const currentTime = playerRef.current.getCurrentTime();
                const duration = playerRef.current.getDuration();
                if (duration > 0) {
                  const progress = (currentTime / duration) * 100;
                  handleVideoProgress(progress);
                }
              } catch (error) {
                console.error("Error getting video progress:", error);
                // Clear interval if player becomes unavailable
                if (progressIntervalRef.current) {
                  clearInterval(progressIntervalRef.current);
                  progressIntervalRef.current = null;
                }
              }
            }
          }, PROGRESS_UPDATE_INTERVAL);
        }
        break;
        
      case YouTubePlayerState.PAUSED:
      case YouTubePlayerState.BUFFERING:
        setIsVideoPlaying(false);
        break;
        
      case YouTubePlayerState.ENDED:
        handleVideoEnd();
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        break;
    }
  }, [handleVideoEnd, handleVideoProgress]);

  /**
   * Initialize YouTube player with event listeners
   */
  const initializePlayer = useCallback((iframe: HTMLIFrameElement) => {
    if (!iframe || !window.YT) {
      console.warn("YouTube API not loaded or iframe not available");
      return;
    }

    try {
      // Extract video ID from iframe src
      const src = iframe.src;
      const videoIdMatch = src.match(/embed\/([^?&]+)/);
      const videoId = videoIdMatch?.[1];

      if (!videoId) {
        console.warn("Could not extract video ID from iframe src");
        return;
      }

      // Create YouTube player
      playerRef.current = new window.YT.Player(iframe, {
        videoId,
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    } catch (error) {
      console.error("Error initializing YouTube player:", error);
    }
  }, [onPlayerStateChange]);

  /**
   * Cleanup player and intervals
   */
  const cleanupPlayer = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (playerRef.current && typeof playerRef.current.destroy === 'function') {
      try {
        playerRef.current.destroy();
      } catch (error) {
        console.error("Error destroying YouTube player:", error);
      }
      playerRef.current = null;
    }
  }, []);

  /**
   * Setup YouTube API ready event listener
   */
  useEffect(() => {
    let eventListenerAdded = false;

    const handleYouTubeAPIReady = () => {
      console.log("YouTube iframe API loaded");
    };

    // Use event-based approach instead of global callback pollution
    if (typeof window !== 'undefined') {
      // Listen for custom YouTube API ready event
      document.addEventListener('youtubeAPIReady', handleYouTubeAPIReady);
      eventListenerAdded = true;

      // Setup global callback only if it doesn't exist
      if (!window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = () => {
          document.dispatchEvent(new CustomEvent('youtubeAPIReady'));
        };
      }
    }

    return () => {
      cleanupPlayer();
      // Clean up event listener
      if (eventListenerAdded) {
        document.removeEventListener('youtubeAPIReady', handleYouTubeAPIReady);
      }
    };
  }, [cleanupPlayer]);

  /**
   * Ensure proper cleanup on component unmount
   */
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, []);

  return {
    isVideoCompleted,
    videoProgress,
    isVideoPlaying,
    handleVideoEnd,
    handleVideoProgress,
    resetVideoState,
    initializePlayer,
    cleanupPlayer,
  };
};

// Extend Window interface for YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}