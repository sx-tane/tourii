import Headline from "@/components/homepage/headline";
import MainImage from "@/components/homepage/main-image";
import NFTEmblem from "@/components/homepage/nft-emblem";
import type { NextPage } from "next";
import Image from "next/image";
import type React from "react";

const HomePage: NextPage = () => {
	return (
		<div>
			{/*Desktop and Laptop Size*/}
			<div className="hidden w-full items-end overflow-hidden lg:flex animate-fadeIn">
				<div className="fixed bottom-6 left-6 z-20  transition-transform duration-300 hover:scale-105">
					<Headline />
				</div>

				<div className="fixed bottom-5 md:right-2 md:w-[75vh] lg:right-8 lg:w-[85vh] xl:right-8">
					<MainImage />
				</div>

				<div className="fixed z-30 md:-bottom-8 md:-right-6 xl:-bottom-10 xl:-right-6 2xl:-bottom-10 2xl:-right-4">
					<NFTEmblem />
				</div>
			</div>
			<div className="h-full overflow-hidden lg:hidden">
				<div className="absolute bottom-0 top-[20%] -mx-6 w-full overflow-hidden">
					<div className="mx-6 mb-5">
						<div className="mb-4 pr-20 sm:mb-10 sm:pr-64">
							<Headline />
						</div>
						<Image
							src="/image/homepage/tourii.svg"
							alt="tourii"
							width={500}
							height={600}
							className="relative w-[55%] object-cover sm:w-5/12"
							priority
						/>
					</div>
					<video
						autoPlay
						loop
						muted
						playsInline
						width={1000}
						height={1000}
						className="z-10 h-[65vh] w-full object-cover "
					>
						<source src="/video/Tourii.mp4" type="video/mp4" />
					</video>
					<div className="z-20 lg:hidden">
						<NFTEmblem />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
