"use client";

import Line from "@/components/about/divider-line/line";
import { SectionTitle } from "@/components/common/section-title";
import { motion } from "framer-motion";
import Link from "next/link";

interface CTASectionProps {
	title?: string;
	subtitle?: string;
	buttonText?: string;
	buttonHref?: string;
}

export default function CTASection({
	buttonText = "SIGN UP NOW",
	buttonHref = "/v2/launch-app",
}: CTASectionProps) {
	return (
		<div className="flex flex-col items-center w-11/12 mx-auto mt-20">
			<div className="flex justify-center w-full px-5">
				<div className="w-full max-w-screen-md">
					<Line />
				</div>
			</div>
			<div className="z-20">
				<SectionTitle
					subtitle={[
						"EXPLORE,",
						"EARN,",
						"AND",
						"CONNECT",
						"ON",
						"EVERY",
						"JOURNEY",
					]}
					title={["JOIN", "THE", "ADVENTURE", "NOW"]}
				/>

				{/* CTA Button */}
				<div className="text-center mt-8 mb-20">
					<Link href={buttonHref}>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="inline-flex items-center gap-3 bg-red hover:bg-red text-charcoal bg-transparent border border-charcoal font-medium py-4 px-8 rounded-full text-lg transition-colors duration-300 tracking-widest hover:text-warmGrey hover:shadow-xl hover:border-transparent"
						>
							{buttonText}
							{/* <ArrowRightIcon className="w-5 h-5" /> */}
						</motion.button>
					</Link>
				</div>
			</div>
		</div>
	);
}
