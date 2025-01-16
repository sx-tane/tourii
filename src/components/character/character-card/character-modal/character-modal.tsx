import {
	backdropVariants,
	modalVariants,
} from "@/lib/animation/variants-settings";
import type { CharacterProps } from "@/types/character-type";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import CharacterIntro from "./character-intro";
import CloseButton from "./close-button";

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
						exit="exit"
						variants={backdropVariants}
						transition={{ duration: 0.3 }}
						onClick={onClose}
					/>

					{/* Modal Content */}
					<motion.div
						className="bg-warmGrey w-full h-screen fixed inset-0 flex z-50"
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={modalVariants}
						transition={{ duration: 0.3 }}
					>
						{/* Left Section */}
						<CharacterIntro character={character} />
						{/* Right Section */}
						<CloseButton onClose={onClose} />
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default CharacterModal;
