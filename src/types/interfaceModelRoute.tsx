export interface ModelRouteSelection {
  areaId: string;
  areaName: string;
  image: string;
  isOpen: boolean;
  modelRoute: ModelRoute[] | undefined;
}

export interface ModelRoute {
  modelRouteId: string;
  placeName: string;
  modelRouteName: string;
  recommendation: string[];
  routeDestinations: RouteDestinations[] | undefined;
  routeDetails: RouteDetails[] | undefined;
}

export interface RouteDestinations {
  destinationId: string | undefined;
  routeDetailId: string | undefined;
  stopId: string | undefined; // stop 1
  destinationName: string | undefined; // Harajiri Falls
  destinationImage: string | undefined;
  modelRouteLink: string | undefined;
  destinationDescription: string | undefined;
}

export interface RouteDetails {
  routeDetailId: string;
  stop: string;
  routeDetailTime: string; // 9am
  routeDetailName: string; // Harajiri Falls
  routeDetailStoryTitle: string; // Harajiri Falls
  visualNovelLink: string; // Revisit the story
  modelRouteLink: string; // Model Route
  routeDetailBigImage: string;
  routeDetailSmallImage: {
    image1: string;
    image2: string;
    image3?: string;
  };
  routeDetailDescription: string; // description
  routeDetailLocation: string; // location
  routeDetailAddress: string; // address
  routeHashtag: string[]; // hashtag
}

//   // ModelRoutePage
//   3. ModelRouteCard.tsx
//       - IntroUpperSection.tsx
//   　- ModelRouteDescription.tsx
//     - ModelRouteCardImage.tsx
//       - 1. Image with iamge 1,2,undefined
//       - 2. Image with image 3
//       - 3. Image with image 1,2,empty string
//     - ModelRouteLocation.tsx
