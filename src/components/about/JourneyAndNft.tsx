import React from "react";
import Description from "./Description";
import Line from "./Line";
import { descriptionData } from "./descriptionData";
import BenefitButton from "./about-tourii-nft/benefit-modal/BenefitButton";

const JourneyAndNft: React.FC = () => {
  return (
    <div className="my-10 flex h-full w-9/12 flex-col items-center bg-warmGrey3">
      <div className="my-5 flex flex-col items-center">
        <div className="w-9/12">
          <Line />
        </div>
        <div id="your-journey" className="-mt-5 flex flex-col items-center">
          <Description {...descriptionData[2]} />
        </div>
        <div id="about-tourii-nft" className=" mt-5 flex flex-col items-center">
          <Description {...descriptionData[3]} />
          <BenefitButton />
        </div>
        <div className="mt-5 w-9/12">
          <Line />
        </div>
      </div>
    </div>
  );
};

export default JourneyAndNft;
