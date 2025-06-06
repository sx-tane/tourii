import type React from "react";

interface ActionButtonProps {
	/** The text to display on the button */
	children: React.ReactNode;
	/** Additional className for custom styling */
	className?: string;
	/** Button click handler */
	onClick?: () => void;
	/** Type of button (default: button) */
	type?: "button" | "submit" | "reset";
	/** Whether the button is disabled */
	disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
	children,
	className = "",
	onClick,
	type = "button",
	disabled = false,
}) => {
	return (
		<button
			className={`cursor-pointer rounded-full border-[1.5px] px-8 py-3 text-sm md:px-16 md:py-3 font-medium md:font-semibold tracking-wider transition-all duration-300 hover:bg-warmGrey hover:text-charcoal ${className}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default ActionButton;
