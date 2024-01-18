import React from "react";
import Image from "next/image";

const MainImage: React.FC = () => {
  return (
    <div className="fixed bottom-10 right-16 w-[41%] overflow-hidden rounded-full border-[1.5px] border-mustard p-2  ">
      <Image
        src="/image/homepage/tourii_main.png"
        alt="main art"
        layout="responsive"
        width={700}
        height={700}
        quality={100}
        className="rounded-full object-cover"
        priority={true}
      />
    </div>
  );
};

export default MainImage;
