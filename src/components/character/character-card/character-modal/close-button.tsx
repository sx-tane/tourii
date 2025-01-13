import { XMarkIcon } from "@heroicons/react/20/solid";
import type React from "react";

interface CloseButtonProps {
	onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
	return (
		<div className="bg-red flex items-start justify-end p-40">
			<XMarkIcon
				className="absolute font-normal top-0 mt-6 hidden h-16 w-16 border-2 hover:bg-mustard hover:text-warmGrey border-mustard cursor-pointer text-mustard md:right-6 md:flex hover:opacity-100 duration-500 transition-all"
				onClick={onClose}
			/>
		</div>
	);
};

export default CloseButton;
