import WhiteLine from "@/components/world/Line";
import Section from "@/components/world/place/Section";
import DescriptionWorld from "@/components/world/text/Description";
import Title from "@/components/world/text/Title";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "World",
};

const World: React.FC = () => {
  return (
    <div className="mx-auto flex w-9/12 flex-col items-center justify-center">
      <Title />
      <div className="w-9/12">
        <Section />
        <DescriptionWorld />
        <div className="mb-20">
          <WhiteLine />
        </div>
      </div>
    </div>
  );
};

export default World;
