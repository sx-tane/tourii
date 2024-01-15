import React from "react";
import Image from "next/image";

const Headline: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-8 text-left text-xs font-bold text-black md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl 2xl:leading-normal">
        Unveiling Japan's mystical realms <br /> through narrative storytelling
        <br /> & Web 3.0 tourism.
      </div>
      <Image
        src="/image/homepage/tourii.svg"
        alt="tourii"
        width={700}
        height={700}
        className="mt-5 h-full w-full"
        priority
      />
    </div>
  );
};

export default Headline;
