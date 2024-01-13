import React from "react";
import Image from "next/image";

const BigSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center  text-warmGrey">
      <h2 className="mb-1 text-center text-[1vw] font-bold uppercase tracking-widest">
        ashihara no nakatsukuni
      </h2>
      <div className="relative w-[50vw]">
        <div
          className="relative overflow-hidden rounded-full border-2 border-warmGrey"
          style={{ paddingBottom: "35%" }}
        >
          <p className="absolute left-1/2 top-4 z-10 -translate-x-1/2 -translate-y-1/2 transform text-center text-[0.95vw] font-semibold italic tracking-wide text-black">
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
