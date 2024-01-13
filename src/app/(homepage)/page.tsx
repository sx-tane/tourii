import React from "react";
import Headline from "@/components/homepage/Headline";
import NFTEmblem from "@/components/homepage/NFTEmblem";
import MainImage from "@/components/homepage/MainImage";

const HomePage: React.FC = () => {
  return (
    <div className={`flex w-full items-end overflow-hidden`}>
      <div className="fixed bottom-6 left-6 z-10 ">
        <Headline />
      </div>
      <div className="flex w-full items-end justify-end pb-8 pr-14 ">
        <MainImage />
      </div>
      <div className="fixed md:-bottom-8 md:-right-6 lg:-bottom-8 lg:-right-6 xl:-bottom-10 xl:-right-6 2xl:-bottom-10 2xl:-right-4 ">
        <NFTEmblem />
      </div>
    </div>
  );
};

export default HomePage;
