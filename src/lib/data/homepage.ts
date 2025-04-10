export interface HomepageSection {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export const homepageSections: HomepageSection[] = [
  {
    title: "Explore",
    subtitle: "Discover Interactive Stories",
    description:
      "Transform destinations into engaging narratives, creating an interactive journey that seamlessly connects locations to user advancement.",
    image: "/image/explore-screen.jpg",
  },
  {
    title: "Earn",
    subtitle: "Collect Unified Rewards",
    description:
      "Gain rewards for your travel check-ins, quests, and community challenges across regions.",
    image: "/image/earn-screen.jpg",
  },
  {
    title: "Connect",
    subtitle: "Meet Fellow Adventurers",
    description:
      "Follow travelers, share experiences, and explore curated storylines from others around the world.",
    image: "/image/connect-screen.jpg",
  },
];

export const defaultImage = "/image/default-image.jpg"; 