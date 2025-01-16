import Image from "next/image";
import type React from "react";

const AboutImage: React.FC = () => {
	return (
		<div className="z-80 my-10 md:overflow-hidden md:rounded-full">
			<div className="-mx-6 md:mx-auto">
				<Image
					src="/image/about/about-image.png"
					alt="main art"
					width={1200}
					height={1200}
					priority
				/>
			</div>
		</div>
	);
};

export default AboutImage;
