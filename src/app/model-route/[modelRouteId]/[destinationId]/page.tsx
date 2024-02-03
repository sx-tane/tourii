"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import { routeDestinations1 } from "@/lib/data/model-route/modelRouteData1";
import { routeDestinations2 } from "@/lib/data/model-route/modelRouteData2";
import { routeDestinations3 } from "@/lib/data/model-route/modelRouteData3";
import { routeDestinations4 } from "@/lib/data/model-route/modelRouteData4";
import { type RouteDestinations } from "@/types/interfaceModelRoute";
import Image from "next/image";
import { useState, useEffect } from "react";

type Props = {
  params: {
    destinationId: string;
  };
};

const VisualNovelModelRoute: React.FC<Props> = ({ params }) => {
  const [destination, setDestination] = useState<RouteDestinations | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const destinationNumber = parseInt(
          params.destinationId.replace("destination", ""),
        );

        let foundDestination;
        if (destinationNumber >= 1 && destinationNumber <= 8) {
          foundDestination = routeDestinations1.find(
            (p) => p.destinationId === params.destinationId,
          );
        } else if (destinationNumber >= 9 && destinationNumber <= 14) {
          foundDestination = routeDestinations2.find(
            (p) => p.destinationId === params.destinationId,
          );
        } else if (destinationNumber >= 15 && destinationNumber <= 21) {
          foundDestination = routeDestinations3.find(
            (p) => p.destinationId === params.destinationId,
          );
        } else if (destinationNumber >= 22 && destinationNumber <= 31) {
          foundDestination = routeDestinations4.find(
            (p) => p.destinationId === params.destinationId,
          );
        }

        setDestination(
          foundDestination
            ? {
                ...foundDestination,
              }
            : null,
        );
      } catch (e) {
        setError("Failed to fetch destination data"); // Set the error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch((e) => setError(e.message)); // Catch any unhandled errors
  }, [params.destinationId]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorComponent />
      </div>
    );
  }

  if (!destination) {
    return (
      <div>
        <NotFoundComponent />
      </div>
    );
  }

  return (
    <div className="absolute right-0 h-[90vh] w-[87vw] animate-fadeIn rounded-bl-xl rounded-tl-xl bg-warmGrey text-charcoal">
      {destination.modelRouteLink ? (
        <iframe
          src={destination.modelRouteLink}
          title={destination.destinationName}
          className="absolute left-0 top-0 h-full w-full rounded-bl-xl rounded-tl-xl"
        />
      ) : (
        <div className="flex h-full w-full justify-between overflow-hidden rounded-bl-xl rounded-tl-xl">
          <Image
            src={destination.destinationImage ?? ""}
            alt={destination.destinationName ?? ""}
            height={500}
            width={500}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default VisualNovelModelRoute;
