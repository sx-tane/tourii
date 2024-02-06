"use client";

import { useState } from "react";
import UserProfileCard from "@/components/profile/UserProfileCard";
import TravelGoshuinCollection from "@/components/profile/goshuin/TravelGoshuinCollection";
import { type UserProfile, type NFT } from "@/types/interfaceProfile"; // Import your types
import NFTSelection from "@/components/profile/nft/NftSelector";
import NFTInfo from "@/components/profile/nft/NftInfo";
import { profile1 } from "@/lib/data/user/profile1";

interface ProfileProps {
  profileNFT?: NFT[];
  userProfile: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({
  profileNFT = profile1.nft,
  userProfile = profile1,
}) => {
  const [selectedNFT, setSelectedNFT] = useState<NFT | undefined>(
    profileNFT?.[0],
  );

  const handleNFTChange = (nftId: string) => {
    const newSelectedNFT = profileNFT?.find((nft) => nft.nftId === nftId);
    setSelectedNFT(newSelectedNFT);
  };

  // Create an array of length 6 filled with NFTs and placeholders
  const nftList = profileNFT
    ? new Array(6).fill(undefined).map((_, index) => profileNFT[index])
    : new Array(6).fill(undefined);

  return (
    <div className="absolute right-0 flex h-[90vh] w-[95vw] space-x-2 ">
      <div className="flex w-1/4 flex-col space-y-2">
        <UserProfileCard userProfile={userProfile} />
        <TravelGoshuinCollection userProfile={userProfile} />
      </div>
      <div className="flex w-3/4 flex-col justify-between rounded-s-xl bg-warmGrey px-8 pt-8">
        <div className="h-full w-full">
          <NFTInfo selectedNFT={selectedNFT} />
          <NFTSelection
            nftList={nftList}
            selectedNFT={selectedNFT}
            handleNFTChange={handleNFTChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
