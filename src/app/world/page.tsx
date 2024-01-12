import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "World",
};

const World: React.FC = () => {
  return (
    <div>
      <h1>World </h1>
      {/* Add your content here */}
    </div>
  );
};

export default World;
