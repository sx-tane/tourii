"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type React from "react";

const Loading: React.FC = () => {
	return (
		<div className="flex h-screen items-center justify-center">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{
					opacity: [0, 1.0, 0],
				}}
				transition={{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			>
				<Image
					src="/image/tourii-loading.svg"
					alt="Loading"
					width={130}
					height={130}
				/>
			</motion.div>
		</div>
	);
};

export default Loading;
