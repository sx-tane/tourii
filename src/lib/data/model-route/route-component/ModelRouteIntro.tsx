import React from "react";

interface ModelRouteIntroProps {
  modelRouteId: string;
  placeName: string;
  modelRouteName: string;
  recommendation: string[];
}

const ModelRouteIntro: React.FC<ModelRouteIntroProps> = ({
  modelRouteId,
  placeName,
  modelRouteName,
  recommendation,
}) => {
  return (
    <div className="absolute right-0 h-fit w-[95vw] rounded-bl-xl rounded-tl-xl bg-warmGrey text-center">
      <div className="mt-8 flex items-center justify-center px-[630px] text-sm font-bold tracking-wider text-charcoal">
        <span className="mx-4">{placeName}</span>
        <div className="flex-grow  border-t-2 border-charcoal" />
        <span className="mx-4">MODEL ROUTES {modelRouteId}</span>
      </div>
      <div className=" mt-20 text-3xl font-bold uppercase tracking-wider">
        {modelRouteName}
      </div>
      <div className="mt-8 flex items-center justify-center px-96 text-sm font-bold tracking-wider text-charcoal">
        <div className="my-4 flex-grow  border-t-2 border-warmGrey3" />
      </div>
      <div className="font-bold tracking-wider text-red ">Recommended for</div>
      <div className="mb-8 mt-6 flex justify-center space-x-16">
        {recommendation.map((recommendation) => (
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
