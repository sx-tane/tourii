import type { ExperienceCircleProps } from "@/types/about-type";
import type React from "react";

const ExperienceCircle: React.FC<ExperienceCircleProps> = ({
	number,
	title,
}) => {
	return (
		<div className="flex h-48 w-48  flex-col items-center justify-center rounded-full border-[1px] border-warmGrey">
			<span className="font-tertiary text-3xl italic text-warmGrey3 ">
				{number}
			</span>
			<span className="px-9 pt-2 text-center text-base tracking-wider text-warmGrey3 ">
				{title}
			</span>
		</div>
	);
};

export default ExperienceCircle;
