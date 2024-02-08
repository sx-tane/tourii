import {
  type UserProfile,
  type TravelGoshuin,
  type NFT,
  type NFTDescription,
} from "@/types/interfaceProfile";

let userId = 0;
let travelGoshuin = 0;

function generateUserId() {
  userId = userId + 1;
  return `userId${userId}`;
}

function generateGoshuinId() {
  travelGoshuin = travelGoshuin + 1;
  return `goshuinId${travelGoshuin}`;
}

export const nftDescription: NFTDescription[] = [
  {
    race: "Amatsukami",
    hairColor: "White",
    eyes: "Lightning",
    mouth: "Shocked",
    accessory: "Glasses",
    clothing: "Black & Gold Yukata",
    weapon: "None",
    background: "Lime Green",
  },
  {
    race: "Yokai",
    hairColor: "White",
    eyes: "Yellow",
    mouth: "None",
    accessory: "Oni Mask",
    clothing: "Skeloton Kimono",
    weapon: "Kanabō",
    background: "Sky Blue",
  },
  {
    race: "Kunitsukami",
    hairColor: "Blue",
    eyes: "Galaxy",
    mouth: "Smirk",
    accessory: "Hat",
    clothing: "Blue & White Yukata",
    weapon: "Green Spirit",
    background: "Crismson Red",
  },
];

export const profile1NFT: NFT[] = [
  {
    nftId: "0019",
    nftRarity: "0.2%",
    nftDescription: nftDescription[0],
    nftImage: "/image/profile/nft/19.png",
    nftHeldDate: "2023.12.16",
    walletAddress: "0x1E73a3536924CEb5b90c0f252F4c2A489f9c500E",
  },
  {
    nftId: "0100",
    nftRarity: "0.4%",
    nftDescription: nftDescription[1],
    nftImage: "/image/profile/nft/100.png",
    nftHeldDate: "2023.12.16",
    walletAddress: "0x1E73a3536924CEb5b90c0f252F4c2A489f9c500E",
  },
  {
    nftId: "0171",
    nftRarity: "1%",
    nftDescription: nftDescription[2],
    nftImage: "/image/profile/nft/171.png",
    nftHeldDate: "2023.12.16",
    walletAddress: "0x1E73a3536924CEb5b90c0f252F4c2A489f9c500E",
  },
];

export const profile1TravelGoshuin: TravelGoshuin[] = [
  {
    goshuinId: "0001",
    goshuinImage: "/image/profile/goshuin/Goshuin1.svg",
    goshuinName: "Lodge Kiyokawa Shiitake Hunting",
    goshuinLocation: "Tokyo, Japan",
    goshuinDate: "2 Feb 2022",
    goshuinExpiryDate: "2 Feb 2023",
    goshuinRedeemDate: "",
    goshuinDescription:
      "Outdoor sauna using a Finnish-style tent sauna. After the sauna, jump into the Okutake River right in front of you to cool down.",
    perksImage: "/image/profile/goshuin/perks/perks1.jpg",
    redeemed: false,
  },
  {
    goshuinId: "0002",
    goshuinImage: "/image/profile/goshuin/Goshuin2.svg",
    goshuinName: "Harajiri Falls Boat Experience",
    goshuinLocation: "Tokyo, Japan",
    goshuinDate: "2 Feb 2022",
    goshuinExpiryDate: "2 Feb 2023",
    goshuinRedeemDate: "",
    goshuinDescription:
      "Powerful boat experience where you can get splashed directly under the waterfall. You can also enjoy the scenery of the Harajiri Falls from the boat.",
    perksImage: "/image/profile/goshuin/perks/perks2.jpg",
    redeemed: false,
  },
  {
    goshuinId: "0003",
    goshuinImage: "/image/profile/goshuin/Goshuin3.svg",
    goshuinName: "Tea Flavoured Boar Meat",
    goshuinLocation: "Tokyo, Japan",
    goshuinDate: "2 Feb 2022",
    goshuinExpiryDate: "2 Feb 2023",
    goshuinRedeemDate: "",
    goshuinDescription: `The local game meat, captured and processed by two sisters who are hunters, is simmered and seasoned with locally produced tea to create "紅茶いのしし" (Tea-Flavored Wild Boar). This product is available for sale at places like "Michi-no-Eki Asaji" and "Michi-no-Eki Oono" and has become quite popular.`,
    perksImage: "/image/profile/goshuin/perks/perks3.jpg",
    redeemed: false,
  },
];

export const profile1: UserProfile = {
  userId: generateUserId(),
  profileImage: "/image/profile/nft/19.png",
  userName: "Test User 01",
  name: "Test User 01",
  residingCity: "Tokyo, Japan",
  dateOfBirth: "2 Feb 2022",
  email: "test01@tanejp.com",
  travelGoshuin: profile1TravelGoshuin,
  nft: profile1NFT,
};
