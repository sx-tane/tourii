import DividerWhite from "@/components/world/Divider";
import WhiteLine from "@/components/world/Line";
import Section from "@/components/world/place/Section";
import DescriptionWorld from "@/components/world/text/Description";
import Goal from "@/components/world/text/Goal";
import Title from "@/components/world/text/Title";
import { titleData } from "@/components/world/worldData";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "World",
};

const World: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center xl:mx-72 2xl:mx-96">
      <Title
        smallTitle={titleData[0]?.smallTitle}
        title={titleData[0]?.title}
      />
      <Section />
      <DescriptionWorld />
      <div className="-mx-6 -my-10 w-full md:mx-0 md:my-0">
        <WhiteLine />
      </div>
      <Title
        smallTitle={titleData[1]?.smallTitle}
        title={titleData[1]?.title}
      />
      <div className="-mt-10">
        <Goal />
      </div>
      <div className="my-10">
        <DividerWhite />
      </div>
    </div>
  );
};

export default World;
