import { modalVariants } from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				// biome-ignore lint/complexity/noUselessFragments: <explanation>
				<>
					<motion.div
						className="fixed inset-0 w-full h-full z-50 rounded-xl justify-center"
						initial="hidden"
						animate="visible"
						exit="hidden"
						variants={modalVariants}
						transition={{ duration: 0.3 }}
						onClick={onClose}
					>
						<div className="absolute -left-[6em] -right-[5em] flex flex-row items-center justify-center inset-0">
							<Image
								src="/image/about/about-image.png"
								alt="main art"
								width={2000}
								height={1500}
								className="absolute bg-cover rounded-xl"
							/>
							<div className="mx-8 my-8 w-[80%] h-[52em] flex flex-col items-center bg-warmGrey rounded-xl z-50">
								Connect
							</div>
							<XMarkIcon
								className="relative font-normal flex h-10 w-10 hover:text-red cursor-pointer text-mustard md:right-6 md:flex hover:opacity-100 duration-500 transition-all"
								onClick={onClose}
							/>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default LoginModal;
