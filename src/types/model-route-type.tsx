// Core Route Details Interface
export interface RouteDetails {
	routeDetailId: string;
	stop: string;
	routeDetailTime: string;
	routeDetailName: string;
	routeDetailStoryTitle: string;
	routeDetailBigImage: string;
	routeDetailDescription: string;
	routeDetailLocation: string;
	routeDetailAddress: string;
	routeHashtag: string[];
	visualNovelLink: string;
	modelRouteLink: string;
	routeDetailSmallImage: {
		image1: string;
		image2: string | undefined;
		image3: string | undefined;
	};
}

// Route Destinations Interface
export interface RouteDestinations {
	destinationId: string;
	stopId: string;
	routeDetailId: string;
	destinationName: string;
	destinationImage: string;
	modelRouteLink: string;
	destinationDescription: string;
}

// Model Route Interface
export interface ModelRoute {
	modelRouteId: string;
	placeName: string;
	modelRouteName: string;
	recommendation: string[];
	routeDestinations: RouteDestinations[];
	routeDetails: RouteDetails[];
}

// Model Route Selection Interface
export interface ModelRouteSelection {
	areaId: string;
	areaName: string;
	image: string;
	isOpen: boolean;
	modelRoute: ModelRoute[] | undefined;
}

// Component Props Interfaces
export interface BottomSectionProps {
	routeDetails: RouteDetails;
}

export interface ModelRouteLocationProps {
	routeDetails: RouteDetails;
}

export interface ModelRouteCardImageProps {
	routeDetailsSmallImage: {
		image1: string;
		image2: string | undefined;
		image3: string | undefined;
	};
	imageName: string;
}