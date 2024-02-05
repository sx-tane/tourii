export interface ProfileInfo {
  profileId: number;
  nickname: string;
  name: string;
  residingCity: string;
  dateOfBirth: string;
  email: string;
  travelGoshuin: TraveGoshuin[];
  nft: NFT[];
}

export interface TraveGoshuin {
  goshuinImage: string;
  goshuinId: number;
  goshuinName: string;
  goshuinLocation: string;
  goshuinDate: Date;
  goshuinExpiryDate: Date;
  goshuinDescription: string;
  redeemed: boolean;
}

export interface NFT {
  nftId: number;
  nftRarity: string;
  nftDescription: NFTDescription[];
  nftImage: string;
  nftHeldDate: Date;
  walletAddress: string;
}

export interface NFTDescription {
  nftName: string;
  nftHeldDate: Date;
  nftDescription: string;
}
