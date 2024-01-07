import React from "react";
import Image from "next/image";

const AboutImage: React.FC = () => {
  return (
    <div className="mb-10 w-10/12 overflow-hidden rounded-full">
      <Image
        src="/image/about/about-image.png"
        alt="main art"
        layout="responsive"
        width={800}
        height={800}
      />
    </div>
  );
};

export default AboutImage;
