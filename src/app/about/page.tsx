import AboutCoin from "@/components/about/AboutCoin";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About",
};

const About: React.FC = () => {
  return (
    <div>
      <div className="flex justify-end">
        <AboutCoin />
      </div>
    </div>
  );
};

export default About;
