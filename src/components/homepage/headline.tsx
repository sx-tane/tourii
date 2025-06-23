"use client";
import {
	downToUpVariants,
	upToDownVariants,
} from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const Headline: React.FC = () => {
	return (
		<div>
			<AnimatePresence>
				<motion.div
					key="image-content"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={downToUpVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					<div className="hidden lg:flex lg:flex-col">
						<div className="mb-2 text-left font-bold  text-black md:text-base lg:text-lg xl:text-2xl 2xl:leading-normal">
							Unveiling Japan's mystical realms <br /> through narrative
							storytelling
							<br /> & Web 3.0 tourism.
						</div>
						<Image
							src="/image/homepage/tourii.svg"
							alt="tourii"
							width={700}
							height={700}
							className="mt-5 h-full w-full"
							priority
						/>
					</div>
				</motion.div>
				{/*Tablet and Phone Size*/}
				<motion.div
					key="image-content-mobile"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={upToDownVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					<div className="mb-4 pr-20 sm:mb-10 sm:pr-64">
						<div className="flex flex-col lg:hidden">
							<div className="text-left text-sm font-semibold leading-normal text-black sm:text-xl">
								Unveiling Japan's mystical realms through narrative storytelling
								& Web 3.0 tourism.
							</div>
						</div>
					</div>
					<Image
						src="/image/homepage/tourii.svg"
						alt="tourii"
						width={500}
						height={600}
						className="relative w-[55%] object-cover sm:w-5/12 lg:hidden"
						priority
					/>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default Headline;
