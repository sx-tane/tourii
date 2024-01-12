"use client";

import React, { useEffect, useState } from "react";
import { type BenefitCircleProps } from "./benefit-circle/benefitData";
import BenefitCircle from "./benefit-circle/BenefitCircle";
import Image from "next/image";

interface BenefitDetailProps {
  number: number;
  data: BenefitCircleProps[];
}

const BenefitDetail: React.FC<BenefitDetailProps> = ({ number, data }) => {
  const [currentNumber, setCurrentNumber] = useState(number);

  const benefitData = data.find((item) => item.number === currentNumber);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentNumber]);

  const handleNext = () => {
    if (currentNumber < data.length) {
      setCurrentNumber(currentNumber + 1);
    } else {
      setCurrentNumber(1);
    }
  };

  const handlePrevious = () => {
    if (currentNumber > 1) {
      setCurrentNumber(currentNumber - 1);
    } else {
      setCurrentNumber(data.length);
    }
  };

  return (
    <div className="w-[900px] items-center justify-center overflow-auto p-10 duration-200">
      {benefitData ? (
        <div className="flex items-center">
          <button onClick={handlePrevious} className="flex-shrink-0">
            <Image
              src="/image/about/left.svg"
              alt="left"
              width={20}
              height={20}
            />
          </button>
          <div className="mx-5">
            <BenefitCircle
              number={benefitData.number}
              title={benefitData.title}
            />
          </div>
          <button onClick={handleNext} className="flex-shrink-0">
            <Image
              src="/image/about/right.svg"
              alt="right"
              width={20}
              height={20}
            />
          </button>
          <span className="ml-10 text-pretty text-base leading-relaxed tracking-wider text-warmGrey3">
            {benefitData.description}
          </span>
        </div>
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default BenefitDetail;
