import {
	downToUpVariants,
	modalVariants,
} from "@/lib/animation/variants-settings";
import type { ModalProps } from "@/types/about-type";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import {
	offChainExperienceData,
	onChainExperienceData,
} from "../../../../lib/data/about/experience-data";
import ExperienceDetail from "./experience-detail";

const ExperienceModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
	const [selectedBenefitId, setSelectedBenefitId] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % experienceType.length);
	};

	const handlePrevious = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + experienceType.length) % experienceType.length,
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

	const experienceType =
		data === "Offchain Experience"
			? offChainExperienceData
			: onChainExperienceData;

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
		<div>
			<AnimatePresence>
				<motion.div
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={modalVariants}
					transition={{ duration: 0.3 }}
				>
					<ReactModal
						isOpen={isOpen}
						onRequestClose={handleClose}
						ariaHideApp={false}
						overlayClassName="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center"
						className="h-20vh w-25vw absolute m-10 animate-fadeIn rounded-lg bg-charcoal lg:m-0"
					>
						<h1 className="top-0 mx-10 mt-4 text-center text-xs font-bold uppercase tracking-widest text-warmGrey3 sm:text-base lg:mx-0 lg:mt-6">
							{data}
						</h1>
						{selectedBenefitId ? (
							<ExperienceDetail
								number={selectedBenefitId}
								data={experienceType}
							/>
						) : (
							<div>
								{/*Desktop & Laptop*/}
								<div className="hidden lg:grid-cols-3 xl:grid-cols-6 justify-center gap-10 p-10 align-middle lg:grid ">
									{experienceType.map((data, index) => (
										<motion.div
											key={data.image}
											variants={downToUpVariants}
											initial="hidden"
											animate="visible"
											transition={{
												duration: 0.8,
												delay: index * 0.2,
												ease: [0, 0.71, 0.2, 1.01],
											}}
										>
											<div
												key={data.number}
												onClick={() => handleCircleClick(data.number)}
												onKeyUp={(e) =>
													e.key === "Enter" && handleCircleClick(data.number)
												}
												className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-full border-[1px] border-warmGrey transition-all duration-300 hover:bg-circleHover"
											>
												<span className="font-tertiary text-3xl italic text-warmGrey3 ">
													{data.number}
												</span>
												<span className="px-9 pt-2 text-center text-base tracking-wider text-warmGrey3 ">
													{data.title}
												</span>
											</div>
										</motion.div>
									))}
								</div>
								{/*Mobile*/}
								<div className="m-10 flex justify-between text-center align-middle lg:hidden">
									<button type="button" onClick={handlePrevious}>
										<div className="h-3 w-3 sm:h-6 sm:w-6">
											<Image
												src="/image/about/left.svg"
												alt="left"
												width={60}
												height={60}
												priority
											/>
										</div>
									</button>
									<div
										key={experienceType[currentIndex]?.number}
										className="sm:m-6 animate-fadeIn"
									>
										<div className="pb-3 text-xs text-warmGrey3 sm:text-sm">
											<Image
												src={experienceType[currentIndex]?.image ?? ""}
												alt={experienceType[currentIndex]?.title ?? ""}
												width={200}
												height={200}
												priority
												className="mb-5 mx-auto"
											/>
											<span className=" font-bold uppercase tracking-widest">
												{experienceType[currentIndex]?.title}
											</span>
										</div>
										<span className="text-xs tracking-wide text-warmGrey3 sm:text-sm ">
											{experienceType[currentIndex]?.description}
										</span>
									</div>
									<button type="button" onClick={handleNext}>
										<div className="h-3 w-3 sm:h-6 sm:w-6">
											<Image
												src="/image/about/right.svg"
												alt="right"
												width={60}
												height={60}
												priority
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
							<h1 className="my-6 hidden text-center text-base italic tracking-wider text-[#858581] lg:flex lg:flex-col">
								Click for more information
							</h1>
						)}
					</ReactModal>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default ExperienceModal;
