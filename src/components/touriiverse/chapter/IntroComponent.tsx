import { type Chapter } from "@/types/interfaceStory";
import Image from "next/image";
import Markdown from "react-markdown";

interface IntroProps {
  chapter: Chapter | undefined;
}

const IntroComponent: React.FC<IntroProps> = ({ chapter }) => {
  return (
    <div className="relative h-[70vh] w-auto rounded-bl-xl rounded-tl-xl bg-warmGrey p-8 text-charcoal transition-all duration-500">
      <div className="text-center font-bold uppercase tracking-wider md:text-5xl">
        {chapter?.area}
        <div className="mt-3 text-base font-semibold">
          {chapter?.chapterNumber}
        </div>
      </div>
      <div className="bottom-8 left-8 md:absolute">
        <div className="mb-5 w-80 font-bold">{chapter?.title}</div>
        <Markdown className="gap-10 whitespace-pre-wrap text-justify text-sm md:w-7/12 xl:columns-2 xl:text-base">
          {chapter?.content}
        </Markdown>
      </div>
      <Image
        src={chapter?.image ?? ""}
        alt={chapter?.title ?? ""}
        width={550}
        height={550}
        className="absolute bottom-8 right-8  hidden aspect-square w-auto rounded-full object-cover md:flex md:h-[35vh] lg:h-[45vh] xl:h-[55vh]"
      />
    </div>
  );
};

export default IntroComponent;
