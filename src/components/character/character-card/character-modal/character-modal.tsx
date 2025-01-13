import type React from "react";
import type { CharacterProps } from "@/types/character-type";
import CloseButton from "./close-button";
import CharacterIntro from "./character-intro";
import { motion, AnimatePresence } from "framer-motion";

interface CharacterModalProps {
	isOpen: boolean;
	character: CharacterProps | null;
	onClose: () => void;
}

const modalVariants = {
	hidden: { opacity: 0, scale: 0.9 }, // Initial state
	visible: { opacity: 1, scale: 1 }, // Final state
	exit: { opacity: 0, scale: 0.9 }, // Exit state
};

const backdropVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

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
					{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
					<motion.div
						className="fixed inset-0 bg-black bg-opacity-50 z-40"
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={backdropVariants}
						transition={{ duration: 0.3 }}
						onClick={onClose}
					></motion.div>

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
