import { modalVariants } from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/20/solid";
import LoginComponent from "./login-method";
import { emailLoginData } from "@/lib/data/header-data";
import { walletLoginData } from "@/lib/data/header-data";
import type { LoginComponents } from "@/types/header-type";

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
						className="absolute inset-0 w-full h-full z-50 rounded-xl justify-center"
						initial="hidden"
						animate="visible"
						exit="hidden"
						variants={modalVariants}
						transition={{ duration: 0.3 }}
						// onClick={onClose}
					>
						<div className="absolute flex flex-row items-center justify-center inset-0 mx-auto">
							<img
								src="/image/about/about-image.png"
								alt="main art"
								className="absolute h-full w-full bg-cover"
							/>

							<div className="relative mx-8 my-8 w-[80%] h-[90%] flex flex-col items-center justify-center bg-warmGrey rounded-xl z-20">
								<XMarkIcon
									className="absolute top-0 right-0 h-10 w-10 hover:text-red cursor-pointer text-mustard hover:opacity-100 duration-500 transition-all z-30"
									onClick={onClose}
								/>
								<div className="absolute top-5 text-2xl text-red font-bold tracking-widest">
									Connect
								</div>
								{walletLoginData.map((log) => {
									return (
										<div
											key={log.loginlabel}
											className="relative w-full flex items-center justify-center my-6"
										>
											<LoginComponent
												loginlabel={log.loginlabel}
												image={log.image}
											/>
										</div>
									);
								})}

								<div className="relative w-full py-10 flex flex-col items-center justify-center">
									<div className="absolute w-full h-0.5 bg-red" />
									<div className="absolute flex flex-col items-center justify-center h-5 w-24 text-red font-bold text-xl tracking-wider bg-warmGrey z-20">
										OR
									</div>
								</div>
								{emailLoginData.map((log) => {
									return (
										<div
											key={log.loginlabel}
											className="w-full flex items-center justify-center my-6"
										>
											<LoginComponent
												loginlabel={log.loginlabel}
												image={log.image}
											/>
										</div>
									);
								})}
								<div className="inline-block relative pt-10 font-semibold text-red text-xl">
									NEW TO TOURII?
									<button
										type="button"
										className="pl-2 underline font-bold  text-red text-xl"
									>
										SignUp
									</button>
								</div>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default LoginModal;
