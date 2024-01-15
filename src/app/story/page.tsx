import Description from "@/components/about/Description";
import { descriptionData } from "@/components/about/descriptionData";
import Divider from "@/components/about/divider-line/Divider";
import Line from "@/components/about/divider-line/Line";
import ProtagonistsSection from "@/components/story/ChracterList";
import React from "react";

const Story: React.FC = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <Description {...descriptionData[4]} />
      <div className="w-7/12">
        <Line />
      </div>
      <Description {...descriptionData[5]} />
      <ProtagonistsSection />
      <div className="mt-20">
        <Divider />
      </div>
    </div>
  );
};

export default Story;
