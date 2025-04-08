"use client";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Line from "../about/divider-line/line";
import Iphone15 from "./iphone";

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
	// Timeout ref for debouncing
	const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	// State to track if user is manually scrolling
	const [isManualScrolling, setIsManualScrolling] = useState(false);
	// Add a debounce time for wheel events
	const wheelDebounceTimeRef = useRef<NodeJS.Timeout | null>(null);
	// Add a minimum delta threshold to prevent accidental scrolls
	const MIN_WHEEL_DELTA = 40; // Increased from 20 to 40
	// Add accumulator for wheel direction to require consistent scrolling
	const wheelAccumulatorRef = useRef(0);
	// Threshold for wheel accumulator
	const WHEEL_ACCUMULATOR_THRESHOLD = 60;
	// Add a longer cooldown specifically for the first section
	const firstSectionCooldownRef = useRef(false);

	const handleWheel = (e: React.WheelEvent) => {
		if (isScrollingRef.current) return;
		e.preventDefault();

		// Debounce small rapid wheel movements
		if (wheelDebounceTimeRef.current) {
			clearTimeout(wheelDebounceTimeRef.current);
		}

		// Only process wheel events that exceed the minimum threshold
		if (Math.abs(e.deltaY) < MIN_WHEEL_DELTA) {
			return;
		}

		// Apply a special cooldown to prevent accidental jumps from the first section
		if (
			currentSectionIndexRef.current === 0 &&
			firstSectionCooldownRef.current
		) {
			return;
		}

		// Accumulate wheel delta in the same direction
		if (
			Math.sign(e.deltaY) === Math.sign(wheelAccumulatorRef.current) ||
			wheelAccumulatorRef.current === 0
		) {
			wheelAccumulatorRef.current += e.deltaY;
		} else {
			// Reset if direction changed
			wheelAccumulatorRef.current = e.deltaY;
		}

		// Only proceed if accumulator passes threshold
		if (Math.abs(wheelAccumulatorRef.current) < WHEEL_ACCUMULATOR_THRESHOLD) {
			return;
		}

		wheelDebounceTimeRef.current = setTimeout(() => {
			// Reset accumulator
			const scrollDirection = Math.sign(wheelAccumulatorRef.current);
			wheelAccumulatorRef.current = 0;

			// Set manual scrolling flag
			setIsManualScrolling(true);

			// Clear any existing timeout
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}

			let newIndex = currentSectionIndexRef.current;
			if (scrollDirection > 0) {
				newIndex = Math.min(newIndex + 1, sections.length - 1);
			} else if (scrollDirection < 0) {
				newIndex = Math.max(newIndex - 1, 0);
			}

			// Only scroll if the index has changed
			if (newIndex !== currentSectionIndexRef.current) {
				isScrollingRef.current = true;
				currentSectionIndexRef.current = newIndex;

				// Apply special cooldown when leaving first section
				if (currentSectionIndexRef.current === 0) {
					firstSectionCooldownRef.current = true;
					setTimeout(() => {
						firstSectionCooldownRef.current = false;
					}, 1200); // Special cooldown for first section
				}

				const target = document.getElementById(`section-${newIndex}`);
				if (target) {
					target.scrollIntoView({ behavior: "smooth" });

					// Longer throttle period for smooth scrolling
					scrollTimeoutRef.current = setTimeout(() => {
						isScrollingRef.current = false;
						setIsManualScrolling(false);
					}, 1200); // Increased from 1000ms to 1200ms
				}
			} else {
				// Reset manual scrolling if no scroll happened
				setIsManualScrolling(false);
			}
		}, 50); // Small debounce for wheel events
	};

	// Touch handling for mobile devices
	useEffect(() => {
		const leftSection = document.querySelector(".w-full.md\\:w-1\\/2");
		if (!leftSection) return;

		let touchStartY = 0;
		const TOUCH_THRESHOLD = 100; // Increased from 70 to 100 for more intentional swipes
		let touchMoveCount = 0;
		const TOUCH_MOVE_REQUIRED = 3; // Require multiple touch move events in same direction

		const handleTouchStart = (e: TouchEvent) => {
			if (e.touches[0]) {
				touchStartY = e.touches[0].clientY;
				touchMoveCount = 0; // Reset touch move count on new touch start
			}
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (isScrollingRef.current) {
				e.preventDefault();
				return;
			}

			const touchY = e.touches[0]?.clientY;
			if (touchY === undefined) return;
			const diff = touchStartY - touchY;

			// Increased threshold to determine if user intended to scroll
			if (Math.abs(diff) > TOUCH_THRESHOLD) {
				touchMoveCount++; // Increment touch move count

				// Only proceed if touch move count passes required threshold
				if (touchMoveCount >= TOUCH_MOVE_REQUIRED) {
					let newIndex = currentSectionIndexRef.current;
					if (diff > 0) {
						// scrolling down
						newIndex = Math.min(newIndex + 1, sections.length - 1);
					} else {
						// scrolling up
						newIndex = Math.max(newIndex - 1, 0);
					}

					if (newIndex !== currentSectionIndexRef.current) {
						e.preventDefault();
						isScrollingRef.current = true;
						currentSectionIndexRef.current = newIndex;

						const target = document.getElementById(`section-${newIndex}`);
						if (target) {
							target.scrollIntoView({ behavior: "smooth" });
							setIsManualScrolling(true);

							scrollTimeoutRef.current = setTimeout(() => {
								isScrollingRef.current = false;
								setIsManualScrolling(false);
							}, 1000);
						}
					}

					touchStartY = touchY; // Reset for continuous movement
				}
			}
		};

		leftSection.addEventListener(
			"touchstart",
			handleTouchStart as EventListener,
		);
		leftSection.addEventListener("touchmove", handleTouchMove as EventListener);

		return () => {
			leftSection.removeEventListener(
				"touchstart",
				handleTouchStart as EventListener,
			);
			leftSection.removeEventListener(
				"touchmove",
				handleTouchMove as EventListener,
			);
		};
	}, [sections.length]);

	// Use Intersection Observer for more reliable section detection
	useEffect(() => {
		if (!sectionRefs.current) return;

		// Don't update during manual scrolling
		if (isManualScrolling) return;

		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.7, // Increased from 0.5 to 0.7 - element must be 70% visible to trigger
		};

		const observerCallback: IntersectionObserverCallback = (entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting && entry.target.id) {
					const idParts = entry.target.id.split("-");
					const index = idParts[1] ? Number.parseInt(idParts[1]) : Number.NaN;
					if (!Number.isNaN(index) && index >= 0 && index < sections.length) {
						currentSectionIndexRef.current = index;
						setCurrentImage(
							sections[index]?.image ?? "/image/default-image.jpg",
						);
					}
				}
			}
		};

		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions,
		);

		// Observe each section
		for (let i = 0; i < sectionRefs.current.length; i++) {
			const ref = sectionRefs.current[i];
			if (ref) {
				observer.observe(ref);
			}
		}

		return () => observer.disconnect();
	}, [sections, setCurrentImage, sectionRefs, isManualScrolling]);

	// Fallback to traditional scroll method (as backup)
	useEffect(() => {
		// Skip if using Intersection Observer or during manual scrolling
		if (typeof IntersectionObserver === "undefined" || isManualScrolling) {
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
		}

		return undefined;
	}, [sections, setCurrentImage, sectionRefs, isManualScrolling]);

	return (
		<section className="relative mt-20">
			<div className="flex justify-center w-full px-5">
				<div className="w-full max-w-screen-md">
					<Line />
				</div>
			</div>
			{/* Common Sticky Container for Header and Main Content */}
			<div className="z-20">
				{/* Header */}
				<div className="py-12 text-center text-red">
					<div className="font-bold uppercase">
						<h3 className="text-sm leading-normal tracking-widest md:text-base">
							How Tourii Works
						</h3>
						<h2 className="mt-2 text-black whitespace-break-spaces break-all text-xl md:text-5xl tracking-widest">
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
								<div className="w-8/12 text-left">
									<h2 className="text-3xl md:text-6xl font-bold uppercase text-black tracking-widest">
										{section.title}
									</h2>
									<h3 className="text-lg text-red tracking-widest font-bold uppercase my-5">
										{section.subtitle}
									</h3>
									<p className="text-black tracking-widest font-light text-pretty">
										{section.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>

					{/* Right Section: Phone remains sticky */}
					<div className="hidden md:block md:w-1/2 min-h-screen">
						<div className="sticky top-0 h-[80vh] z-30 flex justify-center items-center">
							<Iphone15>
								{/* Phone Screen Content */}
								<div className="relative w-full h-full bg-white overflow-hidden">
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
									<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full" />
								</div>
							</Iphone15>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HowTouriiWorks;
