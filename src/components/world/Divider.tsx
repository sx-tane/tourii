import Image from "next/image";
import React from "react";

const DividerWhite: React.FC = () => {
  return (
    <div>
      {
        <div className="z-60 absolute left-0 w-full items-center justify-center">
          <Image
            src="/image/world/double-line.svg"
            alt="divider"
            width={10000}
            height={3000}
            className="h-3 object-cover"
          />
        </div>
      }
    </div>
  );
};

export default DividerWhite;
