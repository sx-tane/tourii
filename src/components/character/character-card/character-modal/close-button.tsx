import { XMarkIcon } from "@heroicons/react/20/solid";


export interface CloseButtonProps {
	onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
	return (
		<div className="bg-red flex justify-end p-40">
			<XMarkIcon
				className="absolute font-normal top-0 mt-6 h-16 w-16 border-2 hover:bg-mustard hover:text-warmGrey border-mustard cursor-pointer text-mustard md:right-6 md:flex hover:opacity-100 duration-500 transition-all"
				onClick={onClose}
			/>
		</div>
	);
};

export default CloseButton;
