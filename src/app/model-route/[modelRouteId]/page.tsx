"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import { modelRouteData } from "@/lib/data/model-route/modalRouteSelectionData";
import ModelRouteIntro from "@/lib/data/model-route/route-component/ModelRouteIntro";
import { type ModelRoute } from "@/types/interfaceModelRoute";
import { type NextPage } from "next/types";
import { useState, useEffect } from "react";

type Props = {
  params: {
    modelRouteId: string;
  };
};

const Route: NextPage<Props> = ({ params }) => {
  const [modelRoute, setModelRoute] = useState<ModelRoute | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State to hold any errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const foundModelRoute = modelRouteData.find(
          (p) => p.modelRouteId === params.modelRouteId,
        );
        setModelRoute(
          foundModelRoute
            ? {
                ...foundModelRoute,
              }
            : null,
        );
      } catch (e) {
        setError("Failed to fetch model route data"); // Set the error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch((e) => setError(e.message)); // Catch any unhandled errors
  }, [params.modelRouteId]);

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

  if (!modelRoute) {
    return (
      <div>
        <NotFoundComponent />
      </div>
    );
  }

  return (
    <div className="mt-10 animate-fadeIn">
      <ModelRouteIntro
        modelRouteId={modelRoute.modelRouteId}
        placeName={modelRoute.placeName}
        modelRouteName={modelRoute.modelRouteName}
        recommendation={modelRoute.recommendation}
      />
    </div>
  );
};

export default Route;
