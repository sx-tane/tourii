import React from "react";
import Image from "next/image";

const NFTEmblem: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="absolute z-10 w-full items-center justify-center bg-transparent text-center text-black">
        <hr className="mx-auto mb-3 w-9 border-t-[1.4px] border-black lg:mb-1 lg:w-5 xl:mb-1 xl:w-7 2xl:mb-3 2xl:w-9" />
        <div className="font-secondary text-xl leading-10 tracking-tighter lg:text-3xl xl:text-4xl 2xl:text-5xl">
          7777
        </div>
        <div className="text-lg font-semibold leading-snug lg:text-xl xl:text-2xl 2xl:text-3xl">
          NFT
        </div>
        <hr className="mx-auto my-2 w-9 border-t-[1.4px] border-black lg:my-1 lg:w-5 xl:my-2 xl:w-7 2xl:my-2 2xl:w-9" />
        <div className="mt-1 text-[8px] font-bold uppercase leading-tight tracking-wider lg:text-[10px] xl:text-[12px] 2xl:text-[14px]">
          coming
          <br />
          soon
        </div>
      </div>
      <Image
        src="/image/homepage/emblem.svg"
        alt="Emblem"
        width={280}
        height={300}
        className="h-24 w-full md:h-[200px] lg:h-[230px] xl:h-[280px] 2xl:h-[340px]"
        priority={true}
      />
    </div>
  );
};

export default NFTEmblem;
