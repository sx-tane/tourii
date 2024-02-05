import ModelRouteSelectionCard from "@/components/model-route/ModelRouteSelectionCard";
import { modelRouteSelectionData } from "@/lib/data/model-route/modelRouteSelectionData";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { type NextPage } from "next";

const ModelRoute: NextPage = () => {
  return (
    <div className="flex h-[90vh] items-center justify-center overflow-hidden py-20">
      <div className="grid grid-cols-2 gap-4">
        {modelRouteSelectionData?.map((modelRoute) => (
          <ModelRouteSelectionCard
            key={modelRoute.areaId}
            modelRouteSelection={modelRoute}
          />
        ))}
      </div>
    </div>
  );
};

export default withPageAuthRequired(ModelRoute);
