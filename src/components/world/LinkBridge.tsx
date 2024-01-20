import React from "react";
import { type BridgeProps } from "./worldData";
import Image from "next/image";

const LinkBridge: React.FC<BridgeProps> = ({ japaneseTitle, englishTitle }) => {
  return (
    <div className="relative flex justify-center align-middle">
      <div className="absolute left-[58%] top-[50%] z-10  -translate-y-1/2 transform text-left 2xl:left-[55%]">
        <div className="text-[8px] font-bold uppercase leading-loose tracking-widest text-[#64645F] md:text-xs 2xl:text-base">
          {japaneseTitle}
        </div>
        <div
          className="text-[8px] font-medium
         italic tracking-wider text-[#64645F] md:text-xs 2xl:text-base"
        >
          {englishTitle}
        </div>
      </div>
      <div className="-mb-[68px] -mt-[47px] flex h-52  md:-mb-[84px] md:-mt-[54px] md:h-60 lg:-mb-[92px] lg:-mt-[58px] lg:h-64 xl:-mb-[104px] xl:-mt-[74px] xl:h-80">
        <Image
          src="image/world/bridge.svg"
          alt="bridge"
          width={100}
          height={300}
          quality={100}
          className="h-full w-fit object-cover"
        />
      </div>
    </div>
  );
};

export default LinkBridge;
