import React from "react";

const NotFound: React.FC = () => {
  return (
    <div
      className="mx-96 flex items-center justify-center sm:mx-10 md:mx-4"
      style={{ height: "calc(100vh - 77px)" }}
    >
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

export default NotFound;
