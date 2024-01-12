import React from "react";
import Image from "next/image";

const MainImage: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-full border-[1.5px] border-mustard p-[10px]">
      <Image
        src="/image/homepage/tourii_main.png"
        alt="main art"
        width={700}
        height={700}
        className="relative h-full w-full overflow-hidden rounded-full"
      />
    </div>
  );
};

export default MainImage;
