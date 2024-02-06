"use client";

import { useState } from "react";
import UserProfileCard from "@/components/profile/UserProfileCard";
import TravelGoshuinCollection from "@/components/profile/goshuin/TravelGoshuinCollection";
import { profile1, profile1NFT } from "@/lib/data/user/profile1";
import { type NextPage } from "next";
import Image from "next/image";

const Profile: NextPage = () => {
  const [selectedNFT, setSelectedNFT] = useState(profile1NFT[0]);

  const handleNFTChange = (nftId: string) => {
    const newSelectedNFT = profile1NFT.find((nft) => nft.nftId === nftId);
    setSelectedNFT(newSelectedNFT);
  };

  // Create an array of length 6 filled with NFTs and placeholders
  const nftList = new Array(6).fill(undefined);
  for (let i = 0; i < profile1NFT.length; i++) {
    nftList[i] = profile1NFT[i];
  }

  return (
    <div className="absolute right-0 flex h-[90vh] w-[95vw] space-x-2 ">
      <div className="flex w-1/4 flex-col space-y-2">
        <UserProfileCard userProfile={profile1} />
        <TravelGoshuinCollection userProfile={profile1} />
      </div>
      <div className="flex w-3/4 flex-col justify-between rounded-xl bg-warmGrey px-8 pt-8">
        <div className="text-xs font-bold uppercase tracking-wider text-red">
          NFT & Collectibles
        </div>
        <div className="mt-20 flex h-4/6 w-full">
          <div className="h-full w-1/2 ">
            <div className="text-sm font-semibold uppercase tracking-widest text-red">
              tourii
            </div>
            <div className="pt-2 text-8xl font-normal uppercase tracking-tight text-red">
              {selectedNFT?.nftId ?? ""}
            </div>
          </div>
          <div className="flex h-full w-1/2 bg-blue-400"></div>
        </div>
        <div className="mt-10 flex h-1/3 items-center">
          {/* Left Arrow */}
          <Image
            src="/image/about/left.svg"
            alt="left"
            width={20}
            height={20}
            priority={true}
          />
          <div className="mx-12 grid w-full grid-cols-6 items-center justify-items-center gap-12">
            {nftList.map((nft, index) =>
              nft ? (
                <Image
                  key={nft.nftId}
                  src={nft.nftImage}
                  alt={nft.nftId}
                  width={100}
                  height={100}
                  onClick={() => handleNFTChange(nft.nftId)}
                  className="h-auto w-full"
                />
              ) : (
                // This is the placeholder
                <div
                  key={index}
                  className="h-full w-full bg-warmGrey3 shadow-inner"
                />
              ),
            )}
          </div>
          {/* Right Arrow */}
          <Image
            src="/image/about/right.svg"
            alt="left"
            width={20}
            height={20}
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
