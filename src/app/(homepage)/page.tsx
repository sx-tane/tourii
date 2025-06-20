import Headline from "@/components/homepage/headline";
import MainImage from "@/components/homepage/main-image";
import NFTEmblem from "@/components/homepage/nft-emblem";
import type { NextPage } from "next";
import Image from "next/image";


const HomePage: NextPage = () => {
	return (
		<div>
			{/* Hero Section */}
			<div className="relative min-h-screen">
				{/*Desktop and Laptop Size*/}
				<div className="hidden w-full items-end overflow-hidden lg:flex animate-fadeIn">
					<div className="fixed -bottom-5 left-6 z-20 transition-transform duration-300 hover:scale-105">
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
							<Headline />
						</div>
						<Image
							src="/image/homepage/tourii_main.png"
							alt="main art"
							width={1000}
							height={1000}
							className="z-10 h-[65vh] w-full object-cover "
						/>

						<div className="z-20 lg:hidden">
							<NFTEmblem />
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};

export default HomePage;
