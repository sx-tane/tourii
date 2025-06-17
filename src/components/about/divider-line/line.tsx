"use client";
import { backdropVariants } from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";


const Line: React.FC = () => {
	return (
		<div className="my-8 w-full md:my-10">
			<AnimatePresence>
				<motion.div
					key="image-content"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={backdropVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					<Image
						className="object-contain"
						src="/image/about/line.svg"
						alt="line"
						width={800}
						height={1000}
						priority
					/>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default Line;
