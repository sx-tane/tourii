export const upToDownVariants = {
	hidden: { opacity: 0, y: -50 },
	visible: { opacity: 1, y: 0 },
};

export const downToUpVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0 },
};

export const downToUpVariantsMobile = {
	hidden: { opacity: 0, y: 0 },
	visible: { opacity: 1, y: 0 },
};

export const modalVariants = {
	hidden: { opacity: 0, scale: 0.9 }, // Initial state
	visible: { opacity: 1, scale: 1 }, // Final state
	exit: { opacity: 0, scale: 0.9 }, // Exit state
};

export const backdropVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};
