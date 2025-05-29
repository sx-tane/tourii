import type { CharacterProps } from "@/app/v2/(stories)/types";
import {
	backdropVariants,
	modalVariants,
} from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";
import CharacterIntro from "./character-intro";
import CharacterIntroMobile from "./character-intro-mobile";
import CloseButton from "./close-button";
import CloseButtonMobile from "./close-button-mobile";

interface CharacterModalProps {
	isOpen: boolean;
	character: CharacterProps | null;
	onClose: () => void;
	characters: CharacterProps[];
}

const CharacterModal: React.FC<CharacterModalProps> = ({
	isOpen,
	character,
	onClose,
	characters,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (character) {
			const index = characters.findIndex((char) => char.id === character.id);
			setCurrentIndex(index);
		}
	}, [character, characters]);

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % characters.length);
	};

	const handlePrevious = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + characters.length) % characters.length,
		);
	};

	const handleSwipe = (direction: "left" | "right") => {
		if (direction === "left") {
			handleNext();
		} else {
			handlePrevious();
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				handlePrevious();
			} else if (e.key === "ArrowRight") {
				handleNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [characters]);

	if (!character || characters.length === 0) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						className="fixed inset-0 bg-black bg-opacity-50 z-40"
						initial="hidden"
						animate="visible"
						exit="hidden"
						variants={backdropVariants}
						transition={{ duration: 0.3 }}
						onClick={onClose}
					/>

					{/* Desktop and Laptop Modal */}
					<motion.div
						className="fixed inset-0 w-full h-full pl-5 bg-warmGrey xl:flex z-50 hidden"
						initial="hidden"
						animate="visible"
						exit="hidden"
						variants={modalVariants}
						transition={{ duration: 0.3 }}
					>
						{/* Left Section */}
						{characters[currentIndex] && (
							<CharacterIntro
								character={characters[currentIndex]}
								onNext={handleNext}
								onPrevious={handlePrevious}
							/>
						)}
						{/* Right Section */}
						<CloseButton onClose={onClose} />
					</motion.div>

					{/* Tablet and Mobile Modal */}
					<motion.div
						className="fixed inset-0 w-full bg-warmGrey xl:hidden flex z-50"
						initial="hidden"
						animate="visible"
						exit="hidden"
						variants={modalVariants}
						transition={{ duration: 0.3 }}
						onTouchStart={(e) => {
							if (e.changedTouches && e.changedTouches.length > 0) {
								const touchStartX = e.changedTouches?.[0]?.screenX;
								const handleTouchEnd = (e: TouchEvent) => {
									if (e.changedTouches && e.changedTouches.length > 0) {
										const touchEndX = e.changedTouches?.[0]?.screenX;
										if (touchStartX === undefined || touchEndX === undefined)
											return;
										if (touchStartX - touchEndX > 50) {
											handleSwipe("left");
										} else if (touchEndX - touchStartX > 50) {
											handleSwipe("right");
										}
									}
									document.removeEventListener("touchend", handleTouchEnd);
								};
								document.addEventListener("touchend", handleTouchEnd);
							}
						}}
					>
						{/* Mobile Content */}
						<div className="flex flex-col justify-center w-10/12 h-full bg-warmGrey">
							{characters[currentIndex] && (
								<CharacterIntroMobile
									character={characters[currentIndex]}
									onNext={handleNext}
									onPrevious={handlePrevious}
								/>
							)}
						</div>
						{/* Close Button */}
						<div className="flex flex-col w-3/12 md:w-2/12 h-full bg-red z-60">
							<CloseButtonMobile onClose={onClose} />
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default CharacterModal;
