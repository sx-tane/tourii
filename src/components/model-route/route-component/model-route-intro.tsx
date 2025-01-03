import type { ModelRoute } from "@/types/model-route-type";
import type React from "react";

const ModelRouteIntro: React.FC<{ modelRoute: ModelRoute }> = ({
	modelRoute,
}) => {
	return (
		<div className="h-fit w-[95vw] rounded-bl-xl rounded-tl-xl bg-warmGrey py-8 text-center">
			<div className=" flex items-center justify-center  text-sm font-bold tracking-wider text-charcoal">
				<span className="mx-4">{modelRoute.placeName}</span>
				<div className="w-16  border-t-2 border-charcoal" />
				<span className="mx-4">MODEL ROUTE {modelRoute.modelRouteId}</span>
			</div>
			<div className=" mt-20 text-3xl font-bold uppercase tracking-wider">
				{modelRoute.modelRouteName}
			</div>
			<div className="mt-8 flex items-center justify-center px-96 text-sm font-bold tracking-wider text-charcoal">
				<div className="my-4 flex-grow  border-t-2 border-warmGrey3" />
			</div>
			<div className="font-bold tracking-wider text-red ">Recommended for</div>
			<div className=" mt-6 flex justify-center space-x-16">
				{modelRoute.recommendation.map((recommendation) => (
					<div
						key={recommendation}
						className="flex h-36 w-36 items-center justify-center rounded-full border bg-red p-2 text-sm font-medium capitalize tracking-wider text-warmGrey"
					>
						{recommendation}
					</div>
				))}
			</div>
		</div>
	);
};

export default ModelRouteIntro;
