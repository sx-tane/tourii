import Description from "@/components/about/Description";
import { descriptionData } from "@/components/about/descriptionData";
import Divider from "@/components/about/divider-line/Divider";
import Line from "@/components/about/divider-line/Line";
import { CharacterCarousel } from "@/components/story/CharacterCarousel";
import React from "react";

const Story: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center xl:mx-72 2xl:mx-96">
      <div className="mt-10">
        <Description {...descriptionData[4]} />
      </div>
      <Line />
      <Description {...descriptionData[5]} />
      <CharacterCarousel />
      <div className="mb-10 mt-5">
        <Divider />
      </div>
    </div>
  );
};

export default Story;
