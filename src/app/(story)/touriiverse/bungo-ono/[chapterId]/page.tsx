"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import { DescriptionStory } from "@/components/about/Description";
import { bungoOnoChapterData } from "@/lib/data/story/chapterData";
import { type Chapter } from "@/types/interfaceStory";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
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
    <div className="absolute right-0 h-[90vh] w-[87vw] animate-fadeIn rounded-bl-xl rounded-tl-xl bg-warmGrey text-charcoal">
      {chapter.vnLink ? (
        <iframe
          src={chapter.vnLink}
          title={chapter.title}
          className="absolute left-0 top-0 h-full w-full rounded-bl-xl rounded-tl-xl"
        />
      ) : (
        <div className="flex h-full w-full justify-between overflow-hidden">
          <div className="my-auto h-[90vh] w-1/2 overflow-y-auto p-10">
            <DescriptionStory
              smallTitle={chapter.chapterNumber}
              title={chapter.title}
              content={chapter.content}
            />
            <Link
              href={"/touriiverse/bungo-ono"}
              className="mx-auto h-fit w-fit rounded-full border-[1.5px] border-red px-8 py-2 text-center font-medium uppercase tracking-widest text-red transition hover:bg-red hover:text-warmGrey md:flex"
            >
              CLOSE
            </Link>
          </div>

          <div className="w-1/2">
            <Image
              src={chapter.image}
              alt={chapter.title}
              height={500}
              width={500}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default withPageAuthRequired(VisualNovel);
