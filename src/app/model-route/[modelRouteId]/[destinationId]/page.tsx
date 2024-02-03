"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import { routeDestinations1 } from "@/lib/data/model-route/modelRouteData1";
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
  const [error, setError] = useState<string | null>(null); // State to hold any errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const foundDestination = routeDestinations1.find(
          (p) => p.destinationId === params.destinationId,
        );
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
