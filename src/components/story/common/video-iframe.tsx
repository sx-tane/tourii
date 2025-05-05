import type { VideoIframeProps } from "@/types/story-type";
import type React from "react";

const VideoIframe: React.FC<VideoIframeProps> = ({ iframeSrc, title }) => {
	return (
		<iframe
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

export default VideoIframe;
