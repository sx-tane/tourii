import React from "react";
import Image from "next/image";

const Headline: React.FC = () => {
  return (
    <div>
      <div className="text-left text-xl font-bold text-black">
        Unveiling Japan's mystical realms <br /> through narrative storytelling{" "}
        <br /> & Web 3.0 tourism.
      </div>
      <Image
        src="/image/homepage/tourii.svg"
        alt="tourii"
        width={480}
        height={480}
        className="mt-10"
      />
    </div>
  );
};

export default Headline;
