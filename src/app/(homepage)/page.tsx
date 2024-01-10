import Headline from "@/components/homepage/Headline";
import NFTEmblem from "@/components/homepage/NFTEmblem";
import React from "react";
import MainImage from "@/components/homepage/MainImage";

const HomePage: React.FC = () => {
  return (
    <div className="fixed flex w-full items-end overflow-hidden">
      <div className="fixed bottom-6 left-6 z-10 ">
        <Headline />
      </div>
      <div className="fixed bottom-2 h-[90%] w-[36vw] md:w-[49vw]  lg:right-14 lg:w-[49vw] xl:right-16 xl:w-[49vw] 2xl:right-28  2xl:w-[49vw]">
        <MainImage />
      </div>
      <div className="fixed md:-bottom-8 md:-right-6 lg:-bottom-8 lg:-right-6 xl:-bottom-10 xl:-right-6 2xl:-bottom-10 2xl:-right-4 ">
        <NFTEmblem />
      </div>
    </div>
  );
};

export default HomePage;
