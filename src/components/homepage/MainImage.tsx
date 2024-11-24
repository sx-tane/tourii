import Image from "next/image";
import type React from "react";

const MainImage: React.FC = () => {
	return (
		<div className=" rounded-full border-[1.5px] border-mustard p-2">
			<Image
				src="/image/homepage/tourii_main.png"
				alt="main art"
				width={700}
				height={700}
				quality={100}
				className="z-20 h-full w-full rounded-full object-cover"
				priority={true}
			/>
		</div>
	);
};

export default MainImage;
