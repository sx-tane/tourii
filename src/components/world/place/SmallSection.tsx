import Image from "next/image";
import type React from "react";
import type { PlaceProps } from "../worldData";

const SmallSection: React.FC<PlaceProps> = ({ title, smallTitle, image }) => {
	return (
		<div>
			<div className="flex flex-col items-center justify-center text-warmGrey3">
				<h2 className="mb-1 text-center text-[8px] font-bold uppercase tracking-widest sm:text-xs md:text-base xl:text-lg 2xl:text-xl">
					{title}
				</h2>
				<div className="w-[65vw] lg:w-[40vw] xl:w-[50vw]">
					<div
						className="relative overflow-hidden rounded-full border-2 border-warmGrey3"
						style={{ paddingBottom: "35%" }}
					>
						<div className="absolute left-1/2 top-4 z-10 hidden -translate-x-1/2 -translate-y-1/2 transform text-center font-semibold italic tracking-wide text-black sm:flex sm:text-xs md:text-sm 2xl:text-lg">
							{smallTitle}
						</div>
						<Image
							src={image ?? ""}
							alt={title ?? ""}
							quality={100}
							className="h-full w-full object-cover"
							fill={true}
							priority={true}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SmallSection;
