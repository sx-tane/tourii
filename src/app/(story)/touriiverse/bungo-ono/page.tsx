"use client";

import IntroComponent from "@/components/touriiverse/chapter/IntroComponent";
import { bungoOnoChapterData } from "@/lib/data/story/chapterData";

const BungoOno = () => {
  return (
    <div>
      <div className="absolute -right-0 top-32 h-[90vh] w-[98vw] transition-all duration-300">
        <IntroComponent chapter={bungoOnoChapterData[0]} />
      </div>
    </div>
  );
};

export default BungoOno;
