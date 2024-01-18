"use client";

import Link from "next/link";
import Image from "next/image";
import HeaderListBlack from "./HeaderList";
import HamburgerBlack from "./Hamburger";

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
            priority={true}
          />
        </Link>
      </div>
      <div className="hidden md:flex">
        <HeaderListBlack />
      </div>
      <div className="md:hidden">
        <HamburgerBlack />
      </div>
    </div>
  );
};

export default HeaderBlack;
