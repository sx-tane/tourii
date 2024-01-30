import Intro from "@/components/touriiverse/chapter/IntroComponent";
import { prologueChapterData } from "@/lib/data/story/chapterData";
import { type NextPage } from "next";

const Prologue: NextPage = () => {
  return (
    <div className="absolute -right-0 top-32 h-[90vh] w-[98vw] transition-all duration-300">
      <Intro chapter={prologueChapterData} />
    </div>
  );
};

export default Prologue;
