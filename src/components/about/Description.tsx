import React from "react";
import { DescriptionProps } from "./descriptionData";

const Description: React.FC<DescriptionProps> = ({
  smallTitle,
  title,
  content,
}) => {
  return (
    <div className=" my-10 items-center  text-center text-red sm:w-10/12 md:w-8/12">
      <div className="font-bold uppercase">
        <h3 className="text-base tracking-wide">{smallTitle}</h3>
        <h2 className="text-6xl tracking-widest">{title}</h2>
      </div>
      <p className="mt-8 whitespace-pre-line text-base font-semibold">
        {content}
      </p>
    </div>
  );
};

export default Description;
