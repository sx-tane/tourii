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
			{benefitData ? (
				<div className="flex items-center">
					<button
						type="button"
						onClick={handlePrevious}
						className="flex-shrink-0"
					>
						<Image
							src="/image/about/left.svg"
							alt="left"
							width={20}
							height={20}
							priority={true}
						/>
					</button>
					<div className="mx-5">
						<ExperienceCircle
							number={benefitData.number}
							title={benefitData.title}
						/>
					</div>
					<button type="button" onClick={handleNext} className="flex-shrink-0">
						<Image
							src="/image/about/right.svg"
							alt="right"
							width={20}
							height={20}
							priority={true}
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

export default ExperienceDetail;
