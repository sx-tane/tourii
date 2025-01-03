"use client";
import Image from "next/image";
import type React from "react";
import { useState } from "react";

const BigSection: React.FC = () => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className="flex flex-col items-center justify-center text-warmGrey3">
			<h2 className="mb-1 text-center text-[8px] font-bold uppercase tracking-widest sm:text-xs md:text-base xl:text-xl">
				ashihara no nakatsukuni
			</h2>
			<div
				className="w-[80vw] lg:w-[55vw] xl:w-[45vw]"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div
					className="relative overflow-hidden rounded-full border-2 border-warmGrey3"
					style={{ paddingBottom: "35%" }}
				>
					<div className="absolute left-1/2 top-4 z-10 hidden -translate-x-1/2 -translate-y-1/2 transform text-center font-semibold italic tracking-wide text-black sm:flex sm:text-xs md:text-sm 2xl:text-lg">
						Central Earth Japan
					</div>
					<div
						className="absolute inset-0 transition-opacity duration-500"
						style={{
							width: "100%",
							height: "100%",
						}}
					>
						<video
							src="/video/touriiverse/Earth.mp4"
							className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
								isHovered ? "opacity-100" : "opacity-0"
							}`}
							autoPlay
							loop
							muted
						/>
						<Image
							src="/image/world/Earth.png"
							alt="Ashihara-no-Nakatsukuni"
							quality={100}
							className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
								isHovered ? "opacity-0" : "opacity-100"
							}`}
							fill={true}
							priority={true}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BigSection;
