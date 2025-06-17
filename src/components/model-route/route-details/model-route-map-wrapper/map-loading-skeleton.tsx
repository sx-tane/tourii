"use client";
import { motion } from "framer-motion";

const MapLoadingSkeleton: React.FC = () => {
	return (
		<motion.div
			className="h-full w-full bg-warmGrey flex items-center justify-center rounded-lg"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<motion.div
				className="text-center"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}
			>
				<motion.div
					className="text-4xl mb-4"
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					transition={{
						duration: 0.5,
						delay: 0.2,
						ease: [0.6, 0.05, 0.01, 0.9],
					}}
				>
					🗺️
				</motion.div>
				<motion.div
					className="text-gray-600 text-sm font-medium"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4, delay: 0.3 }}
				>
					Loading interactive map...
				</motion.div>
				<motion.div
					className="mt-2 flex justify-center gap-1"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4, delay: 0.5 }}
				>
					{[0, 1, 2].map((i) => (
						<motion.div
							key={i}
							className="w-2 h-2 bg-gray-400 rounded-full"
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.5, 1, 0.5],
							}}
							transition={{
								duration: 0.8,
								delay: i * 0.2,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
					))}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default MapLoadingSkeleton;
