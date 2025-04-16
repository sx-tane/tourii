"use client";

import ChapterComponent from "@/components/story/chapter-page/chapter-component";
import ChapterSelectionComponent from "@/components/story/chapter-page/chapter-selection";
import ChapterSelectionMobileComponent from "@/components/story/chapter-page/chapter-selection-mobile";
import IntroComponent from "@/components/story/chapter-page/intro-component";
import {
	tochigiChapterData,
	tochigiChapterSelectionData,
} from "@/lib/data/touriiverse/chapter-data";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

const Tochigi: NextPage = () => {
	const [selectedChapter, setSelectedChapter] = useState(() => {
		// Return the default chapter initially
		return tochigiChapterData[0];
	});

	const [selectionData, setSelectionData] = useState(
		tochigiChapterSelectionData,
	);

	const [currentIndex, setCurrentIndex] = useState(0);

	// Ensure localStorage is only accessed on the client
	useEffect(() => {
		const savedChapterId =
			typeof window !== "undefined" &&
			localStorage.getItem("selectedChapterId");
		if (savedChapterId) {
			handleSelectChapter(savedChapterId);
		}
	}, []);

	const handleSelectChapter = (selectedChapterId: string) => {
		let chapter: (typeof tochigiChapterData)[0] | undefined;
		if (selectedChapterId === "Intro") {
			chapter = tochigiChapterData[0];
		} else {
			chapter = tochigiChapterData.find(
				(s) => s.chapterId === selectedChapterId,
			);
		}

		if (chapter) {
			setSelectedChapter(chapter);
			if (typeof window !== "undefined") {
				localStorage.setItem("selectedChapterId", selectedChapterId);
				localStorage.setItem("selectedChapter", JSON.stringify(chapter));
			}
			const updatedSelectionData = selectionData.map((selection) => ({
				...selection,
				isSelected: selection.selectedChapterId === selectedChapterId,
			}));
			setSelectionData(updatedSelectionData);
			setCurrentIndex(
				tochigiChapterData.findIndex(
					(chapter) => chapter.chapterId === selectedChapterId,
				),
			);
		}
	};

	const handleSwipe = (direction: "left" | "right") => {
		const currentIndex = tochigiChapterData.findIndex(
			(chapter) =>
				selectedChapter && chapter.chapterId === selectedChapter.chapterId,
		);
		let newIndex: number;
		if (direction === "left") {
			newIndex = (currentIndex + 1) % tochigiChapterData.length;
		} else {
			newIndex =
				(currentIndex - 1 + tochigiChapterData.length) %
				tochigiChapterData.length;
		}
		const newChapterId = tochigiChapterData?.[newIndex]?.chapterId;
		if (newChapterId) {
			handleSelectChapter(newChapterId);
		}
	};

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

			// Check if the swipe is primarily horizontal and exceeds the threshold
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

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "ArrowLeft") {
			handleSwipe("right");
		} else if (e.key === "ArrowRight") {
			handleSwipe("left");
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedChapter]);

	const selectedButtonRef = useRef<HTMLDivElement | null>(null);

	return (
		<div
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			className="md:absolute md:right-0 max-h-full md:h-[90vh] md:w-[95vw] animate-fadeIn overflow-hidden"
		>
			{selectedChapter?.chapterNumber === "Introduction" ? (
				<AnimatePresence mode="wait">
					<IntroComponent
						key={selectedChapter?.chapterId}
						chapter={selectedChapter}
					/>
				</AnimatePresence>
			) : (
				<AnimatePresence mode="wait">
					<ChapterComponent
						areaLink="/touriiverse/tochigi"
						key={selectedChapter?.chapterId}
						chapter={selectedChapter}
					/>
				</AnimatePresence>
			)}
			<ChapterSelectionMobileComponent
				selectionData={selectionData}
				handleSelectChapter={handleSelectChapter}
				selectedButtonRef={selectedButtonRef}
				currentIndex={currentIndex}
				setCurrentIndex={setCurrentIndex}
			/>
			<ChapterSelectionComponent
				placeName="TOCHIGI"
				selectionData={selectionData}
				handleSelectChapter={handleSelectChapter}
				selectedButtonRef={selectedButtonRef}
			/>
		</div>
	);
};

export default Tochigi;
