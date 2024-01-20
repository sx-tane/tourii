import React from "react";
import Image from "next/image";

const NFTEmblem: React.FC = () => {
  return (
    <div>
      {/* Desktop & Laptop */}
      <div className="hidden items-center justify-center md:flex">
        <div className="absolute z-10 flex flex-col items-center justify-center bg-transparent text-center text-black">
          <hr className=" mb-3 w-9 border-t-[1.4px] border-black md:mb-1 md:w-5 xl:w-7 2xl:mb-3 2xl:w-9" />
          <div className="font-secondary text-xl leading-8 tracking-tighter md:text-3xl xl:text-4xl 2xl:text-5xl">
            7777
          </div>
          <div className="text-lg font-semibold leading-tight lg:text-xl xl:text-2xl 2xl:text-3xl">
            NFT
          </div>
          <hr className=" my-2 w-9 border-t-[1.4px] border-black md:my-2 md:w-5 xl:my-2 xl:w-7 2xl:my-2 2xl:w-9" />
          <div className="mt-1 text-[8px] font-bold uppercase leading-tight tracking-wider md:text-[10px] xl:text-[12px] 2xl:text-[14px]">
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
          className="w-full md:h-[240px] lg:h-[260px] xl:h-[280px] 2xl:h-[340px]"
          priority={true}
        />
      </div>
      {/* Tablet & Mobile */}
      <div className=" md:hidden">
        <div className="absolute bottom-9 right-[41px] z-40  flex flex-col items-center justify-center bg-transparent text-center text-black">
          <div className="mb-1 w-4 border-t-[1.4px] border-black" />
          <div className="font-secondary text-2xl tracking-tighter">7777</div>
          <div className="text-[14px] font-semibold tracking-normal">NFT</div>
          <div className="my-1 w-4 border-t-[1.4px] border-black" />
          <div className="mt-1 text-[9px] font-bold uppercase leading-tight tracking-wider">
            coming
            <br />
            soon
          </div>
        </div>
        <Image
          src="/image/homepage/emblem.svg"
          alt="Emblem"
          width={800}
          height={300}
          className="fixed -bottom-5 -right-4 z-30 w-40 "
          priority={true}
        />
      </div>
    </div>
  );
};

export default NFTEmblem;
