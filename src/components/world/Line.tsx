import React from "react";
import Image from "next/image";

const WhiteLine: React.FC = () => {
  return (
    <div className="w-full">
      <Image
        className="object-contain"
        src="/image/world/line.svg"
        alt="line"
        layout="responsive"
        width={800}
        height={800}
      />
    </div>
  );
};

export default WhiteLine;
