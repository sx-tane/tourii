import Image from "next/image";
import React from "react";

const Divider: React.FC = () => {
  return (
    <div>
      {
        <div className="w-screen ">
          <Image
            src="/image/about/double-line.svg"
            alt="divider"
            width={3000}
            height={3000}
            className="absolute z-10"
          />
        </div>
      }
    </div>
  );
};

export default Divider;
