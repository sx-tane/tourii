"use client";
import type { ExperienceDetailProps } from "@/types/about-type";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import ExperienceCircle from "./experience-circle/experience-circle";

const ExperienceDetail: React.FC<ExperienceDetailProps> = ({
	number,
	data,
}) => {
	const [currentNumber, setCurrentNumber] = useState(number);

	const experienceData = data.find((item) => item.number === currentNumber);

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
	}, []);

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
		<div className="w-[900px] animate-fadeIn items-center justify-center overflow-auto p-10">
			{experienceData ? (
				<div className="flex items-center animate-fadeIn">
					<button
						type="button"
						onClick={handlePrevious}
						className="flex-shrink-0 animate-fadeIn"
					>
						<Image
							src="/image/about/left.svg"
							alt="left"
							width={20}
							height={20}
							priority
						/>
					</button>
					<div className="mx-5 animate-fadeIn">
						<ExperienceCircle
							number={experienceData.number}
							title={experienceData.title}
							image={experienceData.image}
						/>
					</div>
					<button
						type="button"
						onClick={handleNext}
						className="flex-shrink-0 animate-fadeIn"
					>
						<Image
							src="/image/about/right.svg"
							alt="right"
							width={20}
							height={20}
							priority
						/>
					</button>
					<div className="ml-10 flex flex-col text-warmGrey3 animate-fadeIn">
						<span className="mb-3 font-semibold italic uppercase tracking-widest">
							{experienceData.number}. {experienceData.title}
						</span>
						<span className="text-base leading-relaxed tracking-wider animate-fadeIn">
							{experienceData.description}
						</span>
					</div>
				</div>
			) : (
				<div>No data found</div>
			)}
		</div>
	);
};

export default ExperienceDetail;
