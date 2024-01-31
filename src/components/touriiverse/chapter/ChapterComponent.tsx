import { type Chapter } from "@/types/interfaceStory";
import Image from "next/image";
import Markdown from "react-markdown";

interface ChapterProps {
  chapter: Chapter | undefined;
}

const ChapterComponent: React.FC<ChapterProps> = ({ chapter }) => {
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
      <div className="absolute bottom-8 right-14">
        <Image
          src={chapter?.image ?? ""}
          alt={chapter?.title ?? ""}
          width={550}
          height={550}
          className=" aspect-square h-[45vh] w-[20vw] rounded-full object-cover"
        />
        <div className="mt-12 h-14 w-full bg-red text-center">test</div>
      </div>
    </div>
  );
};

export default ChapterComponent;
