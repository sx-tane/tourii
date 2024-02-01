"use client";

import ChapterComponent from "@/components/touriiverse/chapter/ChapterComponent";
import ChapterSelectionButton from "@/components/touriiverse/chapter/ChapterSelection";
import IntroComponent from "@/components/touriiverse/chapter/IntroComponent";
import {
  bungoOnoChapterData,
  chapterSelectionData,
} from "@/lib/data/story/chapterData";
import { type NextPage } from "next";
import { useRef, useState } from "react";

const BungoOno: NextPage = () => {
  const [selectedChapter, setselectedChapter] = useState(
    bungoOnoChapterData[0],
  );
  const [selectionData, setSelectionData] = useState(chapterSelectionData);

  const handleSelectChapter = (selectedChapterId: string) => {
    const chapter = bungoOnoChapterData.find(
      (s) => s.chapterId === selectedChapterId,
    );
    if (chapter) {
      setselectedChapter(chapter);
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

  return (
    <div className="absolute -right-0 h-[90vh] w-[95vw] overflow-hidden">
      {selectedChapter?.chapterNumber === "Intro" ? (
        <IntroComponent
          key={selectedChapter?.chapterId}
          chapter={selectedChapter}
        />
      ) : (
        <ChapterComponent
          key={selectedChapter?.chapterId}
          chapter={selectedChapter}
        />
      )}
      <div className="mt-2 flex rounded-bl-xl rounded-tl-xl bg-warmGrey2 pb-4 pl-12">
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          className="flex w-full items-center overflow-y-hidden overflow-x-scroll"
        >
          <div className="mr-10 shrink-0 text-xl font-bold tracking-wider">
            BUNGO ONO
          </div>
          {selectionData.map((selection) => (
            <ChapterSelectionButton
              key={selection.selectedChapterId}
              selection={selection}
              onSelect={handleSelectChapter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BungoOno;
