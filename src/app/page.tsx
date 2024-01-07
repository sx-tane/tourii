import Headline from "@/components/homepage/Headline";
import NFTEmblem from "@/components/homepage/NFTEmblem";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Next.js homepage!</h1>
      <Headline />
      <NFTEmblem />
    </div>
  );
};

export default HomePage;
