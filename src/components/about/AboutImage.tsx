import React from "react";
import Image from "next/image";

const AboutImage: React.FC = () => {
  return (
    <div className="mb-10 overflow-hidden rounded-full">
      <Image
        src="/image/about/about-image.png"
        alt="main art"
        layout="responsive"
        width={1000}
        height={1000}
      />
    </div>
  );
};

export default AboutImage;
