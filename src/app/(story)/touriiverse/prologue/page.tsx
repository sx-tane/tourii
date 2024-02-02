import PrologueComponent from "@/components/touriiverse/PrologueComponent";
import { prologueChapterData } from "@/lib/data/story/chapterData";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { type NextPage } from "next";

const Prologue: NextPage = () => {
  return (
    <div>
      <div className="absolute -right-0 top-32 h-[90vh] w-[98vw] transition-all duration-300">
        <PrologueComponent chapter={prologueChapterData} />
      </div>
    </div>
  );
};

export default withPageAuthRequired(Prologue);
