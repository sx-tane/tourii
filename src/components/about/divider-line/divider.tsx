"use client";
import { backdropVariants } from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const Divider: React.FC = () => {
	return (
		<div>
			<AnimatePresence>
				<motion.div
					key="image-content"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={backdropVariants}
					transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				>
					<div className="z-60 absolute left-0 w-full items-center justify-center">
						<Image
							src="/image/about/double-line.svg"
							alt="divider"
							width={10000}
							height={3000}
							className="h-3 object-cover"
							priority
						/>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default Divider;
