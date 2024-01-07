import React from "react";
import { BenefitCircleProps } from "./benefitData";

const BenefitCircle: React.FC<BenefitCircleProps> = ({ number, title }) => {
  return (
    <div className="hover:bg-circleHover flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-full border-[1px] border-warmGrey duration-200">
      <span className="font-tertiary text-3xl italic text-warmGrey3 ">
        {number}
      </span>
      <span className="px-9 pt-2 text-center text-base tracking-wider text-warmGrey3 ">
        {title}
      </span>
    </div>
  );
};

export default BenefitCircle;
