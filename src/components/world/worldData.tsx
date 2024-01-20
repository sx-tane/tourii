export type PlaceProps = {
  title?: string;
  smallTitle?: string;
  image?: string;
};

export const placeData: PlaceProps[] = [
  {
    title: "takamagahara",
    smallTitle: "Heavenly Plains",
    image: "/image/world/heaven.png",
  },
  {
    title: "yomitsukuni",
    smallTitle: "Land of the Dead",
    image: "/image/world/dead.png",
  },
];

export type BridgeProps = {
  japaneseTitle?: string;
  englishTitle?: string;
};

export const bridgeData: BridgeProps[] = [
  {
    japaneseTitle: "ame no ukihashi",
    englishTitle: "Heavenly Floating Bridge",
  },
  {
    japaneseTitle: "yomotsu hirasaka",
    englishTitle: "Wide Slope of Yomi",
  },
];

export type TitleProps = {
  smallTitle?: string;
  title?: string;
};

export const titleData: TitleProps[] = [
  {
    smallTitle: "an intro to the world of tourii",
    title: `the\ntouriiverse\ncosmology`,
  },
  { smallTitle: "unlocking heritage", title: "the\ntouriiverse\njourney" },
];

export type GoalProps = {
  image?: string;
  title?: string;
  description?: string;
};

export const goalData: GoalProps[] = [
  {
    image: "/image/world/culture.png",
    title: "cultural revival",
    description:
      "By delving into the ***Yao Yorozu no Kamigami***, the myriad of ancient gods hidden or dormant among the Bonjin, Touriiverse invites audiences to rediscover these ethereal beings. The narrative reintroduces these deities, once integral to Japan's mythological landscape but now largely forgotten, highlighting the rich tapestry of lore and legend that forms the backbone of Japan's cultural identity.",
  },
  {
    image: "/image/world/japan.png",
    title: "tourism discovery",
    description:
      "In traversing the roads less traveled within Japan, Touriiverse uncovers the secrets and stories of remote regions. These explorations are in line with Tourii's vision to bring the unique cultural nuances of ***Japan's diverse heritage*** to a global audience, fostering a deeper international appreciation and understanding of the country's vast cultural mosaic.",
  },
];

export type worldDescriptionProps = {
  description?: string;
};

export const worldData: worldDescriptionProps[] = [
  {
    description:
      "Embark on a journey to the Touriiverse, where timeless myths and today's Japan converge in a tapestry of fantasy. Explore three enchanted realms: the exalted ***Takagamahara*** above, the serene ***Ashihara no Nakatsukuni*** below, and the mysterious ***Yomitsukuni***, where spirits linger.\n\nVenture across the divine Ame No Ukihashi or tread along the shadowed Yomotsu Hirasaka, pathways to worlds unknown. In this land, Amatsukami, Kunitsukami, Bonjin, Yomitsukami and Yokai coexist, weaving stories of old into the fabric of the present.",
  },
  {
    description: "Touriiverse embody Tourii's two primary goals:",
  },
];
