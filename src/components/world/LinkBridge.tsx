import React from "react";
import { type BridgeProps } from "./worldData";
import Image from "next/image";

const LinkBridge: React.FC<BridgeProps> = ({ japaneseTitle, englishTitle }) => {
  return (
    <div className="relative flex justify-center align-middle">
      <div className="absolute left-[55%] top-[50%] z-10  -translate-y-1/2 transform text-left ">
        <div className="text-[0.75vw] font-bold uppercase leading-loose tracking-widest text-[#64645F]">
          {japaneseTitle}
        </div>
        <div
          className="text-[0.75vw]
         font-medium italic tracking-wider text-[#64645F]"
        >
          {englishTitle}
        </div>
      </div>
      <div className="h-[calc(20px + 2vw)] w-[calc(20px + 2vw)] -mb-[102px] -mt-[72px]">
        <Image
          src="image/world/bridge.svg"
          alt="bridge"
          quality={100}
          width={197.74}
          height={313.92}
        />
      </div>
    </div>
  );
};

export default LinkBridge;
