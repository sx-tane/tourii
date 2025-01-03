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
	goshuinRedeemDate: string;
	goshuinDescription: string;
	perksImage: string;
	redeemed: boolean;
}

export interface GoshuinGridProps {
	goshuin: TravelGoshuin[];
	selectedGoshuin: TravelGoshuin | undefined;
	handleGoshuinChange: (goshuinId: string) => void;
}

export interface TravelGoshuinReservation {
	gohsuinId: string;
	reservationDate: string;
	reservationTime: string;
	name: string;
	email: string;
	contactNumber: string;
	reservationStatus: string;
}

export interface RedeemDialogProps {
	goshuinId: string | undefined;
	goshuinName: string | undefined;
	goshuinRedeemDate: string | undefined;
	onRedeemSuccess: () => void;
}

export interface NFT {
	nftId: string;
	nftRarity: string;
	nftDescription: NFTDescription | undefined;
	nftImage: string;
	nftHeldDate: string;
	walletAddress: string;
}

export interface NFTSelectionProps {
	nftList: NFT[];
	selectedNFT: NFT | undefined; // Allow for undefined
	handleNFTChange: (nftId: string) => void;
}

export interface NFTDescription {
	race: string;
	hairColor: string;
	eyes: string;
	mouth: string;
	accessory: string;
	clothing: string;
	weapon: string;
	background: string;
}

export interface ProfileList {
	profile: UserProfile[];
}
