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
  japaneseTitle: string;
  englishTitle: string;
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
