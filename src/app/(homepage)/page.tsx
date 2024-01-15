import React from "react";
import Headline from "@/components/homepage/Headline";
import NFTEmblem from "@/components/homepage/NFTEmblem";
import MainImage from "@/components/homepage/MainImage";
import Header from "@/components/header-white/Header";

const HomePage: React.FC = () => {
  return (
    <div className={`w-full items-end overflow-hidden`}>
      <Header />
      <div className="fixed bottom-6 left-6 z-10 ">
        <Headline />
      </div>
      <MainImage />
      <div className="fixed z-30 md:-bottom-8 md:-right-6 lg:-bottom-8 lg:-right-6 xl:-bottom-10 xl:-right-6 2xl:-bottom-10 2xl:-right-4 ">
        <NFTEmblem />
      </div>
    </div>
  );
};

export default HomePage;
