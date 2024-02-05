import { type UserProfile, type TravelGoshuin } from "@/types/interfaceProfile";

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

export const profile1TravelGoshuin: TravelGoshuin[] = [
  {
    goshuinId: generateGoshuinId(),
    goshuinImage: "/image/profile/goshuin/Goshuin1.svg",
    goshuinName: "Lodge Kiyokawa Shiitake Hunting",
    goshuinLocation: "Tokyo, Japan",
    goshuinDate: "2 Feb 2022",
    goshuinExpiryDate: "2 Feb 2023",
    goshuinDescription: "This is a test goshuin",
    redeemed: false,
  },
  {
    goshuinId: generateGoshuinId(),
    goshuinImage: "/image/profile/goshuin/Goshuin2.svg",
    goshuinName: "Restaurant Fujiso Lunch Set",
    goshuinLocation: "Tokyo, Japan",
    goshuinDate: "2 Feb 2022",
    goshuinExpiryDate: "2 Feb 2023",
    goshuinDescription: "This is a test goshuin",
    redeemed: false,
  },
  {
    goshuinId: generateGoshuinId(),
    goshuinImage: "/image/profile/goshuin/Goshuin3.svg",
    goshuinName: "Tane Shrine",
    goshuinLocation: "Tokyo, Japan",
    goshuinDate: "2 Feb 2022",
    goshuinExpiryDate: "2 Feb 2023",
    goshuinDescription: "This is a test goshuin",
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
  nft: undefined,
};
