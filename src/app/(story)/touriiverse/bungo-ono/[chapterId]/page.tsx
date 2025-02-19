"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import StoryVideoNavigationButtons from "@/components/touriiverse-story/common/story-video-navigation-button";
import VideoIframe from "@/components/touriiverse-story/common/video-iframe";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import {
	bungoOnoChapterData,
	prologueChapterData,
} from "@/lib/data/touriiverse/chapter-data";
import type { Chapter } from "@/types/story-type";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BungoOnoYoutubeVideo: React.FC = () => {
	const { chapterId } = useParams();
	const router = useRouter();
	const [chapter, setChapter] = useState<Chapter | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isMuted, setIsMuted] = useState(false);
	const [iframeSrc, setIframeSrc] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const foundChapter = bungoOnoChapterData.find(
					(p) => p.chapterId === chapterId,
				);
				setChapter(foundChapter ?? null);
			} catch (e) {
				setError("Failed to fetch chapter data");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData().catch((e) => setError(e.message));
	}, [chapterId]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setIframeSrc(chapter?.videoMobileLink);
			} else {
				setIframeSrc(chapter?.videoLink);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [chapter]);

	const toggleSound = () => {
		const iframe = document.getElementById(
			"youtube-player",
		) as HTMLIFrameElement;
		if (iframe?.contentWindow) {
			if (isMuted) {
				iframe.contentWindow.postMessage(
					'{"event":"command","func":"unMute","args":""}',
					"*",
				);
			} else {
				iframe.contentWindow.postMessage(
					'{"event":"command","func":"mute","args":""}',
					"*",
				);
			}
			setIsMuted(!isMuted);
		}
	};

	const handleNextChapter = () => {
		const currentIndex = bungoOnoChapterData.findIndex(
			(ch) => ch.chapterId === chapterId,
		);
		const nextChapter = bungoOnoChapterData[currentIndex + 1];
		if (nextChapter?.storyUnlocked) {
			router.push(`/touriiverse/bungo-ono/${nextChapter.chapterId}`);
		}
	};

	const handlePreviousChapter = () => {
		const currentIndex = bungoOnoChapterData.findIndex(
			(ch) => ch.chapterId === chapterId,
		);
		if (currentIndex === 1) {
			router.push("/touriiverse/prologue");
		} else {
			const previousChapter = bungoOnoChapterData[currentIndex - 1];
			if (previousChapter) {
				router.push(`/touriiverse/bungo-ono/${previousChapter.chapterId}`);
			}
		}
	};

	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<ErrorComponent />
			</div>
		);
	}

	if (!chapter) {
		return (
			<div>
				<NotFoundComponent />
			</div>
		);
	}

	const currentIndex = bungoOnoChapterData.findIndex(
		(ch) => ch.chapterId === chapterId,
	);
	const nextChapter = bungoOnoChapterData[currentIndex + 1];
	const previousChapter =
		currentIndex === 0
			? prologueChapterData
			: bungoOnoChapterData[currentIndex - 1];

	return (
		<div>
			<motion.div
				className="absolute right-0 h-[90vh] w-full md:h-[85vh] md:w-[85vw] animate-fadeIn md:rounded-tl-full md:rounded-bl-full text-charcoal"
				initial="hidden"
				animate="visible"
				variants={downToUpVariants}
				transition={{ duration: 0.5 }}
			>
				<VideoIframe
					iframeSrc={iframeSrc}
					title={`${chapter?.area} ${chapter?.chapterNumber}`}
				/>
				<StoryVideoNavigationButtons
					returnLink="/touriiverse/bungo-ono"
					isMuted={isMuted}
					toggleSound={toggleSound}
					handlePreviousChapter={handlePreviousChapter}
					handleNextChapter={handleNextChapter}
					previousChapterUnlocked={previousChapter?.storyUnlocked ?? false}
					nextChapterUnlocked={nextChapter?.storyUnlocked ?? false}
				/>
			</motion.div>
		</div>
	);
};

export default BungoOnoYoutubeVideo;
