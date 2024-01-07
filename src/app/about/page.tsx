import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About",
};

const About: React.FC = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>Welcome to the About page!</p>
    </div>
  );
};

export default About;
