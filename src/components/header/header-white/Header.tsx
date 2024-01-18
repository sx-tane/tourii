"use client";

import Link from "next/link";
import Image from "next/image";
import HeaderList from "./HeaderList";
import Hamburger from "./Hamburger";

const Header: React.FC = () => {
  return (
    <div className="z-10 flex w-full items-center justify-between py-4 md:mx-0">
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
        <HeaderList />
      </div>
      <div className="md:hidden">
        <Hamburger />
      </div>
    </div>
  );
};

export default Header;
