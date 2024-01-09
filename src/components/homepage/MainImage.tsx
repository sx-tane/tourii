import React from "react";
import Image from "next/image";

const MainImage: React.FC = () => {
  return (
    <div className="relative h-[49vw] w-[49vw] overflow-hidden rounded-full border-2 border-mustard p-[10px]">
      <div className="relative h-full w-full overflow-hidden rounded-full p-[10px]">
        <Image
          src="/image/homepage/tourii_main.png"
          alt="main art"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default MainImage;
