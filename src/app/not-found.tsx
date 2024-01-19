import Header from "@/components/header/header-white/Header";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="mx-6 max-h-screen animate-fadeIn overflow-hidden">
      <Header />
      <div
        className="mx-4 flex items-center justify-center lg:mx-96"
        style={{ height: "calc(100vh - 77px)" }}
      >
        <div>
          <div className="text-left">
            <h1 className="py-5 text-4xl font-extrabold tracking-widest text-red md:text-6xl">
              NOT FOUND
            </h1>
            <h2 className="text-base font-bold uppercase tracking-wider text-charcoal md:text-lg">
              Ninigi got lost in the middle of nowhere. <br />
              The street sign suggests heading back where he came from.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
