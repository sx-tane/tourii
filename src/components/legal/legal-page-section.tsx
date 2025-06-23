"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LegalPageSectionProps {
	title: string;
	children: ReactNode;
}

export default function LegalPageSection({ title, children }: LegalPageSectionProps) {
	return (
		<motion.section
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<motion.h3 
				className="text-2xl uppercase tracking-widest font-bold text-red mb-2 pb-4 border-b border-warmGrey3 relative"
				initial={{ opacity: 0, x: -20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
			>
				{title}
				<motion.div
					className="absolute bottom-0 left-0 h-0.5 bg-red"
					initial={{ width: 0 }}
					whileInView={{ width: "100%" }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
				/>
			</motion.h3>
			<motion.div 
				className="space-y-4 text-charcoal leading-relaxed mt-6"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
			>
				{children}
			</motion.div>
		</motion.section>
	);
}