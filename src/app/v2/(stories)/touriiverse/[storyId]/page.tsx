"use client";

import type { StoryChapterResponseDto } from "@/api/generated";
import TouriiError from "@/app/error";
import Loading from "@/app/loading";
import ChapterComponent from "@/components/story/chapter-page/chapter-component";
import ChapterSelectionComponent from "@/components/story/chapter-page/chapter-selection";
import ChapterSelectionMobileComponent from "@/components/story/chapter-page/chapter-selection-mobile";
import IntroComponent from "@/components/story/chapter-page/intro-component";
import { getSagaById } from "@/hooks/stories/getSagaById";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const SagaChapterPage: NextPage = () => {
	const params = useParams();
	const storyId = Array.isArray(params.storyId)
		? params.storyId[0]
		: params.storyId;

	// Use the original hook signature, expecting combined saga object
	const {
		storyChapterList,
		isLoadingStoryChapterList,
		isErrorStoryChapterList,
		mutateStoryChapterList,
	} = getSagaById(storyId);

	// Log hook output directly
	console.log("[SagaChapterPage] Hook Output:", {
		storyId,
		storyChapterList,
		isLoadingStoryChapterList,
		isErrorStoryChapterList,
	});

	const [currentChapter, setCurrentChapter] =
		useState<StoryChapterResponseDto | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Memoize chapters to prevent infinite loops
	const chapters = useMemo(() => {
		return storyChapterList ?? [];
	}, [storyChapterList]);

	useEffect(() => {
		console.log(
			"[SagaChapterPage] Init Effect Triggered. Chapters count:",
			chapters.length,
		);
		// Effect depends on saga object and its chapterList property
		if (chapters && chapters.length > 0) {
			console.log(
				`[SagaChapterPage] Init Effect: Found ${chapters.length} chapters for storyId: ${storyId}`,
			);

			// Redundant check kept for clarity
			if (chapters.length === 0) {
				console.warn(
					`[SagaChapterPage] Init Effect: Chapter list is empty for storyId: ${storyId}`,
				);
				setCurrentChapter(null);
				setCurrentIndex(0);
				return;
			}

			let initialChapter: StoryChapterResponseDto | undefined = undefined;
			const savedChapterIdKey = `selectedChapterId_${storyId}`;

			if (typeof window !== "undefined") {
				const savedChapterId = localStorage.getItem(savedChapterIdKey);
				if (savedChapterId) {
					initialChapter = chapters.find(
						(c: StoryChapterResponseDto) => c.storyChapterId === savedChapterId,
					);
					if (initialChapter) {
						console.log(
							`[SagaChapterPage] Init Effect: Found saved chapter ID "${savedChapterId}"`,
						);
					} else {
						console.warn(
							`[SagaChapterPage] Init Effect: Saved chapter ID "${savedChapterId}" not found in current chapters. Removing.`,
						);
						localStorage.removeItem(savedChapterIdKey);
					}
				}
			}

			if (!initialChapter) {
				initialChapter = chapters[0];
				console.log(
					`[SagaChapterPage] Init Effect: Defaulting to first chapter: ${initialChapter?.storyChapterId}`,
				);
			}

			if (initialChapter) {
				setCurrentChapter(initialChapter);
				const initialIndex = chapters.findIndex(
					(c: StoryChapterResponseDto) =>
						c.storyChapterId === initialChapter?.storyChapterId,
				);
				setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
				if (typeof window !== "undefined") {
					localStorage.setItem(
						savedChapterIdKey,
						initialChapter.storyChapterId,
					);
				}
				console.log(
					`[SagaChapterPage] Init Effect: Set current chapter to ${initialChapter.storyChapterId}, index ${initialIndex >= 0 ? initialIndex : 0}`,
				);
			} else {
				console.error(
					`[SagaChapterPage] Init Effect: Could not determine initial chapter for storyId: ${storyId} despite chapters existing.`,
				);
				setCurrentChapter(null);
				setCurrentIndex(0);
			}
		} else if (chapters.length === 0 && !isLoadingStoryChapterList) {
			console.warn(
				`[SagaChapterPage] Init Effect: Chapter list is empty for storyId: ${storyId}`,
			);
			setCurrentChapter(null);
			setCurrentIndex(0);
		} else {
			console.log(
				`[SagaChapterPage] Init Effect: Waiting for saga data or saga is null/undefined for storyId: ${storyId}`,
			);
		}
	}, [chapters, storyId, isLoadingStoryChapterList]); // Use memoized chapters

	const handleSelectChapter = useCallback(
		(selectedChapterId: string) => {
			const chapter = chapters.find(
				(c: StoryChapterResponseDto) => c.storyChapterId === selectedChapterId,
			);

			if (chapter) {
				setCurrentChapter(chapter);
				const savedChapterIdKey = `selectedChapterId_${storyId}`;
				if (typeof window !== "undefined") {
					localStorage.setItem(savedChapterIdKey, selectedChapterId);
				}
				const newIndex = chapters.findIndex(
					(c: StoryChapterResponseDto) =>
						c.storyChapterId === selectedChapterId,
				);
				setCurrentIndex(newIndex >= 0 ? newIndex : 0);
			} else {
				console.warn(
					`handleSelectChapter: Chapter not found for ID ${selectedChapterId} in story ${storyId}`,
				);
			}
		},
		[chapters, storyId],
	);

	const handleSwipe = useCallback(
		(direction: "left" | "right") => {
			if (!currentChapter || chapters.length === 0) return;
			const currentIdx = chapters.findIndex(
				(chapter: StoryChapterResponseDto) =>
					chapter.storyChapterId === currentChapter.storyChapterId,
			);
			if (currentIdx === -1) {
				console.error(
					`handleSwipe: Current chapter not found in list for story ${storyId}`,
				);
				return;
			}
			let newIndex: number;
			if (direction === "left") {
				newIndex = (currentIdx + 1) % chapters.length;
			} else {
				newIndex = (currentIdx - 1 + chapters.length) % chapters.length;
			}
			const newChapterId = chapters[newIndex]?.storyChapterId;
			if (newChapterId) {
				handleSelectChapter(newChapterId);
			}
		},
		[currentChapter, chapters, handleSelectChapter, storyId],
	);

	const touchStartX = useRef<number | null>(null);
	const touchEndX = useRef<number | null>(null);
	const touchStartY = useRef<number | null>(null);
	const touchEndY = useRef<number | null>(null);

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.targetTouches?.[0]?.clientX ?? null;
		touchStartY.current = e.targetTouches?.[0]?.clientY ?? null;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		touchEndX.current = e.targetTouches?.[0]?.clientX ?? null;
		touchEndY.current = e.targetTouches?.[0]?.clientY ?? null;
	};

	const handleTouchEnd = () => {
		if (
			touchStartX.current !== null &&
			touchEndX.current !== null &&
			touchStartY.current !== null &&
			touchEndY.current !== null
		) {
			const deltaX = touchStartX.current - touchEndX.current;
			const deltaY = touchStartY.current - touchEndY.current;

			if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
				if (deltaX > 0) {
					handleSwipe("left");
				} else {
					handleSwipe("right");
				}
			}
		}
		touchStartX.current = null;
		touchEndX.current = null;
		touchStartY.current = null;
		touchEndY.current = null;
	};

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				handleSwipe("right");
			} else if (e.key === "ArrowRight") {
				handleSwipe("left");
			}
		},
		[handleSwipe],
	);

	useEffect(() => {
		if (currentChapter && !isLoadingStoryChapterList) {
			window.addEventListener("keydown", handleKeyDown);
			return () => {
				window.removeEventListener("keydown", handleKeyDown);
			};
		}
	}, [currentChapter, isLoadingStoryChapterList, handleKeyDown]);

	const selectedButtonRef = useRef<HTMLDivElement | null>(null);

	if (isLoadingStoryChapterList) {
		return <Loading />;
	}

	if (isErrorStoryChapterList) {
		console.error(
			"[SagaChapterPage] Render: isErrorStoryChapterList is true. Error:",
			isErrorStoryChapterList,
		);
		return (
			<TouriiError
				errorMessage={
					isErrorStoryChapterList.message || "Failed to load story data."
				}
				onRetry={mutateStoryChapterList}
				textColor="text-warmGrey"
				titleTextColor="text-warmGrey"
			/>
		);
	}

	// Check if saga object itself is missing after loading/no error
	if (!storyChapterList) {
		console.error(
			`[SagaChapterPage] Render: Saga object is missing for storyId: ${storyId} after loading.`,
		);
		return <TouriiError errorMessage="Story data not found or is invalid." />;
	}

	// Check if chapterList is missing or empty on the saga object
	if (!Array.isArray(chapters) || chapters.length === 0) {
		console.warn(
			`[SagaChapterPage] Render: Story ${storyId} has an empty or invalid chapter list.`,
		);
		return (
			<TouriiError
				errorMessage="This story has no chapters."
				isEmpty={true}
				textColor="text-warmGrey"
				titleTextColor="text-warmGrey"
			/>
		);
	}

	// Check if currentChapter hasn't been set by the useEffect yet
	if (!currentChapter) {
		console.log(
			"[SagaChapterPage] Render: currentChapter is still null, waiting for initialization effect.",
		);
		return (
			<div className="flex justify-center items-center h-screen">
				<Loading />
			</div>
		);
	}

	// Use memoized chapters for mapping
	const selectionDataForComponents = chapters.map(
		(chap: StoryChapterResponseDto) => ({
			touristSpotId: chap.touristSpotId,
			storyChapterId: chap.storyChapterId,
			isSelected: chap.storyChapterId === currentChapter.storyChapterId,
			chapterNumber: chap.chapterNumber,
			chapterTitle: chap.chapterTitle,
		}),
	);

	const isIntroChapter = currentChapter?.chapterNumber === "Introduction";
	const currentSagaName = currentChapter?.sagaName ?? "Unknown Saga";

	return (
		<div
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			className="md:absolute md:right-0 max-h-full md:h-[90vh] md:w-[95vw] animate-fadeIn overflow-hidden"
		>
			{isIntroChapter ? (
				<AnimatePresence mode="wait">
					<IntroComponent
						key={currentChapter.storyChapterId}
						chapter={currentChapter}
						sagaName={currentSagaName} // Use saga.sagaName
					/>
				</AnimatePresence>
			) : (
				<AnimatePresence mode="wait">
					<ChapterComponent
						key={currentChapter.storyChapterId}
						chapter={currentChapter}
						sagaName={currentSagaName} // Use saga.sagaName
					/>
				</AnimatePresence>
			)}
			<ChapterSelectionMobileComponent
				selectionData={selectionDataForComponents}
				handleSelectChapter={handleSelectChapter}
				currentIndex={currentIndex}
				setCurrentIndex={setCurrentIndex}
			/>
			<ChapterSelectionComponent
				placeName={currentSagaName} // Use saga.sagaName
				selectionData={selectionDataForComponents}
				handleSelectChapter={handleSelectChapter}
				selectedButtonRef={selectedButtonRef}
			/>
		</div>
	);
};

export default SagaChapterPage;
