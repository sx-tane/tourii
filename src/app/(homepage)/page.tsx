import React from "react";
import Headline from "@/components/homepage/Headline";
import NFTEmblem from "@/components/homepage/NFTEmblem";
import MainImage from "@/components/homepage/MainImage";
import Image from "next/image";

const HomePage: React.FC = () => {
  return (
    <div>
      {/*Desktop and Laptop Size*/}
      <div className="hidden w-full items-end overflow-hidden lg:flex">
        <div className="fixed bottom-6 left-6 z-20 ">
          <Headline />
        </div>
        <div className="h-10">
          <MainImage />
        </div>
        <div className="fixed z-30  md:-bottom-8 md:-right-6 lg:-bottom-8 lg:-right-6 xl:-bottom-10 xl:-right-6 2xl:-bottom-10 2xl:-right-4">
          <NFTEmblem />
        </div>
      </div>
      {/*Tablet and Phone Size*/}
      <div className="h-full overflow-hidden lg:hidden">
        <div className="absolute bottom-0 top-[20%] -mx-6 w-full overflow-hidden">
          <div className="mx-6 mb-5">
            <div className="mb-6 pr-20 sm:pr-32">
              <Headline />
            </div>
            <Image
              src="/image/homepage/tourii.svg"
              alt="tourii"
              width={500}
              height={600}
              className="w-full object-cover sm:w-8/12"
              priority
            />
          </div>
          <Image
            src="/image/homepage/tourii_main.png"
            width={1000}
            height={1000}
            alt="tourii_main"
            className="h-5/6 object-cover sm:h-2/3"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
