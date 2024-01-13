import React from "react";
import { TitleProps } from "../worldData";

const Title: React.FC<TitleProps> = ({ smallTitle, title }) => {
  return (
    <div className="my-10 items-center pt-10 text-center text-warmGrey3 ">
      <div className=" font-bold uppercase">
        <h3 className="mb-20 text-base uppercase tracking-widest">
          {smallTitle}
        </h3>
        <h2 className="mb-20 whitespace-pre-line break-all text-6xl uppercase tracking-widest">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Title;
