"use client";
import { useState } from "react";
import BenefitModal from "./BenefitModal";

const BenefitButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const openModal = (data: string) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="mt-5 flex justify-center space-x-5 text-sm font-bold text-red sm:w-10/12 md:flex md:w-8/12 ">
      <button
        className="rounded-full border-[1px] border-red  bg-transparent px-24 py-4 uppercase tracking-widest transition-all hover:bg-red hover:text-white"
        onClick={() => openModal("Virtual Interaction")}
      >
        Virtual Interaction
      </button>
      <button
        className="rounded-full border-[1px] border-red  bg-transparent px-24 py-4 uppercase tracking-widest transition-all hover:bg-red hover:text-white"
        onClick={() => openModal("Physical Exploration")}
      >
        Physical Exploration
      </button>
      <BenefitModal
        data={modalData}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default BenefitButton;
