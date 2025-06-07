"use client";

import Loading from "@/app/loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { logger } from "../../../../utils/logger";

export default function CompleteProfilePage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { data: session } = useSession();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		email: searchParams.get("email") || "",
		username: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const socialProvider = session?.user?.provider;
			const socialId = session?.user?.providerAccountId || session?.user?.id;

			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: formData.email,
					username: formData.username,
					socialProvider,
					socialId,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to complete signup");
			}

			router.push("/v2/quests");
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			setError(errorMessage);
			logger.error("Failed to complete signup:", errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-white p-8 rounded-lg shadow-md">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-900">
					Complete Your Profile
				</h2>
				<p className="mt-2 text-sm text-gray-600">
					Please provide the following information to complete your registration
				</p>
			</div>

			{error && (
				<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
					<p className="text-sm text-red-600">{error}</p>
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						value={formData.email}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, email: e.target.value }))
						}
						disabled={isLoading || !!searchParams.get("email")}
					/>
				</div>
				<div>
					<label
						htmlFor="username"
						className="block text-sm font-medium text-gray-700"
					>
						Username
					</label>
					<input
						id="username"
						name="username"
						type="text"
						required
						className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						value={formData.username}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, username: e.target.value }))
						}
						disabled={isLoading}
					/>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isLoading ? (
						<span className="flex items-center justify-center gap-2">
							<Loading />
							Saving...
						</span>
					) : (
						"Complete Registration"
					)}
				</button>
			</form>
		</div>
	);
}
