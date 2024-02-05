"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import { DescriptionStory } from "@/components/about/Description";
import { routeDestinations1 } from "@/lib/data/model-route/modelRouteData1";
import { routeDestinations2 } from "@/lib/data/model-route/modelRouteData2";
import { routeDestinations3 } from "@/lib/data/model-route/modelRouteData3";
import { routeDestinations4 } from "@/lib/data/model-route/modelRouteData4";
import { type RouteDestinations } from "@/types/interfaceModelRoute";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
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
  const [modelRouteNumber, setModelRouteNumber] = useState<number>(1);
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
        let routeNumber = 1; // Default to "1"

        if (destinationNumber >= 1 && destinationNumber <= 8) {
          foundDestination = routeDestinations1.find(
            (p) => p.destinationId === params.destinationId,
          );
          routeNumber = 1;
        } else if (destinationNumber >= 9 && destinationNumber <= 14) {
          foundDestination = routeDestinations2.find(
            (p) => p.destinationId === params.destinationId,
          );
          routeNumber = 2;
        } else if (destinationNumber >= 15 && destinationNumber <= 21) {
          foundDestination = routeDestinations3.find(
            (p) => p.destinationId === params.destinationId,
          );
          routeNumber = 3;
        } else if (destinationNumber >= 22 && destinationNumber <= 31) {
          foundDestination = routeDestinations4.find(
            (p) => p.destinationId === params.destinationId,
          );
          routeNumber = 4;
        }

        setDestination(
          foundDestination
            ? {
                ...foundDestination,
              }
            : null,
        );
        setModelRouteNumber(routeNumber); // Set the model route number here
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
          <div className="my-auto h-[90vh] w-1/2 overflow-y-auto p-10">
            <DescriptionStory
              smallTitle={destination.stopId}
              title={destination.destinationName}
              content={destination.destinationDescription}
            />
            <Link
              href={`/model-route/${modelRouteNumber}`}
              className="mx-auto h-fit w-fit rounded-full border-[1.5px] border-red px-8 py-2 text-center font-medium uppercase tracking-widest text-red transition hover:bg-red hover:text-warmGrey md:flex"
            >
              CLOSE
            </Link>
          </div>

          <div className="w-1/2">
            <Image
              src={destination.destinationImage ?? ""}
              alt={destination.destinationName ?? ""}
              height={500}
              width={500}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default withPageAuthRequired(VisualNovelModelRoute);
