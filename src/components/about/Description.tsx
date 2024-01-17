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
        <h3 className="text-base tracking-wide">{smallTitle}</h3>
        <h2 className="whitespace-break-spaces break-all text-6xl tracking-widest">
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
