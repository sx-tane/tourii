import { type RouteDestinations } from "@/types/interfaceModelRoute";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RouteDestinationProps {
  routeDestination: RouteDestinations[];
}

const RouteDestination: React.FC<RouteDestinationProps> = ({
  routeDestination,
}) => {
  return (
    <div className="h-fit w-[95vw] rounded-bl-xl rounded-tl-xl bg-warmGrey2 py-8 text-center">
      <span className="mx-4 text-sm font-bold capitalize tracking-wider text-charcoal">
        route destinations
      </span>
      <div className="mt-10 flex items-center justify-center text-[10px] font-semibold uppercase tracking-wider text-charcoal">
        {routeDestination.map((destination, index) => (
          <div
            key={destination.destinationId}
            className="flex flex-col items-center"
          >
            {destination.stopId}
            <div className="relative z-10 mt-2 flex items-center justify-center">
              <Link
                href={`model-route/${destination.destinationId}`}
                className="z-20"
              >
                <Image
                  src={destination.destinationImage ?? ""}
                  alt="destination"
                  width={300}
                  height={300}
                  priority={true}
                  className="z-20 mx-8 h-32 w-32 cursor-pointer rounded-full border-2 border-charcoal object-cover transition-all duration-300 hover:scale-110"
                />
              </Link>

              {index !== routeDestination.length - 1 && (
                <div className="absolute left-10 top-1/2 z-10 h-0.5 w-full translate-y-1/2 bg-charcoal" />
              )}
            </div>
            <div className="my-4 h-12 w-32 px-2 py-1 text-center text-xs uppercase tracking-wider">
              {destination.destinationName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteDestination;
