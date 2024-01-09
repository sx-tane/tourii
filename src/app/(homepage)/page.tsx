import Headline from "@/components/homepage/Headline";
import NFTEmblem from "@/components/homepage/NFTEmblem";
import React from "react";
import MainImage from "@/components/homepage/MainImage";

const HomePage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed bottom-8 left-8 z-10 ">
        <Headline />
      </div>
      <div className="mb-auto ml-auto mr-16">
        <MainImage />
      </div>
      <div className="fixed -bottom-10 -right-3 z-10 ">
        <NFTEmblem />
      </div>
    </div>
  );
};

export default HomePage;
