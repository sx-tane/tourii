import {
  type ModelRoute,
  type ModelRouteSelection,
} from "@/types/interfaceModelRoute";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ModelRouteSelectionCardProps {
  modelRouteSelection: ModelRouteSelection;
}

const ModelRouteSelectionCard: React.FC<ModelRouteSelectionCardProps> = ({
  modelRouteSelection,
}) => {
  return (
    <div>
      {modelRouteSelection.isOpen ? (
        <div className="flex h-[80vh] w-[22vw] animate-fadeIn flex-col justify-between rounded-xl bg-warmGrey text-charcoal">
          <div className="mt-5 p-4 text-center text-2xl font-bold tracking-widest">
            {modelRouteSelection.areaName}
          </div>
          <Image
            src={modelRouteSelection?.image ?? ""}
            alt={modelRouteSelection?.areaName ?? ""}
            width={200}
            height={200}
            priority={true}
            className="mx-12 h-[40vh] w-auto items-center  rounded-full  object-cover"
          />
          <div>
            <div className="flex items-center justify-center">
              <div className="flex-grow border-t-[1.5px] border-charcoal" />
              <span className="mx-4 text-xs font-semibold tracking-wider text-charcoal">
                MODEL ROUTES
              </span>
              <div className="flex-grow border-t-[1.5px] border-charcoal" />
            </div>
            <div className="flex justify-center space-x-2 py-8">
              {modelRouteSelection.modelRoute?.map((route: ModelRoute) => (
                <Link
                  href={`/model-route/${route.modelRouteId}`}
                  key={route.modelRouteId}
                  className="cursor-pointer rounded-full border-[1.5px] border-charcoal px-8 py-2 text-base font-semibold tracking-widest transition-all hover:bg-charcoal hover:text-warmGrey"
                >
                  {route.modelRouteId}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[80vh] w-[20vw] flex-col items-center justify-center rounded-xl bg-warmGrey3 text-xl font-medium italic tracking-widest text-warmGrey">
          Coming soon
        </div>
      )}
    </div>
  );
};

export default ModelRouteSelectionCard;
