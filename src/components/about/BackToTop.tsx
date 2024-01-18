"use client";

import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const handleClick = (id: string) => (event: React.MouseEvent) => {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const BackToTop = () => {
  return (
    <div>
      <Link
        href="#top"
        className="mb-5 flex flex-col items-center justify-center pt-5 text-center font-medium italic text-warmGrey3 md:hidden"
        onClick={handleClick("#top")}
      >
        <ArrowUpCircleIcon className="mb-1 h-6 w-6" />
        Back to Top
      </Link>
    </div>
  );
};

export default BackToTop;
