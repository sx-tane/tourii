import type { VideoIframeProps } from "@/types/story-type";
import { useEffect, useRef } from "react";
import { YouTubeAPILoader } from "@/components/common/youtube-api-loader";

interface VideoIframePropsWithCompletion extends VideoIframeProps {
	onVideoComplete?: () => void;
	enableVideoTracking?: boolean;
}

const VideoIframe: React.FC<VideoIframePropsWithCompletion> = ({ 
	iframeSrc, 
	title, 
	onVideoComplete,
	enableVideoTracking = false
}) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		if (!enableVideoTracking || !onVideoComplete) return;

		const initializePlayer = () => {
			if (!iframeRef.current || !iframeSrc || !enableVideoTracking) return;

			try {
				// Extract video ID from iframe src
				const videoIdMatch = iframeSrc.match(/embed\/([^?&]+)/);
				const videoId = videoIdMatch?.[1];

				if (!videoId) return;

				// Create YouTube player
				const player = new window.YT.Player(iframeRef.current, {
					videoId,
					events: {
						onStateChange: (event: any) => {
							// Video ended
							if (event.data === window.YT.PlayerState.ENDED) {
								onVideoComplete?.();
							}
						},
					},
				});
			} catch (error) {
				console.error("Error initializing YouTube player:", error);
			}
		};

		// Use event-based approach to initialize player when API is ready
		const handleAPIReady = () => {
			if (window.YT) {
				initializePlayer();
			}
		};

		if (typeof window !== 'undefined') {
			if (window.YT) {
				// API already loaded
				initializePlayer();
			} else {
				// Listen for API ready event
				document.addEventListener('youtubeAPIReady', handleAPIReady);
			}
		}

		return () => {
			document.removeEventListener('youtubeAPIReady', handleAPIReady);
		};
	}, [iframeSrc, onVideoComplete, enableVideoTracking]);

	return (
		<YouTubeAPILoader>
			<iframe
				ref={iframeRef}
				id="youtube-player"
				src={iframeSrc}
				title={title}
				allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
				className="w-full h-full md:rounded-bl-xl md:rounded-tl-xl rounded-xl"
			/>
		</YouTubeAPILoader>
	);
};

// Extend Window interface for YouTube API
declare global {
	interface Window {
		YT: any;
		onYouTubeIframeAPIReady: () => void;
	}
}

export default VideoIframe;
