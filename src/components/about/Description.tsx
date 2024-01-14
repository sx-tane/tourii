import React from "react";
import { DescriptionProps } from "./descriptionData";

const Description: React.FC<DescriptionProps> = ({
  smallTitle,
  title,
  content,
}) => {
  return (
    <div className=" my-10 w-7/12 items-center  text-center text-red">
      <div className="font-bold uppercase">
        <h3 className="text-base tracking-wide">{smallTitle}</h3>
        <h2 className="whitespace-break-spaces break-all text-6xl tracking-widest">
          {title}
        </h2>
      </div>
      <p className="mt-8 whitespace-pre-line px-2 text-base font-semibold">
        {content}
      </p>
    </div>
  );
};

export default Description;
