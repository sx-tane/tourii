import React from "react";
import Image from "next/image";

const Headline: React.FC = () => {
  return (
    <div>
      {/*Desktop and Laptop Size*/}
      <div className="hidden lg:flex lg:flex-col">
        <div className=" mb-8 text-left text-xl  font-bold text-black xl:text-2xl 2xl:text-3xl 2xl:leading-normal">
          Unveiling Japan's mystical realms <br /> through narrative
          storytelling
          <br /> & Web 3.0 tourism.
        </div>
        <Image
          src="/image/homepage/tourii.svg"
          alt="tourii"
          width={700}
          height={700}
          className="mt-5 h-full w-full"
          priority={true}
        />
      </div>
      {/*Tablet and Phone Size*/}
      <div className="flex flex-col lg:hidden">
        <div className="text-left text-sm font-semibold leading-normal text-black sm:text-xl">
          Unveiling Japan's mystical realms through narrative storytelling & Web
          3.0 tourism.
        </div>
      </div>
    </div>
  );
};

export default Headline;
