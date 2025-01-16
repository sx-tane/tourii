"use client";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type React from "react";

const AboutImage: React.FC = () => {
	return (
		<AnimatePresence>
			<motion.div
				key="image-content"
				initial="hidden"
				animate="visible"
				exit="hidden"
				variants={downToUpVariants}
				transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
			>
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
				</div>{" "}
			</motion.div>
		</AnimatePresence>
	);
};

export default AboutImage;
