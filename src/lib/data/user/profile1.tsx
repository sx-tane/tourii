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
    goshuinLocation: "Lodge Kiyokawa, Bungo Ono",
    goshuinDate: "2 Feb 2022",
    goshuinExpiryDate: "2 Feb 2023",
    goshuinRedeemDate: "",
    goshuinDescription:
      "Enjoy a special discount on your stay at Lodge Kiyokawa, nestled in the picturesque landscapes of Bungo Ono, where adventure meets relaxation with our Shiitake hunting and Finnish-style tent sauna experience. Upon booking, this coupon grants you access to exclusive perks, enhancing your immersive journey into nature. The coupon is valid for use within the promotional period stated and cannot be combined with other offers. In the event of cancellation, the promotional value is forfeited. ",
    perksImage: "/image/profile/goshuin/perks/perks1.jpg",
    redeemed: false,
  },
  {
    goshuinId: "0002",
    goshuinImage: "/image/profile/goshuin/Goshuin2.svg",
    goshuinName: "Harajiri Falls Boat Experience",
    goshuinLocation: "Harajiri Fall, Bungo Ono",
    goshuinDate: "2 Feb 2022",
    goshuinExpiryDate: "2 Feb 2023",
    goshuinRedeemDate: "",
    goshuinDescription:
      "Dive into the heart of Bungo Ono with the Harajiri Falls Boat Experience, a thrilling escapade that brings you face-to-face with the majestic splendor of Harajiri Falls. Feel the exhilarating rush of the waterfall's spray as you glide beneath its powerful cascade, an intimate encounter with nature's raw beauty. From your vantage point on the boat, the panoramic views of the falls offer a serene contrast, showcasing the picturesque landscape that defines the area. This experience is not just a journey; it's an immersion into the vibrant heart of nature. The coupon is valid for use within the promotional period stated and cannot be combined with other offers. In the event of cancellation, the promotional value is forfeited. ",
    perksImage: "/image/profile/goshuin/perks/perks2.jpg",
    redeemed: false,
  },
  {
    goshuinId: "0003",
    goshuinImage: "/image/profile/goshuin/Goshuin3.svg",
    goshuinName: "Tea Flavoured Boar Meat",
    goshuinLocation: "Bungo Ono",
    goshuinDate: "2 Feb 2022",
    goshuinExpiryDate: "2 Feb 2023",
    goshuinRedeemDate: "",
    goshuinDescription: `Discover the unique culinary delight of \"紅茶いのしし\" (Tea-Flavored Wild Boar) in Bungo Ono, a local delicacy that marries the robust flavors of game meat with the refined, aromatic notes of locally produced tea. This innovative dish is the brainchild of two skilled sisters, hunters who expertly capture and process the wild boar, then masterfully simmer it with tea to create a flavor profile that is both bold and nuanced. Available at popular destinations such as \"Michi-no-Eki Asaji\" and \"Michi-no-Eki Oono,\" Tea-Flavored Wild Boar has captured the hearts and palates of locals and visitors alike, making it a must-try for those seeking to explore the depth of regional Japanese cuisine. This dish not only offers a taste of Bungo Ono's rich culinary heritage but also highlights the local commitment to sustainable and innovative food practices.`,
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
