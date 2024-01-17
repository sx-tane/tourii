import AboutImage from "@/components/about/AboutImage";
import Description from "@/components/about/Description";
import JourneyAndNft from "@/components/about/JourneyAndNft";
import AboutCoin from "@/components/about/about-menu/AboutCoin";
import CrewGrid from "@/components/about/crew/CrewGrid";
import { descriptionData } from "@/components/about/descriptionData";
import Divider from "@/components/about/divider-line/Divider";
import Line from "@/components/about/divider-line/Line";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const About: React.FC = () => {
  return (
    <div className="">
      <div className="fixed right-6 top-36 z-10 hidden lg:flex">
        <AboutCoin />
      </div>
      <div className="mx-6 flex flex-col items-center justify-center lg:mx-80">
        <div id="who-is-tourii" className=" ">
          <Description {...descriptionData[0]} />
        </div>
        <div className="w-full">
          <Line />
        </div>
        <div id="our-objectives">
          <Description {...descriptionData[1]} />
        </div>
        <AboutImage />
        <div className="h-full items-center bg-warmGrey3">
          <JourneyAndNft />
        </div>
        <div className="mb-20 mt-5">
          <Divider />
        </div>
        <h3
          id="meet-our-crew"
          className="mb-10 text-xl font-bold uppercase tracking-widest text-red"
        >
          Meet our crew
        </h3>
        <CrewGrid />
      </div>
      <div className="mt-20">
        <Divider />
      </div>
    </div>
  );
};

export default About;
