import BigSection from "@/components/world/place/big-section";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "World",
};

const World: React.FC = () => {
  return (
    <div>
      <h1>World </h1>
      <BigSection />
    </div>
  );
};

export default World;
