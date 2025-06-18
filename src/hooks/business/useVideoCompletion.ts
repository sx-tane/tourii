import { useState, useCallback, useEffect, useRef } from "react";
import type { 
  UseVideoCompletionState, 
  YouTubePlayerEvent,
  YouTubePlayerState 
} from "@/types/quest-unlock-type";

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
    
    // Consider video completed if it reaches 95% (to account for slight timing issues)
    if (progress >= 95 && !isVideoCompleted) {
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
              const currentTime = playerRef.current.getCurrentTime();
              const duration = playerRef.current.getDuration();
              if (duration > 0) {
                const progress = (currentTime / duration) * 100;
                handleVideoProgress(progress);
              }
            }
          }, 1000);
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
   * Load YouTube iframe API if not already loaded
   */
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);

      // Global callback for when API is ready
      window.onYouTubeIframeAPIReady = () => {
        console.log("YouTube iframe API loaded");
      };
    }

    return () => {
      cleanupPlayer();
    };
  }, [cleanupPlayer]);

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