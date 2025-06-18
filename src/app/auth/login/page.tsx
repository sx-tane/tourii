"use client";

import { modalVariants } from "@/lib/animation/variants-settings";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/20/solid";
import LoginComponent from "../../../components/login/login-method";
import {
	emailLoginData,
	walletLoginData,
	socialLoginData,
} from "@/lib/data/login/login-data";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { logger } from "@/utils/logger";

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const mockAccount = {
	id: "mock-user-id",
	name: "Test User",
	email: "test@example.com",
	image: null,
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [showCredentials, setShowCredentials] = useState(false);
	const [isRegistering, setIsRegistering] = useState(false);
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	const handleCredentialsAuth = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		try {
			if (isRegistering) {
				// Handle registration
				const response = await fetch("/api/auth/register", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password, username }),
				});

				if (!response.ok) {
					throw new Error("Registration failed");
				}
			}

			// Sign in after registration or for normal login
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
				callbackUrl,
			});

			if (result?.error) {
				setError(
					isRegistering ? "Registration failed" : "Invalid email or password",
				);
				logger.error("Credentials auth error:", result.error);
			} else if (result?.url) {
				router.push(result.url);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			setError("An unexpected error occurred. Please try again.");
			logger.error("Failed to authenticate:", errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSocialSignIn = async (
		provider: "google" | "discord" | "twitter",
	) => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await signIn(provider, {
				callbackUrl: "/v2/auth/complete-profile",
				redirect: false,
			});

			if (result?.error) {
				setError(`Failed to sign in with ${provider}. Please try again.`);
				logger.error(`${provider} sign in error:`, result.error);
			} else if (result?.url) {
				router.push(result.url);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			setError("An unexpected error occurred. Please try again.");
			logger.error(`Failed to sign in with ${provider}:`, errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const handleWalletConnect = async () => {
		setIsLoading(true);
		setError(null);
		try {
			// TODO: Implement wallet connection logic
			logger.info("Wallet connection clicked");
			router.push("/v2/auth/complete-profile");
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			setError("Failed to connect wallet. Please try again.");
			logger.error("Failed to connect wallet:", errorMessage);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<AnimatePresence>
			{isOpen && (
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
							<div className="relative top-0 text-2xl text-red font-bold tracking-widest">
								Connect With
							</div>
							{/* {process.env.NODE_ENV === "development" ? (
								<p className="text-sm text-gray-600 py-10">
									Development Mode: Click any button to continue as{" "}
								</p>
							) : ( */}
							<p className="mt-2 text-sm text-gray-600">
								{showCredentials
									? `${isRegistering ? "Create" : "Sign in to"} your account`
									: "Choose how you want to continue"}
							</p>
							{/* )} */}
							{error && (
								<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
									<p className="text-sm text-red-600">{error}</p>
								</div>
							)}
							<div className="space-y-4">
								{showCredentials ? (
									<form onSubmit={handleCredentialsAuth} className="space-y-4">
										<div>
											<label htmlFor="email" className="sr-only">
												Email address
											</label>
											<input
												id="email"
												name="email"
												type="email"
												required
												className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												placeholder="Email address"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												disabled={isLoading}
											/>
										</div>
										{isRegistering && (
											<div>
												<label htmlFor="username" className="sr-only">
													Username
												</label>
												<input
													id="username"
													name="username"
													type="text"
													required
													className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													placeholder="Username"
													value={username}
													onChange={(e) => setUsername(e.target.value)}
													disabled={isLoading}
												/>
											</div>
										)}
										<div>
											<label htmlFor="password" className="sr-only">
												Password
											</label>
											<input
												id="password"
												name="password"
												type="password"
												required
												className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												placeholder="Password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												disabled={isLoading}
											/>
										</div>
										<div className="flex flex-col space-y-3">
											<button
												type="submit"
												disabled={isLoading}
												className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{isLoading ? (
													<span className="flex items-center justify-center gap-2">
														{isRegistering
															? "Creating account..."
															: "Signing in..."}
													</span>
												) : isRegistering ? (
													"Create Account"
												) : (
													"Sign In"
												)}
											</button>
											<div className="flex justify-between items-center text-lg py-10">
												<button
													type="button"
													onClick={() => setShowCredentials(false)}
													className="text-red hover:text-gray-900 font-semibold mr-10"
												>
													Back To Options
												</button>
												<div className="relative flex font-semibold text-red ml-10">
													New To Tourii?
													<button
														type="button"
														className="pl-2 underline font-bold text-red text-xl  hover:text-gray-900"
														onClick={() => setIsRegistering(!isRegistering)}
													>
														{isRegistering
															? "Sign in instead"
															: "Create an account"}
													</button>
												</div>
											</div>
										</div>
									</form>
								) : (
									<>
										{walletLoginData.map((log) => {
											return (
												<div
													key={log.loginlabel}
													className="relative w-full flex items-center justify-center my-5"
												>
													<LoginComponent
														loginlabel={log.loginlabel}
														image={log.image}
													/>
												</div>
											);
										})}

										<div className="relative w-full py-5 flex flex-col items-center justify-center">
											<div className="absolute w-full h-0.5 bg-red" />
											<div className="absolute flex flex-col items-center justify-center h-5 w-24 text-red font-bold text-xl tracking-wider bg-warmGrey z-20">
												OR
											</div>
										</div>
										<div className="w-full flex items-center justify-center my-6">
											<LoginComponent
												loginlabel={`${emailLoginData[0]?.loginlabel}`}
												image={`${emailLoginData[0]?.image}`}
												onClick={() => setShowCredentials(true)}
											/>
										</div>
										<div className="w-full flex items-center justify-center my-6">
											<LoginComponent
												loginlabel={`${socialLoginData[0]?.loginlabel}`}
												image={`${socialLoginData[0]?.image}`}
												onClick={() => handleSocialSignIn("google")}
											/>
										</div>
										<div className="w-full flex items-center justify-center my-6">
											<LoginComponent
												loginlabel={`${socialLoginData[1]?.loginlabel}`}
												image={`${socialLoginData[1]?.image}`}
												onClick={() => handleSocialSignIn("discord")}
											/>
										</div>
										<div className="w-full flex items-center justify-center my-6">
											<LoginComponent
												loginlabel={`${socialLoginData[2]?.loginlabel}`}
												image={`${socialLoginData[2]?.image}`}
												onClick={() => handleSocialSignIn("twitter")}
											/>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default LoginModal;
