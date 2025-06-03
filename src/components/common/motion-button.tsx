import { motion } from "framer-motion";
import type React from "react";
import { useState } from "react";

interface MotionButtonProps {
	/** The icon to display when not hovered (default: ➞) */
	icon?: React.ReactNode;
	/** The text to display when hovered */
	hoverText: string;
	/** Additional className for the button */
	className?: string;
	/** Button click handler */
	onClick?: () => void;
	/** Type of button (default: button) */
	type?: "button" | "submit" | "reset";
	/** Whether the button is disabled */
	disabled?: boolean;
	/** Custom colors for different states */
	colors?: {
		/** Border color when not hovered (default: warmGrey) */
		borderColor?: string;
		/** Background color when hovered (default: #ECECDC) */
		hoverBgColor?: string;
		/** Text color when not hovered (default: #ECECDC) */
		defaultTextColor?: string;
		/** Text color when hovered (default: #21211B) */
		hoverTextColor?: string;
	};
	/** Animation durations */
	durations?: {
		/** Button expansion duration (default: 0.3) */
		expansion?: number;
		/** Text transition duration (default: 0.2) */
		textTransition?: number;
	};
	/** Button size settings */
	size?: {
		/** Collapsed width (default: 52px) */
		collapsedWidth?: string;
		/** Expanded width (default: 200px) */
		expandedWidth?: string;
		/** Button height (default: h-12) */
		height?: string;
		/** Text size (default: text-lg) */
		textSize?: string;
		/** Icon size (default: text-xl) */
		iconSize?: string;
	};
}

const MotionButton: React.FC<MotionButtonProps> = ({
	icon = "➞",
	hoverText,
	className = "",
	onClick,
	type = "button",
	disabled = false,
	colors = {},
	durations = {},
	size = {},
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const {
		borderColor = "border-warmGrey",
		hoverBgColor = "#ECECDC",
		defaultTextColor = "#ECECDC",
		hoverTextColor = "#21211B",
	} = colors;

	const { expansion = 0.3, textTransition = 0.2 } = durations;

	const {
		collapsedWidth = "52px",
		expandedWidth = "200px",
		height = "h-12",
		textSize = "text-lg",
		iconSize = "text-xl",
	} = size;

	return (
		<motion.button
			className={`border-[1px] ${borderColor} rounded-full font-medium overflow-hidden whitespace-nowrap ${textSize} ${className}`}
			initial={{
				width: collapsedWidth,
				paddingLeft: "0",
				paddingRight: "0",
				backgroundColor: "transparent",
			}}
			animate={{
				width: isHovered ? expandedWidth : collapsedWidth,
				paddingLeft: isHovered ? "20px" : "0",
				paddingRight: isHovered ? "20px" : "0",
				backgroundColor: isHovered ? hoverBgColor : "transparent",
			}}
			transition={{ duration: expansion, ease: "easeInOut" }}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			<div className={`${height} flex items-center justify-center relative`}>
				<motion.span
					className={`absolute ${iconSize}`}
					animate={{
						opacity: isHovered ? 0 : 1,
						scale: isHovered ? 0.5 : 1,
						color: isHovered ? hoverTextColor : defaultTextColor,
					}}
					transition={{ duration: textTransition }}
				>
					{icon}
				</motion.span>
				<motion.span
					className="absolute font-light tracking-widest italic"
					animate={{
						opacity: isHovered ? 1 : 0,
						scale: isHovered ? 1 : 0.5,
						color: isHovered ? hoverTextColor : defaultTextColor,
					}}
					transition={{ duration: textTransition }}
				>
					{hoverText}
				</motion.span>
			</div>
		</motion.button>
	);
};

export default MotionButton;
