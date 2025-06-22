"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { useState } from "react";
import AboutMenu from "./about-menu";

const AboutCoin: React.FC = () => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="relative h-14 w-14"
		>
			<AnimatePresence>
				{isHovered ? (
					<motion.div
						key="aboutMenu"
						initial={{ opacity: 0, rotateY: 90 }}
						animate={{ opacity: 1, rotateY: 0 }}
						exit={{ opacity: 0, rotateY: -90 }}
						transition={{ duration: 0.1, ease: [0, 0.71, 0.2, 1.01] }}
						className="absolute right-0 w-48"
					>
						<AboutMenu onClose={() => setIsHovered(false)} />
					</motion.div>
				) : (
					<motion.div
						key="coin"
						initial={{ opacity: 1, rotateY: 0 }}
						animate={{ opacity: 1, rotateY: 0 }}
						exit={{ opacity: 0, rotateY: 90 }}
						transition={{ duration: 0.1, ease: "easeInOut" }}
						className="absolute"
					>
						<Image
							src="/image/about/coin.svg"
							alt="Coin"
							width={100}
							height={100}
							priority
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default AboutCoin;
