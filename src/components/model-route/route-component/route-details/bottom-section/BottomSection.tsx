import { type RouteDetails } from "@/types/interfaceModelRoute";
import Markdown from "react-markdown";

interface BottomSectionProps {
  routeDetails: RouteDetails;
}

const BottomSection: React.FC<BottomSectionProps> = ({ routeDetails }) => {
  return (
    <div className="mx-auto mt-10 flex h-fit w-8/12 text-center font-medium">
      <Markdown className="w-1/2 whitespace-pre-line text-justify text-base leading-7 tracking-wider">
        {routeDetails.routeDetailDescription}
      </Markdown>
      <div className="w-1/2">TEST</div>
    </div>
  );
};

export default BottomSection;
