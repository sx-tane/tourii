"use client";
import Header from "@/components/header/Header";
import React from "react";

const Error: React.FC = () => {
  return (
    <div className="mx-6 max-h-screen animate-fadeIn overflow-hidden">
      <Header />
      <div>
        <div className="text-left">
          <h1 className="py-5 text-6xl font-extrabold tracking-widest text-red">
            404 ERROR
          </h1>
          <h2 className="text-lg font-bold uppercase tracking-wider text-charcoal">
            Ninigi got lost in the middle of nowhere. <br />
            The street sign suggests heading back where he came from.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Error;
