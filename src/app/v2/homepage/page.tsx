"use client";
import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
	motion,
	useScroll,
	useTransform,
	AnimatePresence,
} from "framer-motion";
import TouriiAnimation from "@/components/homepage/tourii-logo-animation";
import HowTouriiWorks from "@/components/homepage/how-tourii-works";

const HomePage: NextPage = () => {
	const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
	const mainRef = useRef<HTMLDivElement>(null);

	const handleLogoAnimationComplete = () => {
		setLogoAnimationComplete(true);
	};

	const sections = [
		{
			title: "Explore",
			subtitle: "Discover Interactive Stories",
			description:
				"Transform destinations into engaging narratives, creating an interactive journey that seamlessly connects locations to user advancement.",
			image: "/image/explore-screen.jpg",
		},
		{
			title: "Earn",
			subtitle: "Collect Rewards",
			description:
				"Gain rewards for your travel check-ins, quests, and community challenges across regions.",
			image: "/image/earn-screen.jpg",
		},
		{
			title: "Connect",
			subtitle: "Meet Fellow Adventurers",
			description:
				"Follow travelers, share experiences, and explore curated storylines from others around the world.",
			image: "/image/connect-screen.jpg",
		},
	];

	const [currentImage, setCurrentImage] = useState(
		sections[0]?.image || "/image/default-image.jpg",
	);
	const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

	return (
		<div className="w-full flex flex-col" ref={mainRef}>
			{/* Background that spans entire page */}
			<div className=" inset-0 w-full h-full">
				<Image
					src="/image/homepage/tourii-background.png"
					alt="Tourii Background"
					fill
					className="object-cover object-bottom"
					priority
					quality={100}
				/>
			</div>

			{/* Content Container */}
			<div className="relative min-h-screen flex flex-col">
				{/* Hero Section */}
				<div className="h-screen relative flex items-end">
					<motion.div
						className="absolute bottom-5 left-5 md:bottom-5 z-10"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.8,
							ease: [0.6, 0.05, 0.01, 0.9],
						}}
					>
						<TouriiAnimation
							onAnimationComplete={handleLogoAnimationComplete}
						/>
					</motion.div>
				</div>

				{/* Content Sections */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					className="relative"
				>
					<div className="bg-warmGrey/80 backdrop-blur-sm">
						<HowTouriiWorks
							sections={sections}
							currentImage={currentImage}
							setCurrentImage={setCurrentImage}
							sectionRefs={sectionRefs}
						/>

						<motion.section
							className="bg-warmGrey/90 backdrop-blur-sm py-12 text-center min-h-screen"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{ duration: 0.6 }}
						>
							<div className="max-w-4xl mx-auto px-4">
								<motion.h2
									className="text-2xl font-semibold mb-4"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
								>
									Your Story Item is Stamped
								</motion.h2>
								<motion.p
									className="text-gray-600 max-w-md mx-auto mb-6"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.3 }}
								>
									Collect and display unique items from your travel experiences.
								</motion.p>
								<motion.img
									src="/image/stamp_card.png"
									alt="Stamped Item"
									className="mx-auto w-40"
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.6 }}
								/>
							</div>
						</motion.section>

						<motion.section
							className="bg-warmGrey/90 backdrop-blur-sm py-12 flex justify-center"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{ duration: 0.6 }}
						>
							<motion.div
								className="max-w-xl bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-6"
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.3 }}
							>
								<motion.img
									src="/image/story_preview.png"
									alt="Story"
									className="w-40 h-40 object-cover rounded"
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.3 }}
								/>
								<div>
									<motion.h3
										className="text-xl font-bold"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.2 }}
									>
										The Beast's Tale
									</motion.h3>
									<motion.p
										className="text-gray-600 mt-2"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.3 }}
									>
										Uncover mysteries behind the mountain spirits.
									</motion.p>
								</div>
							</motion.div>
						</motion.section>

						<motion.footer
							className="bg-black/90 backdrop-blur-sm text-white py-6 text-sm flex flex-col md:flex-row justify-between items-center px-6"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							<p>&copy; 2025 Tourii. All rights reserved.</p>
							<div className="flex gap-4 mt-4 md:mt-0">
								<motion.a
									href="/privacy"
									className="hover:underline"
									whileHover={{ scale: 1.1 }}
									transition={{ duration: 0.2 }}
								>
									Privacy
								</motion.a>
								<motion.a
									href="/terms"
									className="hover:underline"
									whileHover={{ scale: 1.1 }}
									transition={{ duration: 0.2 }}
								>
									Terms
								</motion.a>
								<motion.a
									href="/contact"
									className="hover:underline"
									whileHover={{ scale: 1.1 }}
									transition={{ duration: 0.2 }}
								>
									Contact
								</motion.a>
							</div>
						</motion.footer>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default HomePage;
