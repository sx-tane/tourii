import React from "react";
import { type TitleProps } from "../worldData";

const Title: React.FC<TitleProps> = ({ smallTitle, title }) => {
  return (
    <div className="my-10 items-center pt-5 text-center text-warmGrey3 md:pt-10 ">
      <div className=" font-bold uppercase">
        <h3 className="mb-10 text-xs uppercase tracking-widest md:mb-20 md:text-base">
          {smallTitle}
        </h3>
        <h2 className="whitespace-break-spaces break-all text-3xl leading-snug tracking-wide sm:text-5xl md:mb-20 md:text-6xl md:tracking-widest">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Title;
