import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AboutMenuProps {
  onClose: () => void;
}

const AboutMenu: React.FC<AboutMenuProps> = ({ onClose }) => {
  return (
    <div onMouseLeave={onClose} className="flex items-center justify-center">
      <Image
        src="/image/about/about-menu.svg"
        alt="menu"
        width={1000}
        height={1000}
      />
      <div className="absolute z-10 flex flex-col items-center justify-center space-y-11 text-center text-[10px] font-semibold leading-4 tracking-widest text-white">
        <Link href={"/"} className="uppercase transition-all hover:text-black">
          Who is Tourii
        </Link>
        <Link href={"/"} className="uppercase transition-all hover:text-black">
          Our Objectives
        </Link>
        <Link href={"/"} className="uppercase transition-all hover:text-black">
          Your Journey
        </Link>
        <Link href={"/"} className="uppercase transition-all hover:text-black">
          About Tourii NFT
        </Link>
        <Link href={"/"} className="uppercase transition-all hover:text-black">
          Meet Our Crew
        </Link>
      </div>
    </div>
  );
};

export default AboutMenu;
