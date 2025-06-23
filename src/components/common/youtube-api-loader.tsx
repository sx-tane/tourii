"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

interface YouTubeAPILoaderProps {
	onLoad?: () => void;
	children?: React.ReactNode;
}

/**
 * Secure YouTube API loader using Next.js Script component
 * Replaces dynamic script injection with proper CSP-compliant loading
 */
export const YouTubeAPILoader: React.FC<YouTubeAPILoaderProps> = ({
	onLoad,
	children,
}) => {
	const [isAPIReady, setIsAPIReady] = useState(false);

	useEffect(() => {
		// Check if API is already loaded
		if (typeof window !== "undefined" && window.YT) {
			setIsAPIReady(true);
			onLoad?.();
		}
	}, [onLoad]);

	const handleScriptLoad = () => {
		// Set up global callback for YouTube API ready
		if (typeof window !== "undefined") {
			if (!window.onYouTubeIframeAPIReady) {
				window.onYouTubeIframeAPIReady = () => {
					setIsAPIReady(true);
					onLoad?.();
					// Dispatch custom event for event-based approach
					document.dispatchEvent(new CustomEvent("youtubeAPIReady"));
				};
			}
		}
	};

	return (
		<>
			<Script
				src="https://www.youtube.com/iframe_api"
				strategy="lazyOnload"
				onLoad={handleScriptLoad}
				onError={(error) => {
					console.error("Failed to load YouTube API:", error);
				}}
			/>
			{children}
		</>
	);
};

// Extend Window interface for YouTube API
declare global {
	interface Window {
		YT: any;
		onYouTubeIframeAPIReady: () => void;
	}
}
