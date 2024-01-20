import React from "react";
import Headline from "@/components/homepage/Headline";
import NFTEmblem from "@/components/homepage/NFTEmblem";
import MainImage from "@/components/homepage/MainImage";
import Image from "next/image";

const HomePage: React.FC = () => {
  return (
    <div>
      {/*Desktop and Laptop Size*/}
      <div className="hidden w-full items-end overflow-hidden md:flex">
        <div className="fixed bottom-6 left-6 z-20 ">
          <Headline />
        </div>
        <div className="fixed bottom-5  overflow-hidden md:right-12 md:w-[75vh] lg:w-[85vh] xl:right-20 ">
          <MainImage />
        </div>
        <div className="fixed z-30 md:-bottom-8 md:-right-6 xl:-bottom-10 xl:-right-6 2xl:-bottom-10 2xl:-right-4">
          <NFTEmblem />
        </div>
      </div>
      {/*Tablet and Phone Size*/}
      <div className="h-full overflow-hidden md:hidden">
        <div className="absolute bottom-0 top-[20%] -mx-6 w-full overflow-hidden">
          <div className="mx-6 mb-5">
            <div className="mb-4 pr-20 sm:mb-10 sm:pr-64">
              <Headline />
            </div>
            <Image
              src="/image/homepage/tourii.svg"
              alt="tourii"
              width={500}
              height={600}
              className="relative w-[55%] object-cover sm:w-5/12"
              priority={true}
            />
          </div>
          <Image
            src="/image/about/tourii_main.png"
            width={1000}
            height={1000}
            alt="tourii_main"
            className="z-10 h-[65vh] w-full object-cover "
          />
        </div>
        <div className="z-20 md:hidden">
          <NFTEmblem />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
