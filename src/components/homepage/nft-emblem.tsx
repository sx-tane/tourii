"use client";
import {
	downToUpVariants,
	downToUpVariantsMobile,
} from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type React from "react";

const NFTEmblem: React.FC = () => {
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
					{/* Desktop & Laptop */}
					<div className="hidden items-center justify-center lg:flex">
						<div className="absolute z-20 flex flex-col items-center justify-center bg-transparent text-center text-black">
							{/* <div className="font-secondary text-xl leading-8 tracking-tighter md:text-3xl xl:text-4xl 2xl:text-5xl">
						Tourii
					</div> */}
							<div className="mb-5 text-[8px] font-bold uppercase leading-tight tracking-wider md:text-[10px] xl:text-[12px] 2xl:text-[14px]">
								Chapter 1
							</div>
							{/* <hr className=" my-3 w-9 border-t-[1.4px] border-black md:mb-1 md:w-5 xl:w-7 2xl:mb-3 2xl:w-9" /> */}
							<div className="text-lg font-semibold leading-tight lg:text-xl xl:text-2xl 2xl:text-2xl">
								BUNGO
								<br />
								ONO
								<br />
							</div>
							{/* <hr className=" my-2 w-9 border-t-[1.4px] border-black md:my-2 md:w-5 xl:my-2 xl:w-7 2xl:my-2 2xl:w-9" /> */}
							<div className="mt-5 text-[8px] font-bold uppercase leading-tight tracking-wider md:text-[10px] xl:text-[12px] 2xl:text-[14px]">
								Jan 2025
							</div>
						</div>
						<Image
							src="/image/homepage/emblem.svg"
							alt="Emblem"
							width={280}
							height={300}
							className="w-full md:h-[240px] lg:h-[260px] xl:h-[280px] 2xl:h-[340px]"
							priority
						/>
					</div>
				</motion.div>
				{/* Tablet & Mobile */}
				<motion.div
					key="image-content-mobile"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={downToUpVariantsMobile}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					<div className="lg:hidden">
						<div className="absolute bottom-9 right-9 z-40  flex flex-col items-center justify-center bg-transparent text-center text-black">
							{/* <div className="mb-1 w-4 border-t-[1.4px] border-black" /> */}
							{/* <div className="font-secondary text-2xl tracking-tighter">7777</div> */}
							<div className="mb-3 text-[9px] font-bold uppercase leading-tight tracking-wider">
								{/* coming in
						<br /> */}
								Chapter 1
							</div>
							{/* <div className="my-1 w-4 border-t-[1.4px] border-black" /> */}
							<div className="text-[14px] font-semibold tracking-normal">
								BUNGO
								<br />
								ONO
							</div>
							{/* <div className="my-1 w-4 border-t-[1.4px] border-black" /> */}
							<div className="mt-3 text-[9px] font-bold uppercase leading-tight tracking-wider">
								{/* coming in
						<br /> */}
								Jan 2025
							</div>
						</div>
						<Image
							src="/image/homepage/emblem.svg"
							alt="Emblem"
							width={800}
							height={300}
							className="fixed -bottom-5 -right-4 z-30 w-[162px] "
							priority
						/>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default NFTEmblem;
