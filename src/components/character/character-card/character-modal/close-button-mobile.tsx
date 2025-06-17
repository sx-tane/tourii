import { XMarkIcon } from "@heroicons/react/20/solid";

import type { CloseButtonProps } from "./close-button";

const CloseButtonMobile: React.FC<CloseButtonProps> = ({ onClose }) => {
	return (
		<div>
			<XMarkIcon
				className="fixed top-4 right-4 h-12 w-12 border-[1.5px] hover:bg-mustard hover:text-warmGrey border-mustard cursor-pointer text-mustard md:right-6 md:flex hover:opacity-100 duration-500 transition-all"
				onClick={onClose}
			/>
		</div>
	);
};

export default CloseButtonMobile;
