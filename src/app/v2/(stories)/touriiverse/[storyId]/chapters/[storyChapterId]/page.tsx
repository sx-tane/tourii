"use client";

import type { StoryChapterResponseDto } from "@/api/generated";
import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import { ChapterTabs } from "@/components/story/chapter-page/chapter-tabs";
import Title from "@/components/world/text/title";
import { getSagaById } from "@/hooks/stories/getSagaById";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { selectStories } from "@/lib/redux/features/stories/stories-slice";
import { useAppSelector } from "@/lib/redux/hooks";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ChapterPage: React.FC = () => {
	const params = useParams();
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
	} = getSagaById(storyId);

	const [chapter, setChapter] = useState<StoryChapterResponseDto | null>(null);
	const [chapterList, setChapterList] = useState<StoryChapterResponseDto[]>([]);
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

	// Loading states
	if (isLoadingSaga || (!chapter && !isErrorSaga && !selectedStory)) {
		return <Loading />;
	}

	// Error states
	if (isErrorSaga && !selectedStory?.chapterList?.length) {
		// If API fetch failed AND we don't have data from Redux
		return <TouriiError />;
	}

	// Determine the final chapter and list to use
	const currentChapter = chapter;
	const currentChapterList = chapterList;

	// Not found state (if after loading and checking both sources, we still don't have the specific chapter)
	if (!currentChapter) {
		return <NotFoundComponent />;
	}

	return (
		<div className="container mx-auto px-4">
			<motion.div
				initial="hidden"
				animate="visible"
				variants={downToUpVariants}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="mb-6 text-center"
			>
				<Title
					smallTitle={currentChapter.chapterNumber}
					title={currentChapter.chapterTitle}
				/>
			</motion.div>
			<motion.div
				initial="hidden"
				animate="visible"
				variants={downToUpVariants}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<ChapterTabs
					chapters={currentChapterList}
					initialSelectedChapterId={currentChapter.storyChapterId}
				/>
			</motion.div>
			<motion.div
				initial="hidden"
				animate="visible"
				variants={downToUpVariants}
				transition={{ duration: 0.5, delay: 0.3 }}
				className="my-5"
			>
				<Link
					href={`/v2/touriiverse/${storyId}`}
					className="flex items-center hover:cursor-pointer text-xs hover:underline text-warmGrey3 uppercase tracking-widest font-medium "
				>
					<ChevronLeft className="mr-2 inline-block h-5 w-5" />
					Back to Story
				</Link>
			</motion.div>
		</div>
	);
};

export default ChapterPage;
