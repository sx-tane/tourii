import type { RouteDetails } from "@/types/interfaceModelRoute";

interface ModelRouteLocationProps {
	routeDetails: RouteDetails;
}

const ModelRouteLocation: React.FC<ModelRouteLocationProps> = ({
	routeDetails,
}) => {
	return (
		<div>
			<div className="text-[10px] uppercase tracking-widest text-charcoal">
				Location
			</div>
			<div className="mt-4 text-sm font-bold uppercase tracking-widest">
				{routeDetails.routeDetailLocation}
			</div>
			<div className="mt-1 text-sm font-medium italic tracking-wider underline">
				{routeDetails.routeDetailAddress}
			</div>
			<div className="mt-4 text-xs tracking-widest text-charcoal">
				{routeDetails.routeHashtag}
			</div>
		</div>
	);
};

export default ModelRouteLocation;
