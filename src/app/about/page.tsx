import AboutImage from "@/components/about/AboutImage";
import BackToTop from "@/components/about/BackToTop";
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
    <div>
      <div className="fixed right-6 top-36 z-10 hidden md:flex ">
        <AboutCoin />
      </div>
      <div className=" flex flex-col items-center justify-center xl:mx-72 2xl:mx-96">
        <div id="who-is-tourii" className=" ">
          <div className="hidden md:flex">
            <Description {...descriptionData[0]} />
          </div>
          <div className="md:hidden">
            <Description
              {...descriptionData[0]}
              smallTitle="what"
              title="is tourii"
            />
          </div>
        </div>
        <div className="-mx-6 w-full md:mx-0">
          <Line />
        </div>
        <div id="our-objectives">
          <Description {...descriptionData[1]} />
        </div>
        <AboutImage />
        <div className="-mx-6 mb-10 h-full items-center bg-warmGrey3 md:mx-0">
          <JourneyAndNft />
        </div>
        <div className="-mx-6 mb-10 md:mx-0 md:mt-5">
          <Divider />
        </div>
        <h3
          id="meet-our-crew"
          className="mb-10 text-center text-xl font-bold uppercase tracking-widest text-red"
        >
          Meet our crew
        </h3>
        <CrewGrid />
      </div>
      <div className="-mx-6 mt-10 md:mx-0 md:pb-20">
        <Divider />
        <BackToTop />
      </div>
    </div>
  );
};

export default About;
