import React from "react";
import Image from "next/image";

const NFTEmblem: React.FC = () => {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      <Image
        src="/image/homepage/emblem.svg"
        alt="Emblem"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="z-10 flex flex-col items-center justify-center text-center text-black">
        <hr className="mx-auto mb-3 w-9 border-t-[1.4px] border-black" />
        <div className="font-secondary text-[55px] leading-10 -tracking-widest">
          7777
        </div>
        <div className="text-[26px] font-semibold leading-snug">NFT</div>
        <hr className="mx-auto my-2 w-9 border-t-[1.4px] border-black" />
        <div className="mt-1 text-[14px] font-bold uppercase leading-tight tracking-wider">
          coming
          <br />
          soon
        </div>
      </div>
    </div>
  );
};

export default NFTEmblem;
