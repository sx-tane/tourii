import { type RouteDetails } from "@/types/interfaceModelRoute";
import Markdown from "react-markdown";
import ModelRouteCardImage from "./ModelRouteCardImage";
import ModelRouteLocation from "./ModelRouteLocation";

interface BottomSectionProps {
  routeDetails: RouteDetails;
}

const BottomSection: React.FC<BottomSectionProps> = ({ routeDetails }) => {
  return (
    <div className="mx-auto my-20 flex h-fit w-8/12 space-x-10 text-center font-medium">
      <div className="w-1/2 space-y-20 text-left">
        <Markdown className="whitespace-pre-line text-justify text-base leading-7 tracking-wider">
          {routeDetails.routeDetailDescription}
        </Markdown>
        <ModelRouteLocation routeDetails={routeDetails} />
      </div>
      <ModelRouteCardImage
        routeDetailsSmallImage={{
          image1: routeDetails.routeDetailSmallImage.image1,
          image2: routeDetails.routeDetailSmallImage.image2,
          image3: routeDetails.routeDetailSmallImage.image3,
        }}
        imageName={routeDetails.routeDetailName}
      />
    </div>
  );
};

export default BottomSection;
