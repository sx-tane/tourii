import React from "react";
import { type DescriptionProps } from "./descriptionData";
import ReactMarkdown from "react-markdown";
import Line from "./divider-line/Line";

const Description: React.FC<DescriptionProps> = ({
  smallTitle,
  title,
  content,
}) => {
  return (
    <div className="my-10 items-center text-center text-red">
      <div className="font-bold uppercase">
        <h3 className="text-3xl leading-normal tracking-wide md:text-base md:tracking-wide">
          {smallTitle}
        </h3>
        <h2 className="whitespace-break-spaces break-all text-3xl tracking-wide md:text-6xl md:tracking-widest">
          {title}
        </h2>
      </div>
      <div className="mt-8 whitespace-pre-line px-2 text-sm font-medium md:text-base">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Description;

export const DescriptionStory: React.FC<DescriptionProps> = ({
  smallTitle,
  title,
  content,
}) => {
  return (
    <div className="my-10 items-center text-center text-red">
      <div className="font-bold uppercase">
        <h3 className="text-3xl leading-normal tracking-wide md:text-base md:tracking-wide">
          {smallTitle}
        </h3>
        <h2 className="mt-5 whitespace-break-spaces break-all text-lg tracking-wide md:text-2xl md:tracking-widest">
          {title}
        </h2>
        <div className="-my-2">
          <Line />
        </div>
      </div>
      <div className="mt-8 whitespace-pre-line px-2 text-xs font-medium md:text-sm">
        <ReactMarkdown className="leading-normal">{content}</ReactMarkdown>
      </div>
    </div>
  );
};
