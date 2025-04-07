"use client";
import type React from "react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Line from "../about/divider-line/line";

interface HowTouriiWorksProps {
	sections: {
		title: string;
		subtitle: string;
		description: string;
		image: string;
	}[];
	currentImage: string;
	setCurrentImage: (image: string) => void;
	sectionRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

const HowTouriiWorks: React.FC<HowTouriiWorksProps> = ({
	sections,
	currentImage,
	setCurrentImage,
	sectionRefs,
}) => {
	// Ref to throttle auto-scroll events
	const isScrollingRef = useRef(false);
	// Keep track of the current section index
	const currentSectionIndexRef = useRef(0);

	// onWheel handler to jump to the next/previous section by id
	const handleWheel = (e: React.WheelEvent) => {
		if (isScrollingRef.current) return;
		e.preventDefault();

		let newIndex = currentSectionIndexRef.current;
		if (e.deltaY > 0) {
			newIndex = Math.min(newIndex + 1, sections.length - 1);
		} else if (e.deltaY < 0) {
			newIndex = Math.max(newIndex - 1, 0);
		}

		// Only scroll if the index has changed
		if (newIndex !== currentSectionIndexRef.current) {
			const target = document.getElementById(`section-${newIndex}`);
			if (target) {
				isScrollingRef.current = true;
				currentSectionIndexRef.current = newIndex;
				target.scrollIntoView({ behavior: "smooth" });
				// Throttle further scrolling for a brief period (adjust delay as needed)
				setTimeout(() => {
					isScrollingRef.current = false;
				}, 700);
			}
		}
	};

	// Update the phone image based on current left section scroll position
	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY + window.innerHeight / 2;
			for (let i = 0; i < sectionRefs.current.length; i++) {
				const ref = sectionRefs.current[i];
				if (ref) {
					const rect = ref.getBoundingClientRect();
					const top = rect.top + window.scrollY;
					const bottom = top + rect.height;
					if (scrollY >= top && scrollY < bottom) {
						setCurrentImage(sections[i]?.image ?? "/image/default-image.jpg");
						currentSectionIndexRef.current = i;
						break;
					}
				}
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [sections, setCurrentImage, sectionRefs]);

	return (
		<section className="relative mt-20">
			<div className="flex justify-center w-full">
				<Line />
			</div>
			{/* Common Sticky Container for Header and Main Content */}
			<div className="sticky top-0 z-20">
				{/* Header */}
				<div className="py-12 text-center text-red">
					<div className="font-bold uppercase">
						<h3 className="text-xl leading-normal tracking-widest md:text-base">
							How Tourii Works
						</h3>
						<h2 className="mt-2 text-black whitespace-break-spaces break-all text-4xl md:text-5xl tracking-widest">
							IN THREE SIMPLE WAYS
						</h2>
					</div>
				</div>
				{/* Main Content */}
				<div className="flex z-20">
					{/* Left Section */}
					<div className="w-full md:w-1/2" onWheel={handleWheel}>
						{sections.map((section, index) => (
							<motion.div
								id={`section-${index}`}
								key={section.title}
								className="h-[80vh] flex items-center justify-end overflow-hidden"
								ref={(el) => {
									if (!sectionRefs.current) sectionRefs.current = [];
									sectionRefs.current[index] = el;
								}}
								initial={{ opacity: 0 }}
								exit={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: false, amount: 0.5 }}
								transition={{ duration: 0.5, delay: index * 0.2 }}
							>
								<div className="max-w-lg px-4 md:px-8 text-left">
									<h2 className="text-3xl md:text-8xl font-bold snap-start text-black tracking-widest">
										{section.title}
									</h2>
									<h3 className="text-lg md:text-xl text-primary mt-2">
										{section.subtitle}
									</h3>
									<p className="mt-4 text-gray-600">{section.description}</p>
								</div>
							</motion.div>
						))}
					</div>

					{/* Right Section: Phone remains sticky */}
					<div className="hidden md:block md:w-1/2 min-h-screen">
						{/* Adding padding-top to ensure phone content starts below header */}
						<div className="pt-12 sticky top-0 h-[80vh] z-30 flex justify-center items-center">
							<div className="iphone-frame relative bg-black rounded-[3rem] overflow-hidden shadow-xl border-[14px] border-black w-[320px] h-[650px]">
								{/* iPhone UI elements */}
								<div className="absolute top-0 left-0 right-0 h-6 z-30 flex justify-center">
									<div className="w-40 h-7 bg-black rounded-b-2xl" />
								</div>
								<div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-800 rounded-full z-40" />
								<div className="absolute top-1.5 right-[45%] w-2.5 h-2.5 bg-gray-800 rounded-full z-40" />
								<div className="absolute -right-[14px] top-24 w-[2px] h-8 bg-gray-600 rounded-l-sm" />
								<div className="absolute -left-[14px] top-24s w-[2px] h-6 bg-gray-600 rounded-r-sm" />
								<div className="absolute -left-[14px] top-36 w-[2px] h-6 bg-gray-600 rounded-r-sm" />

								{/* Phone Screen Content */}
								<div className="relative w-full h-full bg-white rounded-[2.3rem] overflow-hidden">
									{sections.map((section, index) => (
										<motion.div
											key={`phone-${section.title}`}
											className="absolute inset-0"
											initial={{ opacity: 0 }}
											animate={{
												opacity: currentImage === section.image ? 1 : 0,
												backgroundColor:
													currentImage === section.image
														? index === 0
															? "#FFD8CC"
															: index === 1
																? "#CCFFDB"
																: "#CCE8FF"
														: "transparent",
											}}
											transition={{ duration: 0.5 }}
										>
											<div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
												<h3 className="text-2xl font-bold mb-4 text-gray-800">
													{section.title}
												</h3>
												<div className="w-16 h-16 rounded-full bg-white/50 mb-4 flex items-center justify-center">
													<span className="text-3xl">
														{index === 0 ? "🌍" : index === 1 ? "🏆" : "👥"}
													</span>
												</div>
												<p className="text-sm text-gray-700">
													{section.subtitle}
												</p>
											</div>
										</motion.div>
									))}
									{/* iPhone Home Indicator */}
									<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HowTouriiWorks;
