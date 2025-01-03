"use client";

import TravelGoshuinCollection from "@/components/profile/goshuin/travel-goshuin-collection";
import NFTInfo from "@/components/profile/nft/nft-info";
import NFTSelection from "@/components/profile/nft/nft-selector";
import UserProfileCard from "@/components/profile/user-profile-card";
import { profile1 } from "@/lib/data/user/profile-1";
import type { NFT, UserProfile } from "@/types/profile-type"; // Import your types
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import type { NextPage } from "next";
import { useState } from "react";

// interface ProfileProps {
//   userProfile: UserProfile;
// }

const Profile: NextPage = () => {
	const userProfile: UserProfile = profile1;
	const profileNFT = userProfile.nft;

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
		<div className="absolute right-0 flex h-[90vh] w-[95vw] animate-fadeIn space-x-2">
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

export default withPageAuthRequired(Profile);
