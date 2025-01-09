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

	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft += e.deltaY;
		}
	};

	const selectedButtonRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
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
