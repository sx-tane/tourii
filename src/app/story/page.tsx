import Description from "@/components/about/Description";
import { descriptionData } from "@/components/about/descriptionData";
import Divider from "@/components/about/divider-line/Divider";
import Line from "@/components/about/divider-line/Line";
import { CharacterCarousel } from "@/components/story/CharacterCarousel";
import { type Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = {
  title: "Story",
};

const Story: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center xl:mx-72 2xl:mx-96">
      <div className="mt-10">
        <Description {...descriptionData[4]} />
      </div>
      <Line />
      <Description {...descriptionData[5]} />
      <CharacterCarousel />
      <div className=" text-center text-base italic tracking-wider text-red">
        Click for more information
      </div>
      <div className="mb-10 mt-5">
        <Divider />
      </div>
    </div>
  );
};

export default Story;
