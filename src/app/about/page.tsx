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
    <div className="mx-auto w-9/12 flex-col items-center justify-center">
      <div className="fixed right-6 z-10">
        <AboutCoin />
      </div>
      <div className="w-9/10 flex min-h-screen flex-col items-center justify-center">
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
        <div className="flex  flex-col items-center">
          <AboutImage />
        </div>
        <JourneyAndNft />
        <div className="mb-20 mt-5">
          <Divider />
        </div>
        <h3
          id="meet-our-crew"
          className="mb-10 text-xl font-bold uppercase tracking-widest text-red"
        >
          Meet our crew
        </h3>
        <div className="w-10/12"></div>
        <CrewGrid />
      </div>
      <div className="mt-20">
        <Divider />
      </div>
    </div>
  );
};

export default About;
