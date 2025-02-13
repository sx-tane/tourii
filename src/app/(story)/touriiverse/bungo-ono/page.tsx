"use client";

import ChapterComponent from "@/components/touriiverse-story/chapter/chapter-component";
import ChapterSelectionComponent from "@/components/touriiverse-story/chapter/chapter-selection";
import IntroComponent from "@/components/touriiverse-story/chapter/intro-component";
import {
	bungoOnoChapterData,
	bungoOnoChapterSelectionData,
} from "@/lib/data/touriiverse/chapter-data";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

const BungoOno: NextPage = () => {
	const [selectedChapter, setSelectedChapter] = useState(() => {
		// Return the default chapter initially
		return bungoOnoChapterData[0];
	});

	const [selectionData, setSelectionData] = useState(
		bungoOnoChapterSelectionData,
	);

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
		let chapter: (typeof bungoOnoChapterData)[0] | undefined;
		if (selectedChapterId === "Intro") {
			chapter = bungoOnoChapterData[0];
		} else {
			chapter = bungoOnoChapterData.find(
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
		}
	};

	const selectedButtonRef = useRef<HTMLDivElement | null>(null);

	return (
		<div className="absolute -right-0 h-[90vh] w-[95vw] animate-fadeIn overflow-hidden">
			{selectedChapter?.chapterNumber === "Intro" ? (
				<AnimatePresence mode="wait">
					<IntroComponent
						key={selectedChapter?.chapterId}
						chapter={selectedChapter}
					/>
				</AnimatePresence>
			) : (
				<AnimatePresence mode="wait">
					<ChapterComponent
						key={selectedChapter?.chapterId}
						chapter={selectedChapter}
					/>
				</AnimatePresence>
			)}
			<ChapterSelectionComponent
				selectionData={selectionData}
				handleSelectChapter={handleSelectChapter}
				selectedButtonRef={selectedButtonRef}
			/>
		</div>
	);
};

export default BungoOno;
