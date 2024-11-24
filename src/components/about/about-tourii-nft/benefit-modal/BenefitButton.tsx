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
		<div>
			{/*Desktop & Laptop*/}
			<div className="mt-5 flex flex-col items-center justify-center space-y-5 align-middle text-xs font-bold text-red md:text-sm lg:flex-row lg:space-x-5 lg:space-y-0">
				<button
					type="button"
					className="w-11/12 rounded-full border-[1px] border-red bg-transparent px-4 py-4 uppercase tracking-widest transition-all hover:bg-red hover:text-white lg:w-11/12"
					onClick={() => openModal("Virtual Interaction")}
				>
					Virtual Interaction
				</button>
				<button
					type="button"
					className="w-11/12 rounded-full border-[1px] border-red bg-transparent px-4 py-4 uppercase tracking-widest transition-all hover:bg-red hover:text-white lg:w-11/12"
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
		</div>
	);
};

export default BenefitButton;
