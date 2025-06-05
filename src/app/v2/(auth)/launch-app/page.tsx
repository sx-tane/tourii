"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { logger } from "../../../../utils/logger";

// Mock account for development
const mockAccount = {
	id: "mock-user-id",
	name: "Test User",
	email: "test@example.com",
	image: null,
};

const LaunchAppPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [showCredentials, setShowCredentials] = useState(false);
	const [isRegistering, setIsRegistering] = useState(false);
	const callbackUrl = searchParams.get("callbackUrl") || "/v2/quests";

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
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				<div className="bg-white p-8 rounded-lg shadow-md">
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold text-gray-900">
							Welcome to Tourii
						</h2>
						{process.env.NODE_ENV === "development" ? (
							<p className="mt-2 text-sm text-gray-600">
								Development Mode: Click any button to continue as{" "}
								{mockAccount.name}
							</p>
						) : (
							<p className="mt-2 text-sm text-gray-600">
								{showCredentials
									? `${isRegistering ? "Create" : "Sign in to"} your account`
									: "Choose how you want to continue"}
							</p>
						)}
					</div>
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
									<div className="flex justify-between items-center">
										<button
											type="button"
											onClick={() => setShowCredentials(false)}
											className="text-sm text-gray-600 hover:text-gray-900"
										>
											Back to options
										</button>
										<button
											type="button"
											onClick={() => setIsRegistering(!isRegistering)}
											className="text-sm text-indigo-600 hover:text-indigo-800"
										>
											{isRegistering ? "Sign in instead" : "Create an account"}
										</button>
									</div>
								</div>
							</form>
						) : (
							<>
								<button
									type="button"
									onClick={handleWalletConnect}
									disabled={isLoading}
									className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isLoading ? (
										<span className="flex items-center justify-center gap-2">
											Connecting...
										</span>
									) : (
										"Connect Wallet"
									)}
								</button>
								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<div className="w-full border-t border-gray-300" />
									</div>
									<div className="relative flex justify-center text-sm">
										<span className="px-2 bg-white text-gray-500">
											Or continue with
										</span>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-3">
									<button
										type="button"
										onClick={() => handleSocialSignIn("google")}
										disabled={isLoading}
										className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
									>
										<svg
											className="w-5 h-5"
											viewBox="0 0 24 24"
											aria-labelledby="googleIconTitle"
										>
											<title id="googleIconTitle">Google</title>
											<path
												fill="currentColor"
												d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
											/>
											<path
												fill="currentColor"
												d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
											/>
											<path
												fill="currentColor"
												d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
											/>
											<path
												fill="currentColor"
												d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
											/>
										</svg>
										Google
									</button>
									<button
										type="button"
										onClick={() => handleSocialSignIn("discord")}
										disabled={isLoading}
										className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
									>
										Discord
									</button>
									<button
										type="button"
										onClick={() => handleSocialSignIn("twitter")}
										disabled={isLoading}
										className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
									>
										X (Twitter)
									</button>
									<button
										type="button"
										onClick={() => setShowCredentials(true)}
										disabled={isLoading}
										className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Email
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LaunchAppPage;
