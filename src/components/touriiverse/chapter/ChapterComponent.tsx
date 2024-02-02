"use client";

import { type Chapter } from "@/types/interfaceStory";
import Image from "next/image";
import { useState } from "react";
import Markdown from "react-markdown";
import ChapterButton from "./ChapterButton";

interface ChapterProps {
  chapter: Chapter | undefined;
}

const ChapterComponent: React.FC<ChapterProps> = ({ chapter }) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc =
    isHovered && chapter?.realImage ? chapter.realImage : chapter?.image;

  return (
    <div className="relative h-[70vh] w-auto rounded-bl-xl rounded-tl-xl bg-warmGrey p-8 text-charcoal transition-all duration-500">
      <div className="text-lg font-semibold uppercase tracking-widest">
        {chapter?.chapterNumber}
      </div>
      <div className="absolute right-14 top-8 text-center text-lg font-bold uppercase tracking-widest">
        {chapter?.area}
      </div>
      <div className="bottom-8 left-8 md:absolute">
        <div className="mb-5 w-80 font-bold">{chapter?.title}</div>
        <Markdown className="gap-10 whitespace-pre-wrap text-justify text-sm md:w-8/12 xl:columns-2 xl:text-base">
          {chapter?.content}
        </Markdown>
      </div>
      <div
        className="absolute bottom-8 right-14"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={imageSrc ?? ""}
          alt={chapter?.title ?? ""}
          width={550}
          height={550}
          priority={true}
          className="aspect-square h-[48vh] w-[20vw] rounded-full object-cover"
        />
        <ChapterButton key={chapter?.chapterId} chapter={chapter} />
      </div>
    </div>
  );
};

export default ChapterComponent;
