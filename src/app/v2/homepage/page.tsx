"use client";
import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TouriiAnimation from "@/components/homepage/tourii-logo-animation";
import Line from "@/components/about/divider-line/line";
import HowTouriiWorks from "@/components/homepage/how-tourii-works";

const HomePage: NextPage = () => {
	const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
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
		<div className="w-full flex flex-col animate-fadeIn z-20">
			<section className="h-[100vh]">
				<div className="absolute inset-0 overflow-hidden">
					<Image
						src="/image/homepage/tourii-background.png"
						alt="Tourii Background"
						fill
						className="object-cover object-bottom min-h-full max-w-none"
						priority
					/>
				</div>
				<div className="absolute bottom-5 left-5 md:bottom-5 z-10">
					<TouriiAnimation onAnimationComplete={handleLogoAnimationComplete} />
				</div>
			</section>

			<HowTouriiWorks
				sections={sections}
				currentImage={currentImage}
				setCurrentImage={setCurrentImage}
				sectionRefs={sectionRefs}
			/>
			<section className="bg-[#FFF9F5] py-12 text-center h-[100vh]">
				<h2 className="text-2xl font-semibold mb-4">
					Your Story Item is Stamped
				</h2>
				<p className="text-gray-600 max-w-md mx-auto mb-6">
					Collect and display unique items from your travel experiences.
				</p>
				<img
					src="/image/stamp_card.png"
					alt="Stamped Item"
					className="mx-auto w-40"
				/>
			</section>
			<section className="bg-[#F0ECE7] py-12 flex justify-center">
				<div className="max-w-xl bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-6">
					<img
						src="/image/story_preview.png"
						alt="Story"
						className="w-40 h-40 object-cover rounded"
					/>
					<div>
						<h3 className="text-xl font-bold">The Beast's Tale</h3>
						<p className="text-gray-600 mt-2">
							Uncover mysteries behind the mountain spirits.
						</p>
					</div>
				</div>
			</section>
			<footer className="bg-black text-white py-6 text-sm flex flex-col md:flex-row justify-between items-center">
				<p>&copy; 2025 Tourii. All rights reserved.</p>
				<div className="flex gap-4 mt-4 md:mt-0">
					<a href="#" className="hover:underline">
						Privacy
					</a>
					<a href="#" className="hover:underline">
						Terms
					</a>
					<a href="#" className="hover:underline">
						Contact
					</a>
				</div>
			</footer>
		</div>
	);
};

export default HomePage;
