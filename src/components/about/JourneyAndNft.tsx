"use client";

import React, { useState } from "react";
import Description from "./Description";
import Line from "./Line";
import { descriptionData } from "./descriptionData";
import BenefitModal from "./about-tourii-nft/benefit-modal/BenefitModal";

const JourneyAndNft: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="my-10 flex h-full w-9/12 flex-col items-center bg-warmGrey3">
      <div className="my-5 flex flex-col items-center">
        <Line />
        <div id="your-journey" className="-mt-5 flex flex-col items-center">
          <Description {...descriptionData[2]} />
        </div>
        <div id="about-tourii-nft" className=" mt-5 flex flex-col items-center">
          <Description {...descriptionData[3]} />
          <button onClick={openModal}>Open Modal</button>
        </div>
        <BenefitModal isOpen={isModalOpen} onClose={closeModal} />
        <Line />
      </div>
    </div>
  );
};

export default JourneyAndNft;
