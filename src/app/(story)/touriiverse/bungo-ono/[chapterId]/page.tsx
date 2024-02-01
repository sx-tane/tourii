"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import { bungoOnoChapterData } from "@/lib/data/story/chapterData";
import { type Chapter } from "@/types/interfaceStory";
import { useState, useEffect } from "react";

type Props = {
  params: {
    chapterId: string;
  };
};

const VisualNovel: React.FC<Props> = ({ params }) => {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State to hold any errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const foundChapter = bungoOnoChapterData.find(
          (p) => p.chapterId === params.chapterId,
        );
        setChapter(
          foundChapter
            ? {
                ...foundChapter,
              }
            : null,
        );
      } catch (e) {
        setError("Failed to fetch chapter data"); // Set the error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch((e) => setError(e.message)); // Catch any unhandled errors
  }, [params.chapterId]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorComponent />
      </div>
    );
  }

  if (!chapter) {
    return (
      <div>
        <NotFoundComponent />
      </div>
    );
  }

  return (
    <div className="absolute right-0 h-[90vh] w-[87vw] rounded-bl-xl rounded-tl-xl bg-warmGrey p-8 text-charcoal transition-all duration-500">
      <iframe
        src={chapter.vnLink}
        title={chapter.title}
        className="absolute left-0 top-0 h-full w-full rounded-bl-xl rounded-tl-xl"
      />
    </div>
  );
};

export default VisualNovel;
