"use client";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import type { TitleProps } from "@/types/world-type";
import { motion } from "framer-motion";
import type React from "react";

const Title: React.FC<TitleProps> = ({ smallTitle, title }) => {
	return (
		<div>
			<motion.div
				key="image-content"
				initial="hidden"
				animate="visible"
				exit="hidden"
				variants={downToUpVariants}
				transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
			>
				<div className="my-10 items-center pt-5 text-center text-warmGrey3 md:pt-10 ">
					<div className=" font-bold uppercase">
						<h3 className="mb-10 text-xs uppercase tracking-widest md:mb-20 md:text-base">
							{smallTitle}
						</h3>
						<h2 className="whitespace-break-spaces break-all text-3xl leading-snug tracking-wide sm:text-5xl md:mb-20 md:text-6xl md:tracking-widest">
							{title}
						</h2>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Title;
