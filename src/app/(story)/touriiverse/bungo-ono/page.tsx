"use client";

import ChapterSelectionButton from "@/components/touriiverse-story/chapter/chapter-selection";
import ChapterComponent from "@/components/touriiverse-story/chapter/character-component";
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
		const savedChapter = localStorage.getItem("selectedChapter");
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return savedChapter ? JSON.parse(savedChapter) : bungoOnoChapterData[0];
	});
	const [selectionData, setSelectionData] = useState(
		bungoOnoChapterSelectionData,
	);

	const handleSelectChapter = (selectedChapterId: string) => {
		let chapter: (typeof bungoOnoChapterData)[0] | undefined;
		if (selectedChapterId === "Intro") {
			// Assuming the first chapter in bungoOnoChapterData is your intro
			chapter = bungoOnoChapterData[0];
		} else {
			chapter = bungoOnoChapterData.find(
				(s) => s.chapterId === selectedChapterId,
			);
		}

		if (chapter) {
			setSelectedChapter(chapter);
			localStorage.setItem("selectedChapterId", selectedChapterId); // Save chapter ID to localStorage <-- Add this line
			localStorage.setItem("selectedChapter", JSON.stringify(chapter)); // Save to localStorage
			const updatedSelectionData = selectionData.map((selection) => ({
				...selection,
				isSelected: selection.selectedChapterId === selectedChapterId,
			}));
			setSelectionData(updatedSelectionData);
		}
	};

	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft += e.deltaY;
		}
	};

	const selectedButtonRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const savedChapterId = localStorage.getItem("selectedChapterId");
		if (savedChapterId) {
			handleSelectChapter(savedChapterId);
		}
		if (selectedButtonRef.current) {
			selectedButtonRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		}
	}, [selectedChapter]);

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
			<div className="mt-2 flex rounded-bl-xl rounded-tl-xl bg-warmGrey2 pb-4 pl-12">
				<div
					ref={scrollContainerRef}
					onWheel={handleWheel}
					className="flex w-full items-center overflow-y-hidden overflow-x-scroll"
				>
					<button
						type="button"
						onClick={() => handleSelectChapter("Intro")}
						onKeyUp={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								handleSelectChapter("Intro");
							}
						}}
						className="mr-10 shrink-0 cursor-pointer text-xl font-bold tracking-wider transition-all duration-500 hover:text-red"
					>
						BUNGO ONO
					</button>

					{selectionData.map((selection) => (
						<ChapterSelectionButton
							key={selection.selectedChapterId}
							selection={selection}
							onSelect={handleSelectChapter}
							ref={selection.isSelected ? selectedButtonRef : null}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default BungoOno;
