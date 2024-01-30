export interface ModelRouteSelection {
  areaId: string;
  areaName: string;
  image: string;
  isOpen: boolean;
  modelRoute: ModelRoute[];
}

export interface ModelRoute {
  modelRouteId: string;
  modelRouteName: string;
  recommendation: string[]; // receommendation for people
  isOpen: boolean;
  routeDestinations: RouteDestinations[];
  routeDetails: RouteDetails[];
}

export interface RouteDestinations {
  destinationId: string; //stop 1
  destinationName: string; // Harajiri Falls
  destinationImage: string;
  visualNovelLink: string;
}

export interface RouteDetails {
  routeDetailId: string; // stop 1
  routeDetailTime: string; // 9am
  routeDetailName: string; // Harajiri Falls
  visualNovelLink: string; // Revisit the story
  routeDetailBigImage: string; // image
  routeDetailSmallImage: {
    image1: string;
    image2: string;
    image3?: string;
  }; // image
  routeDetailDescription: string; // description
  routeDetailLocation: string; // location
  routeDetailAddress: string; // address
  routeHashtag: string[]; // hashtag
}

//   // component
//   // ModelRouteSelectionPage
//   1. ModelRouteSelectionCard.tsx

//   // ModelRoutePage
//   1. ModelRouteIntro.tsx
//       - IntroUpperSection.tsx
//       - Recommandation.tsx
//   2. RouteDestination.tsx
//   3. ModelRouteCard.tsx
//       - IntroUpperSection.tsx
//   　- ModelRouteDescription.tsx
//       - ModelRouteCardImage.tsx
//     - ModelRouteLocation.tsx
