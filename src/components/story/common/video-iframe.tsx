import type { VideoIframeProps } from "@/types/story-type";
import { useEffect, useRef } from "react";

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

		// Load YouTube iframe API if not already loaded
		if (typeof window !== 'undefined' && !window.YT) {
			const script = document.createElement('script');
			script.src = 'https://www.youtube.com/iframe_api';
			script.async = true;
			document.head.appendChild(script);

			window.onYouTubeIframeAPIReady = () => {
				initializePlayer();
			};
		} else if (window.YT) {
			initializePlayer();
		}

		const initializePlayer = () => {
			if (!iframeRef.current || !iframeSrc) return;

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

		return () => {
			// Cleanup is handled by YouTube API
		};
	}, [iframeSrc, onVideoComplete, enableVideoTracking]);

	return (
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
