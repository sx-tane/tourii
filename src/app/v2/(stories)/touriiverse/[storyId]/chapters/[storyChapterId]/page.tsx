"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import type { BackendStoryChapter } from "@/app/v2/(stories)/types";
import { TabsDemo } from "@/components/story/chapter-page/chapter-tabs";
import StoryVideoNavigationButtons from "@/components/story/common/story-video-navigation-button";
import VideoIframe from "@/components/story/common/video-iframe";
import { useSagaById } from "@/hooks/stories/useSagaById";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { selectStories } from "@/lib/redux/features/stories/stories-slice";
import { useAppSelector } from "@/lib/redux/hooks";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ChapterPage: React.FC = () => {
	const params = useParams();
	const router = useRouter();
	const storyId = Array.isArray(params.storyId)
		? params.storyId[0]
		: params.storyId;
	const chapterId = Array.isArray(params.storyChapterId)
		? params.storyChapterId[0]
		: params.storyChapterId;

	// Get data from Redux store (if navigated from button)
	const { selectedStory } = useAppSelector(selectStories);

	// Get data directly (if accessed via URL)
	const {
		storyChapter: directChapters,
		isLoadingSaga,
		isErrorSaga,
	} = useSagaById(storyId);

	const [chapter, setChapter] = useState<BackendStoryChapter | null>(null);
	const [chapterList, setChapterList] = useState<BackendStoryChapter[]>([]);
	const [isMuted, setIsMuted] = useState(false);
	const [iframeSrc, setIframeSrc] = useState<string | undefined>(undefined);

	// Try to get chapter data from both sources
	useEffect(() => {
		if (selectedStory?.chapterList) {
			// If we have data in Redux, use it
			setChapterList(selectedStory.chapterList);
			const foundChapter = selectedStory.chapterList.find(
				(c) => c.storyChapterId === chapterId,
			);
			if (foundChapter) {
				setChapter(foundChapter);
			}
		} else if (directChapters) {
			// If we don't have Redux data, use direct API data
			setChapterList(directChapters);
			const foundChapter = directChapters.find(
				(c) => c.storyChapterId === chapterId,
			);
			if (foundChapter) {
				setChapter(foundChapter);
			}
		}
	}, [selectedStory, directChapters, chapterId]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setIframeSrc(chapter?.chapterVideoMobileUrl);
			} else {
				setIframeSrc(chapter?.chapterVideoUrl);
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
		if (!chapterList.length || !chapter) return;

		const currentIndex = chapterList.findIndex(
			(ch) => ch.storyChapterId === chapterId,
		);
		const nextChapter = chapterList[currentIndex + 1];
		if (nextChapter?.isUnlocked) {
			router.push(
				`/v2/touriiverse/${storyId}/chapters/${nextChapter.storyChapterId}`,
			);
		}
	};

	const handlePreviousChapter = () => {
		if (!chapterList.length || !chapter) return;

		const currentIndex = chapterList.findIndex(
			(ch) => ch.storyChapterId === chapterId,
		);
		const previousChapter = chapterList[currentIndex - 1];
		if (previousChapter) {
			router.push(
				`/v2/touriiverse/${storyId}/chapters/${previousChapter.storyChapterId}`,
			);
		}
	};

	// Loading states
	if (isLoadingSaga || (!chapter && !isErrorSaga)) {
		return <Loading />;
	}

	// Error states
	if (isErrorSaga || (!chapter && !chapterList.length)) {
		return <ErrorComponent />;
	}

	// Not found state
	if (!chapter) {
		return <NotFoundComponent />;
	}

	const currentIndex = chapterList.findIndex(
		(ch) => ch.storyChapterId === chapterId,
	);
	const nextChapter = chapterList[currentIndex + 1];
	const previousChapter = chapterList[currentIndex - 1];

	return (
		<div>
			<TabsDemo />
			<motion.div
				className="absolute right-0 h-[90vh] w-full md:h-[85vh] md:w-[85vw] animate-fadeIn md:rounded-tl-full md:rounded-bl-full text-charcoal"
				initial="hidden"
				animate="visible"
				variants={downToUpVariants}
				transition={{ duration: 0.5 }}
			>
				<VideoIframe
					iframeSrc={iframeSrc}
					title={`${chapter.sagaName} ${chapter.chapterNumber}`}
				/>
				<StoryVideoNavigationButtons
					returnLink={`/v2/touriiverse/${storyId}`}
					isMuted={isMuted}
					toggleSound={toggleSound}
					handlePreviousChapter={handlePreviousChapter}
					handleNextChapter={handleNextChapter}
					previousChapterUnlocked={previousChapter?.isUnlocked ?? false}
					nextChapterUnlocked={nextChapter?.isUnlocked ?? false}
				/>
			</motion.div>
		</div>
	);
};

export default ChapterPage;
