"use client";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import HowTouriiWorks from "@/components/homepage/how-tourii-works";
import { DigitalPassportSection } from "@/components/homepage/passport/digital-passport-section";
import { StampedItemSection } from "@/components/homepage/stamped-item-section";
import { HighlightsSection, CTASection, Footer } from "@/components/homepage";
import TouriiAnimation from "@/components/homepage/tourii-logo-animation";
import { defaultImage, homepageSections } from "@/lib/data/homepage";
import {
	setCurrentImage,
	setLogoAnimationComplete,
	setSections,
} from "@/lib/redux/features/homepage/homepage-slice";
import type { RootState } from "@/lib/redux/store";

const HomePage: NextPage = () => {
	const dispatch = useDispatch();
	const { currentImage, sections } = useSelector(
		(state: RootState) => state.homepage,
	);
	const mainRef = useRef<HTMLDivElement>(null);
	const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		dispatch(setSections(homepageSections));
		dispatch(setCurrentImage(homepageSections[0]?.image || defaultImage));
	}, [dispatch]);

	const handleLogoAnimationComplete = () => {
		dispatch(setLogoAnimationComplete(true));
	};

	return (
		<div className="w-full flex flex-col" ref={mainRef}>
			{/* Background that spans entire page */}
			<div className="inset-0 w-full h-full">
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
			<div className="relative min-h-screen flex flex-col w-full mx-auto">
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
					className="relative w-full mx-auto"
				>
					<HighlightsSection />
					<HowTouriiWorks
						sections={sections}
						currentImage={currentImage}
						setCurrentImage={(image: string) =>
							dispatch(setCurrentImage(image))
						}
						sectionRefs={sectionRefs}
					/>
					<DigitalPassportSection />
					<StampedItemSection />
					<CTASection />

					<Footer />
				</motion.div>
			</div>
		</div>
	);
};

export default HomePage;
