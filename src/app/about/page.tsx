import AboutCoin from "@/components/about/AboutCoin";
import AboutImage from "@/components/about/AboutImage";
import Description from "@/components/about/Description";
import JourneyAndNft from "@/components/about/JourneyAndNft";
import Line from "@/components/about/Line";
import { descriptionData } from "@/components/about/descriptionData";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About",
};

const About: React.FC = () => {
  return (
    <div>
      <div className="fixed right-5 z-10">
        <AboutCoin />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className=" mt-10 flex flex-col items-center">
          <div id="who-is-tourii" className="flex flex-col items-center">
            <Description {...descriptionData[0]} />
          </div>
          <div className="w-7/12">
            <Line />
          </div>
          <div id="our-objectives" className="flex flex-col items-center">
            <Description {...descriptionData[1]} />
          </div>
        </div>
        <div className="flex w-10/12 flex-col items-center">
          <AboutImage />
        </div>
        <JourneyAndNft />
      </div>
    </div>
  );
};

export default About;
