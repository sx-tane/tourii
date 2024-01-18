import React from "react";
import Image from "next/image";

const Line: React.FC = () => {
  return (
    <div className="my-8 w-full md:my-10">
      <Image
        className="object-contain"
        src="/image/about/line.svg"
        alt="line"
        layout="responsive"
        width={800}
        height={800}
        priority={true}
      />
    </div>
  );
};

export default Line;
