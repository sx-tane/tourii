import React, { useEffect } from "react";
import ReactModal from "react-modal";
import BenefitCircleList from "./benefit-circle/BenefitCircleList";
import { XMarkIcon } from "@heroicons/react/16/solid";
import {
  virtualInteractionData,
  physicalExperienceData,
} from "./benefit-circle/benefitData";
import BenefitCircle from "./benefit-circle/BenefitCircle";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: string;
}

const BenefitModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }

    return () => {
      document.body.style.overflowY = "unset";
    };
  }, [isOpen]);

  const circleData =
    data == "Virtual Interaction"
      ? virtualInteractionData
      : physicalExperienceData;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      overlayClassName="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center"
      className="h-50vh w-50vw absolute animate-fadeIn rounded-lg bg-charcoal"
    >
      <h1 className="text-2vw top-0 mt-6 text-center font-bold uppercase tracking-widest text-warmGrey3">
        {data}
      </h1>
      <div className="m-10 flex justify-center space-x-10">
        {circleData.map((data, index) => (
          <BenefitCircle
            key={index}
            number={data.number}
            title={data.title}
            description={data.description}
          />
        ))}
      </div>
      <XMarkIcon
        onClick={onClose}
        className="absolute right-6 top-0 mt-6 h-4 w-4 cursor-pointer text-warmGrey3"
      />
      <h1 className="text-2vw my-6 text-center italic tracking-wider text-[#858581]">
        Click for more information
      </h1>
    </ReactModal>
  );
};

export default BenefitModal;
