import Section from "@/components/world/place/Section";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "World",
};

const World: React.FC = () => {
  return (
    <div>
      <Section />
    </div>
  );
};

export default World;
