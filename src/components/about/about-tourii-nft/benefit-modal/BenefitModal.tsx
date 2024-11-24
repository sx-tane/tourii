import { XMarkIcon } from "@heroicons/react/16/solid";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import BenefitDetail from "./BenefitDetail";
import {
	physicalExperienceData,
	virtualInteractionData,
} from "./benefit-circle/benefitData";

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: string;
}

const BenefitModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
	const [selectedBenefitId, setSelectedBenefitId] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % benefitType.length);
	};

	const handlePrevious = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + benefitType.length) % benefitType.length,
		);
	};

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
		data === "Virtual Interaction"
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
			className="h-20vh w-25vw absolute m-10 animate-fadeIn rounded-lg bg-charcoal md:m-0"
		>
			<h1 className="top-0 mx-10 mt-4 text-center text-xs font-bold uppercase tracking-widest text-warmGrey3 sm:text-base md:mx-0 md:mt-6">
				{data}
			</h1>
			{selectedBenefitId ? (
				<BenefitDetail number={selectedBenefitId} data={benefitType} />
			) : (
				<div>
					{/*Desktop & Laptop*/}
					<div className="hidden grid-cols-4 justify-center gap-10 p-10 align-middle  md:grid ">
						{benefitType.map((data) => (
							<div
								key={data.number}
								onClick={() => handleCircleClick(data.number)}
								className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-full border-[1px] border-warmGrey transition-all duration-300 hover:bg-circleHover"
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
					{/*Mobile*/}
					<div className="m-8 flex justify-between text-center align-middle md:hidden">
						<button onClick={handlePrevious}>
							<div className="h-3 w-3 sm:h-6 sm:w-6">
								<Image
									src="/image/about/left.svg"
									alt="left"
									width={60}
									height={60}
									priority={true}
								/>
							</div>
						</button>
						<div key={benefitType[currentIndex]?.number} className="m-3 sm:m-6">
							<div className="pb-3 text-xs text-warmGrey3 sm:text-sm">
								<span className=" font-bold uppercase tracking-widest">
									{benefitType[currentIndex]?.title}
								</span>
							</div>
							<span className="text-xs tracking-wide text-warmGrey3 sm:text-sm ">
								{benefitType[currentIndex]?.description}
							</span>
						</div>
						<button onClick={handleNext}>
							<div className="h-3 w-3 sm:h-6 sm:w-6">
								<Image
									src="/image/about/right.svg"
									alt="right"
									width={60}
									height={60}
									priority={true}
								/>
							</div>
						</button>
						<div className="flex justify-between pt-2 text-warmGrey3" />
					</div>
				</div>
			)}
			{selectedBenefitId ? (
				<ArrowUturnLeftIcon
					onClick={handleBack}
					className="absolute top-0 mt-6 hidden h-4 w-4 cursor-pointer text-warmGrey3 md:right-6 md:flex"
				/>
			) : (
				<XMarkIcon
					onClick={handleClose}
					className="absolute top-0 mt-6 hidden h-4 w-4 cursor-pointer text-warmGrey3 md:right-6 md:flex"
				/>
			)}
			{!selectedBenefitId && (
				<h1 className="my-6 hidden text-center text-base italic tracking-wider text-[#858581] md:flex md:flex-col">
					Click for more information
				</h1>
			)}
		</ReactModal>
	);
};

export default BenefitModal;
