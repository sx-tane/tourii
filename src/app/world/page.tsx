import DividerWhite from "@/components/world/Divider";
import WhiteLine from "@/components/world/Line";
import Section from "@/components/world/place/Section";
import DescriptionWorld from "@/components/world/text/Description";
import Goal from "@/components/world/text/Goal";
import Title from "@/components/world/text/Title";
import { titleData, worldData } from "@/components/world/worldData";
import React from "react";

const World: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center xl:mx-72 2xl:mx-96">
      <Title
        smallTitle={titleData[0]?.smallTitle}
        title={titleData[0]?.title}
      />
      <Section />
      <div className="mt-10">
        <DescriptionWorld data={worldData[0]?.description ?? ""} />
      </div>
      <div className="-mx-6 -my-10 w-full md:mx-0 md:my-0">
        <WhiteLine />
      </div>{" "}
      <Title
        smallTitle={titleData[1]?.smallTitle}
        title={titleData[1]?.title}
      />
      <div className="-mt-10 md:-mt-20">
        <DescriptionWorld data={worldData[1]?.description ?? ""} />
      </div>
      <Goal />
      <div className="mb-5 text-center text-base italic tracking-wider text-[#858581]">
        Click for more information
      </div>
      <DividerWhite />
    </div>
  );
};

export default World;
