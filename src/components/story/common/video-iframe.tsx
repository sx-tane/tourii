import { YouTubeAPILoader } from "@/components/common/youtube-api-loader";
import type { VideoIframeProps } from "@/types/story-type";
import { useEffect, useId, useRef } from "react";

interface VideoIframePropsWithCompletion extends VideoIframeProps {
	onVideoComplete?: () => void;
	enableVideoTracking?: boolean;
}

// YouTube API type definitions
interface YTPlayerStateChangeEvent {
	data: number;
}

const VideoIframe: React.FC<VideoIframePropsWithCompletion> = ({
	iframeSrc,
	title,
	onVideoComplete,
	enableVideoTracking = false,
}) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const iframeId = useId();

	useEffect(() => {
		if (!enableVideoTracking || !onVideoComplete) return;

		const initializePlayer = () => {
			if (!iframeRef.current || !iframeSrc || !enableVideoTracking) return;

			try {
				// Check if YouTube API is fully loaded with Player constructor
				if (
					!window.YT ||
					!window.YT.Player ||
					typeof window.YT.Player !== "function"
				) {
					console.warn("YouTube API not fully loaded yet");
					return;
				}

				// Extract video ID from iframe src
				const videoIdMatch = iframeSrc.match(/embed\/([^?&]+)/);
				const videoId = videoIdMatch?.[1];

				if (!videoId) {
					console.warn(
						"Could not extract video ID from iframe src:",
						iframeSrc,
					);
					return;
				}

				// Create YouTube player
				const player = new window.YT.Player(iframeRef.current, {
					videoId,
					events: {
						onStateChange: (event: YTPlayerStateChangeEvent) => {
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
			// Add a small delay to ensure YT.Player is fully constructed
			setTimeout(() => {
				if (
					window.YT &&
					window.YT.Player &&
					typeof window.YT.Player === "function"
				) {
					initializePlayer();
				}
			}, 100);
		};

		if (typeof window !== "undefined") {
			if (
				window.YT &&
				window.YT.Player &&
				typeof window.YT.Player === "function"
			) {
				// API already loaded and Player constructor is available
				initializePlayer();
			} else {
				// Listen for API ready event
				document.addEventListener("youtubeAPIReady", handleAPIReady);
			}
		}

		return () => {
			document.removeEventListener("youtubeAPIReady", handleAPIReady);
		};
	}, [iframeSrc, onVideoComplete, enableVideoTracking]);

	return (
		<YouTubeAPILoader>
			<iframe
				ref={iframeRef}
				id={`youtube-player-${iframeId}`}
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

export default VideoIframe;
