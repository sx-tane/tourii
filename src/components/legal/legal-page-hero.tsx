"use client";

import { motion } from "framer-motion";

interface LegalPageHeroProps {
	title: string;
	lastUpdated: string;
}

export default function LegalPageHero({ title, lastUpdated }: LegalPageHeroProps) {
	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
			<motion.div 
				className="bg-red rounded-2xl p-8 sm:p-12 border border-warmGrey2 h-72 relative overflow-hidden"
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			>
				{/* Background decorative elements */}
				<motion.div
					className="absolute top-4 right-4 w-32 h-32 border border-warmGrey/20 rounded-full"
					initial={{ opacity: 0, rotate: 0 }}
					animate={{ opacity: 1, rotate: 360 }}
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
				/>
				<motion.div
					className="absolute top-8 right-8 w-16 h-16 border border-warmGrey/10 rounded-full"
					initial={{ opacity: 0, rotate: 0 }}
					animate={{ opacity: 1, rotate: -360 }}
					transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
				/>

				<motion.div 
					className="absolute bottom-8 left-8 right-8 flex items-end justify-between"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
				>
					<div>
						<motion.h1 
							className="text-3xl sm:text-4xl lg:text-6xl font-bold text-warmGrey tracking-widest uppercase mb-4 overflow-hidden"
							initial={{ opacity: 1 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
						>
							<motion.span
								className="inline-block"
								initial={{ x: "-100%" }}
								animate={{ x: 0 }}
								transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
							>
								{title}
							</motion.span>
						</motion.h1>
						<motion.div 
							className="w-full h-px bg-warmGrey mb-4"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
							style={{ originX: 0 }}
						/>
						<motion.p 
							className="text-warmGrey/80 text-sm font-medium tracking-widest uppercase"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
						>
							Created at {lastUpdated}
						</motion.p>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
}