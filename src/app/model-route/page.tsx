import ModelRouteSelectionCard from "@/components/model-route/ModelRouteSelectionCard";
import { modelRouteSelectionData } from "@/lib/data/model-route/modalRouteSelectionData";
import { type NextPage } from "next";

const ModelRoute: NextPage = () => {
  return (
    <div className="flex h-[90vh] items-center justify-center py-20">
      <div className="grid grid-cols-2 gap-4">
        {modelRouteSelectionData?.map((data) => (
          <ModelRouteSelectionCard key={data.id} modelRouteSelection={data} />
        ))}
      </div>
    </div>
  );
};

export default ModelRoute;
