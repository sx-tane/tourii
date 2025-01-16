"use client";
import { downToUpVariants } from "@/lib/animation/variants-settings";
import { motion } from "framer-motion";
import React from "react";

const Prologue = () => {
	return (
		<div>
			<motion.div
				key="image-content"
				initial="hidden"
				animate="visible"
				exit="hidden"
				variants={downToUpVariants}
				transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
				className="w-screen flex items-center justify-center"
			>
				<div className="w-full max-w-4xl aspect-video">
					<iframe
						src="https://www.youtube.com/embed/76yQ6bMiQB8?si=CWnpciqKEcXHxeyD"
						title="Tourii Prologue"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
						className="w-full h-full rounded-xl"
					/>
				</div>
			</motion.div>
		</div>
	);
};

export default Prologue;
