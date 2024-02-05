export interface UserProfile {
  userId: string;
  profileImage: string;
  userName: string;
  name: string;
  residingCity: string;
  dateOfBirth: string;
  email: string;
  travelGoshuin: TravelGoshuin[] | undefined;
  nft: NFT[] | undefined;
}

export interface TravelGoshuin {
  goshuinId: string;
  goshuinImage: string;
  goshuinName: string;
  goshuinLocation: string;
  goshuinDate: string;
  goshuinExpiryDate: string;
  goshuinDescription: string;
  redeemed: boolean;
}

export interface NFT {
  nftId: string;
  nftRarity: string;
  nftDescription: NFTDescription[];
  nftImage: string;
  nftHeldDate: string;
  walletAddress: string;
}

export interface NFTDescription {
  nftName: string;
  nftHeldDate: string;
  nftDescription: string;
}
