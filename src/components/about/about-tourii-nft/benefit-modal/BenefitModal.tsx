import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { XMarkIcon } from "@heroicons/react/16/solid";
import {
  virtualInteractionData,
  physicalExperienceData,
} from "./benefit-circle/benefitData";
import BenefitDetail from "./BenefitDetail";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: string;
}

const BenefitModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const [selectedBenefitId, setSelectedBenefitId] = useState(0);

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

  const benefitType =
    data == "Virtual Interaction"
      ? virtualInteractionData
      : physicalExperienceData;

  const handleCircleClick = (benefitId: number) => {
    setSelectedBenefitId(benefitId);
  };

  const handleClose = () => {
    setSelectedBenefitId(0);
    onClose();
  };

  const handleBack = () => {
    setSelectedBenefitId(0);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
      overlayClassName="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center"
      // TODO: Fix the width and height of the modal so that it is always the same size
      className="h-50vh w-50vw absolute animate-fadeIn rounded-lg bg-charcoal"
    >
      <h1 className="text-2vw top-0 mt-6 text-center font-bold uppercase tracking-widest text-warmGrey3">
        {data}
      </h1>
      {selectedBenefitId ? (
        <BenefitDetail number={selectedBenefitId} data={benefitType} />
      ) : (
        // TODO: Fix the absolute positioning of the close button and the text, so that they are always in the same place
        <div className=" grid w-[1000px] grid-cols-4 justify-center gap-3 p-10  align-middle ">
          {benefitType.map((data) => (
            <div
              key={data.number}
              onClick={() => handleCircleClick(data.number)}
              className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-full border-[1px] border-warmGrey duration-200 hover:bg-circleHover"
            >
              <span className="font-tertiary text-3xl italic text-warmGrey3 ">
                {data.number}
              </span>
              <span className="px-9 pt-2 text-center text-base tracking-wider text-warmGrey3 ">
                {data.title}
              </span>
            </div>
          ))}
        </div>
      )}
      {selectedBenefitId ? (
        <ArrowUturnLeftIcon
          onClick={handleBack}
          className="absolute right-6 top-0 mt-6 h-4 w-4 cursor-pointer text-warmGrey3"
        />
      ) : (
        <XMarkIcon
          onClick={handleClose}
          className="absolute right-6 top-0 mt-6 h-4 w-4 cursor-pointer text-warmGrey3"
        />
      )}
      {!selectedBenefitId && (
        <h1 className="text-2vw my-6 text-center italic tracking-wider text-[#858581]">
          Click for more information
        </h1>
      )}
    </ReactModal>
  );
};

export default BenefitModal;
