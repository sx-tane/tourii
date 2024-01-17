import React from "react";
import Description from "./Description";
import Line from "./divider-line/Line";
import { descriptionData } from "./descriptionData";
import BenefitButton from "./about-tourii-nft/benefit-modal/BenefitButton";

const JourneyAndNft: React.FC = () => {
  return (
    <div className="items-center justify-center px-2 lg:px-24">
      <div className="w-full">
        <Line />
      </div>
      <div id="your-journey" className="-mt-5 ">
        <Description {...descriptionData[2]} />
      </div>
      <div id="about-tourii-nft" className="">
        <Description {...descriptionData[3]} />
        <BenefitButton />
      </div>
      <div className="mt-5 w-full">
        <Line />
      </div>
    </div>
  );
};

export default JourneyAndNft;
