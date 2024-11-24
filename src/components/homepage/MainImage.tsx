import Image from "next/image";
import Link from "next/link";
import type React from "react";

const MainImage: React.FC = () => {
	return (
		<div className="rounded-full border-[1.5px] border-mustard p-3 transition-transform duration-300 hover:scale-105">
			<Link href="https://www.youtube.com/@TouriiJP">
				<Image
					src="/image/homepage/tourii_main.png"
					alt="main art"
					width={700}
					height={700}
					quality={100}
					className="z-20 h-full w-full rounded-full object-cover"
					priority={true}
				/>
			</Link>
		</div>
	);
};

export default MainImage;
