import React from "react";
import { type DescriptionProps } from "./descriptionData";
import ReactMarkdown from "react-markdown";

const Description: React.FC<DescriptionProps> = ({
  smallTitle,
  title,
  content,
}) => {
  return (
    <div className=" my-10 items-center text-center text-red">
      <div className="font-bold uppercase">
        <h3 className="text-5xl tracking-wide md:tracking-wide leading-normal md:text-base">{smallTitle}</h3>
        <h2 className="whitespace-break-spaces break-all text-5xl tracking-wide md:tracking-widest md:text-6xl">
          {title}
        </h2>
      </div>
      <div className="mt-8 whitespace-pre-line px-2 text-base font-medium">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Description;
