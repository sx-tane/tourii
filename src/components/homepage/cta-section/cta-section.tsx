"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui";

interface CTASectionProps {
	title?: string;
	subtitle?: string;
	buttonText?: string;
	buttonHref?: string;
}

export default function CTASection({
	title = "EXPLORE, EARN, AND CONNECT ON EVERY JOURNEY",
	subtitle = "JOIN THE ADVENTURE NOW",
	buttonText = "SIGN UP NOW",
	buttonHref = "/v2/launch-app"
}: CTASectionProps) {
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
						{title}
					</h2>
					<p className="text-warmGrey3 text-xl md:text-2xl font-medium">
						{subtitle}
					</p>
				</motion.div>

				{/* CTA Button */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<Link href={buttonHref}>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="inline-flex items-center gap-3 bg-red hover:bg-red/90 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
						>
							{buttonText}
							<ArrowRightIcon className="w-5 h-5" />
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