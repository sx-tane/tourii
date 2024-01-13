import React from "react";
import Image from "next/image";

const MainImage: React.FC = () => {
  return (
    <div className="right-18 fixed bottom-4">
      <div className="relative h-full sm:w-[47vw] sm:max-w-[330px] md:w-[47vw] md:max-w-[420px] lg:w-[47vw] lg:max-w-[850px] xl:w-[47vw] xl:max-w-[850px] 2xl:w-[48vw]">
        <div className="overflow-hidden rounded-full border-[1.5px] border-mustard p-[10px]">
          <Image
            src="/image/homepage/tourii_main.png"
            alt="main art"
            layout="responsive"
            width={700}
            height={700}
            quality={100}
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MainImage;
