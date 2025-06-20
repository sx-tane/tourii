"use client";

import type { StoryChapterResponseDto } from "@/api/generated";
import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import { ChapterTabs } from "@/components/story/chapter-page/chapter-tabs";
import { QuestUnlockModal } from "@/components/quest/unlock-notification";
import Title from "@/components/world/text/title";
import { useSagaById, useStoryCompletion } from "@/hooks";
import { useQuestUnlock, useVideoCompletion } from "@/hooks/business";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { selectStories } from "@/lib/redux/features/stories/stories-slice";
import { useAppSelector } from "@/lib/redux/hooks";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ChapterPage: React.FC = () => {
	const params = useParams();
	const storyId = Array.isArray(params.storyId)
		? params.storyId[0]
		: params.storyId;
	const chapterId = Array.isArray(params.storyChapterId)
		? params.storyChapterId[0]
		: params.storyChapterId;

	// Get data from Redux store (if navigated from button)
	const { selectedStoryId } = useAppSelector(selectStories);

	// Get data directly (if accessed via URL)
	const {
		storyChapterList: directChapters,
		isLoading,
		isError,
	} = useSagaById(storyId);

	// Story completion and quest unlock functionality
	const { completeStoryChapter } = useStoryCompletion();
	const questUnlock = useQuestUnlock();
	const videoCompletion = useVideoCompletion(async () => {
		// Auto-complete story when video ends
		if (chapterId) {
			await handleStoryCompletion(chapterId);
		}
	});

	const [chapter, setChapter] = useState<StoryChapterResponseDto | null>(null);
	const [chapterList, setChapterList] = useState<StoryChapterResponseDto[]>([]);
	const [iframeSrc, setIframeSrc] = useState<string | undefined>(undefined);

	/**
	 * Handle story chapter completion and quest unlock
	 */
	const handleStoryCompletion = async (chapterIdToComplete: string) => {
		try {
			const completionData = await completeStoryChapter(chapterIdToComplete);
			
			// If there are unlocked quests, show the modal
			if (completionData.unlockedQuests && completionData.unlockedQuests.length > 0) {
				questUnlock.showUnlockModal(completionData);
				toast.success("Story chapter completed! New quests unlocked!");
			} else {
				toast.success("Story chapter completed!");
			}
		} catch (error) {
			console.error("Failed to complete story chapter:", error);
			toast.error("Failed to complete story chapter. Please try again.");
		}
	};

	// Try to get chapter data from both sources
	useEffect(() => {
		if (selectedStoryId) {
			// If we have data in Redux, use it
			setChapterList(directChapters ?? []);
			const foundChapter = directChapters?.find(
				(c) => c.storyChapterId === chapterId,
			);
			setChapter(foundChapter ?? null);
		} else if (directChapters) {
			setChapterList(directChapters);
			const foundChapter = directChapters.find(
				(c) => c.storyChapterId === chapterId,
			);
			setChapter(foundChapter ?? null);
		}
	}, [selectedStoryId, directChapters, chapterId]);

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
	if (isLoading || (!chapter && !isError && !selectedStoryId)) {
		return <Loading />;
	}

	// Error states
	if (isError && !selectedStoryId) {
		// If API fetch failed AND we don't have data from Redux
		return (
			<TouriiError
				errorMessage="Failed to load story data."
				textColor="text-warmGrey"
				titleTextColor="text-warmGrey"
			/>
		);
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
					onVideoComplete={videoCompletion.handleVideoEnd}
				/>
			</motion.div>
			<motion.div
				initial="hidden"
				animate="visible"
				variants={downToUpVariants}
				transition={{ duration: 0.5, delay: 0.3 }}
				className="mt-5 mb-20"
			>
				<Link
					href={`/v2/touriiverse/${storyId}`}
					className="flex items-center hover:cursor-pointer text-xs hover:underline text-warmGrey3 uppercase tracking-widest font-medium "
				>
					<ChevronLeft className="mr-2 inline-block h-5 w-5" />
					Back to Story
				</Link>
			</motion.div>
			{/* Quest Unlock Modal */}
			{questUnlock.questUnlockData && (
				<QuestUnlockModal
					isOpen={questUnlock.isModalOpen}
					onClose={questUnlock.hideUnlockModal}
					storyCompletion={questUnlock.questUnlockData}
					onStartQuest={questUnlock.handleStartQuest}
					onViewAllQuests={questUnlock.handleViewAllQuests}
				/>
			)}
		</div>
	);
};

export default ChapterPage;
