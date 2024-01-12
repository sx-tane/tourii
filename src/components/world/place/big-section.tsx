import React from "react";
import Image from "next/image";

const BigSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20 text-warmGrey">
      <h2 className="mb-3 text-center text-2xl font-bold tracking-widest">
        ASHIHARA NO NAKATSUKUNI
      </h2>
      <div className="relative h-[380px] w-10/12">
        <div
          className="relative overflow-hidden rounded-full border-2 border-warmGrey"
          style={{ paddingBottom: "40%" }}
        >
          <p className="absolute left-1/2 top-7 z-10 -translate-x-1/2 -translate-y-1/2 transform text-center text-lg font-medium italic tracking-wide text-black">
            Central Earth Japan
          </p>

          <Image
            src="/image/world/earth.png"
            alt="Ashihara-no-Nakatsukuni"
            quality={100}
            className="h-full w-full object-cover"
            fill={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BigSection;
