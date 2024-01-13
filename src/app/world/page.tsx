import BigSection from "@/components/world/place/big-section";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "World",
};

const World: React.FC = () => {
  return (
    <div>
      <BigSection />
    </div>
  );
};

export default World;
