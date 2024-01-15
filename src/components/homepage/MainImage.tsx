import React from "react";
import Image from "next/image";

const MainImage: React.FC = () => {
  return (
    <div className="right-18 fixed bottom-4">
      <div className="relative h-auto sm:w-[47vw]  md:w-[47vw] lg:w-[47vw] xl:w-[47vw] 2xl:w-[48vw]">
        <div className="overflow-hidden rounded-full border-[1.5px] border-mustard p-[10px]">
          <Image
            src="/image/homepage/tourii_main.png"
            alt="main art"
            layout="responsive"
            width={700}
            height={700}
            quality={100}
            className="rounded-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default MainImage;
