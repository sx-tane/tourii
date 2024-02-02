"use client";

import Header from "@/components/header/header-white/Header";
import React from "react";
import Image from "next/image";

const Error: React.FC = () => {
  return (
    <div className="max-h-screen animate-fadeIn overflow-hidden px-6">
      <Header />
      <div
        className="mx-4 flex flex-col items-center justify-center text-center xl:mx-96"
        style={{ height: "calc(100vh - 77px)" }}
      >
        <Image
          src={"/image/other/mirror.png"}
          width={600}
          height={600}
          alt={"404"}
          className="h-32 w-32 animate-spin md:h-48 md:w-48 xl:h-60 xl:w-60"
          priority={true}
        />
        <h1 className="py-5 text-4xl font-extrabold tracking-widest text-red md:text-6xl">
          404 ERROR
        </h1>
        <h2 className="text-center text-base font-bold uppercase tracking-wider text-charcoal md:text-lg">
          Ninigi's mirror appears to have been left behind in this place.
        </h2>
      </div>
    </div>
  );
};

export default Error;

export function ErrorComponent() {
  return (
    <div className="animate-fadeIn overflow-hidden px-6 lg:h-[90vh]">
      <div
        className="mx-4 flex flex-col items-center justify-center text-center xl:mx-96"
        style={{ height: "calc(100vh - 77px)" }}
      >
        <Image
          src={"/image/other/mirror.png"}
          width={600}
          height={600}
          alt={"404"}
          className="h-32 w-32 animate-spin md:h-48 md:w-48 xl:h-60 xl:w-60"
          priority={true}
        />
        <h1 className="py-5 text-4xl font-extrabold tracking-widest text-red md:text-6xl">
          404 ERROR
        </h1>
        <h2 className="text-center text-base font-bold uppercase tracking-wider text-charcoal md:text-lg">
          Ninigi's mirror appears to have been left behind in this place.
        </h2>
      </div>
    </div>
  );
}
