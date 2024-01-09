import React from "react";
import Image from "next/image";

const MainImage: React.FC = () => {
  return (
    <div>
      <div className="h-full w-full rounded-full border-2 border-mustard p-[10px]">
        <div className="relative overflow-hidden rounded-full">
          <Image
            src="/image/homepage/tourii_main.png"
            alt="main art"
            width={800}
            height={800}
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MainImage;
