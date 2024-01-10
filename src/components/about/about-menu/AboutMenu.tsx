import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AboutMenuProps {
  onClose: () => void;
}

const AboutMenu: React.FC<AboutMenuProps> = ({ onClose }) => {
  const handleClick = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div onMouseLeave={onClose} className="flex items-center justify-center">
      <Image
        src="/image/about/about-menu.svg"
        alt="menu"
        width={1000}
        height={1000}
      />
      <div className="absolute z-10 flex flex-col items-center justify-center space-y-11 text-center text-[10px] font-semibold leading-4 tracking-widest text-white">
        <Link
          href={"#who-is-tourii"}
          onClick={handleClick("who-is-tourii")}
          className="uppercase transition-all hover:text-black"
        >
          Who is Tourii
        </Link>
        <Link
          href={"#our-objectives"}
          onClick={handleClick("our-objectives")}
          className="uppercase transition-all hover:text-black"
        >
          Our Objectives
        </Link>
        <Link
          href={"#your-journey"}
          onClick={handleClick("your-journey")}
          className="uppercase transition-all hover:text-black"
        >
          Your Journey
        </Link>
        <Link
          href={"#about-tourii-nft"}
          onClick={handleClick("about-tourii-nft")}
          className="uppercase transition-all hover:text-black"
        >
          {" "}
          About Tourii NFT
        </Link>
        <Link
          href={"#meet-our-crew"}
          onClick={handleClick("meet-our-crew")}
          className="uppercase transition-all hover:text-black"
        >
          Meet Our Crew
        </Link>
      </div>
    </div>
  );
};

export default AboutMenu;
