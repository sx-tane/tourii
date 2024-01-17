"use client";

import Link from "next/link";
import Image from "next/image";
import HeaderListBlack from "./HeaderList";

const HeaderBlack: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-between py-4">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <Link href="/">
          <Image
            src="/image/header/logo.svg"
            alt="Logo"
            width={50}
            height={50}
            priority
          />
        </Link>
      </div>
      <HeaderListBlack />
    </div>
  );
};

export default HeaderBlack;
