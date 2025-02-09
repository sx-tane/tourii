import {
	backdropVariants,
	modalVariants,
} from "@/lib/animation/variants-settings";
import type { CharacterProps } from "@/types/character-type";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import CharacterIntro from "./character-intro";
import CharacterIntroMobile from "./character-intro-mobile";
import CloseButton from "./close-button";
import CloseButtonMobile from "./close-button-mobile";

interface CharacterModalProps {
	isOpen: boolean;
	character: CharacterProps | null;
	onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
	isOpen,
	character,
	onClose,
}) => {
	if (!character) return null;

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
						className="fixed inset-0 w-full h-full bg-warmGrey xl:flex z-50 hidden"
						initial="hidden"
						animate="visible"
						exit="hidden"
						variants={modalVariants}
						transition={{ duration: 0.3 }}
					>
						{/* Left Section */}
						<CharacterIntro character={character} />
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
					>
						{/* Mobile Content */}
						<div className="flex flex-col justify-center w-10/12 h-full bg-warmGrey">
							<CharacterIntroMobile character={character} />{" "}
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
