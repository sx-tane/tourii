"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
	return (
		<section className="bg-charcoal py-20 px-6">
			<div className="max-w-4xl mx-auto text-center space-y-8">
				{/* Main Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="space-y-4"
				>
					<h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
						EXPLORE, EARN, AND CONNECT ON EVERY JOURNEY
					</h2>
					<p className="text-warmGrey3 text-xl md:text-2xl font-medium">
						JOIN THE ADVENTURE NOW
					</p>
				</motion.div>

				{/* CTA Button */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<Link href="/v2/launch-app">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="inline-flex items-center gap-3 bg-red hover:bg-red/90 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
						>
							SIGN UP NOW
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 7l5 5-5 5M6 12h12"
								/>
							</svg>
						</motion.button>
					</Link>
				</motion.div>

				{/* Decorative Element */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="flex justify-center pt-8"
				>
					<div className="w-24 h-0.5 bg-warmGrey3" />
				</motion.div>
			</div>
		</section>
	);
}