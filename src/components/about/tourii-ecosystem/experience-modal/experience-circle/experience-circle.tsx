import type { ExperienceCircleProps } from "@/types/about-type";
import Image from "next/image";
import type React from "react";

const ExperienceCircle: React.FC<ExperienceCircleProps> = ({
	number,
	title,
	image,
}) => {
	return (
		<div className="flex h-48 w-48  flex-col items-center justify-center rounded-full">
			<Image
				src={image}
				alt={title}
				width={160}
				height={160}
				className="mx-auto"
			/>
			{/* <span className="font-tertiary text-3xl italic text-warmGrey3 ">
				{number}
			</span>
			<span className="px-9 pt-2 text-center text-base tracking-wider text-warmGrey3 ">
				{title}
			</span> */}
		</div>
	);
};

export default ExperienceCircle;
