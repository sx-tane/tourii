import Headline from "@/components/homepage/Headline";
import NFTEmblem from "@/components/homepage/NFTEmblem";
import React from "react";
import MainImage from "@/components/homepage/MainImage";

const HomePage: React.FC = () => {
  return (
    <div className="relative flex items-end justify-between">
      <div className="bottom-0 left-0">
        <Headline />
      </div>
      <div className="mr-24">
        <MainImage />
      </div>
      <div className="absolute -bottom-14 -right-6 z-10 flex">
        <NFTEmblem />
      </div>
    </div>
  );
};

export default HomePage;
