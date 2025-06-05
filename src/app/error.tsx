"use client";

import Header from "@/components/header/header-component/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type React from "react";

// Define props for the error component
interface TouriiErrorProps {
	errorMessage?: string;
	status?: number;
	onRetry?: () => void;
	isEmpty?: boolean; // To handle the "no stories" case slightly differently
}

const TouriiError: React.FC<TouriiErrorProps> = ({
	errorMessage = "An unexpected error occurred.", // Default message
	status,
	onRetry,
	isEmpty = false,
}) => {
	// Determine the title based on status or if it's an empty state
	const title = isEmpty ? "No Content" : status ? `${status} ERROR` : "Error";
	// Use a different image or style for empty state?
	const imageSrc = isEmpty
		? "/image/other/mirror.png"
		: "/image/other/mirror.png"; // Example: use different image
	const imageAlt = isEmpty ? "Empty" : "Error Mirror";

	return (
		<div className="max-h-screen animate-fadeIn overflow-hidden px-6">
			<div
				className="mx-4 flex flex-col items-center justify-center text-center xl:mx-96"
				style={{ height: "calc(100vh - 77px)" }}
			>
				<Image
					src={imageSrc}
					width={600}
					height={600}
					alt={imageAlt}
					className={`h-32 w-32 ${!isEmpty ? "animate-spin" : ""} md:h-48 md:w-48 xl:h-60 xl:w-60`}
					priority={true}
				/>
				<h1 className="py-5 text-4xl font-extrabold tracking-widest text-red md:text-6xl">
					{title}
				</h1>
				<h2 className="text-center text-base font-bold uppercase tracking-wider text-warmGrey md:text-lg">
					{errorMessage}
				</h2>
				{onRetry && (
					<Button
						onClick={onRetry}
						variant="destructive"
						className="mt-6 bg-red uppercase tracking-widest text-warmGrey font-bold"
					>
						Retry
					</Button>
				)}
			</div>
		</div>
	);
};

export default TouriiError;

export function ErrorComponent() {
	return (
		<div className="animate-fadeIn overflow-hidden px-6 lg:h-[90vh]">
			<div
				className="mx-4 flex flex-col items-center justify-center text-center xl:mx-96"
				style={{ height: "calc(100vh - 77px)" }}
			>
				<Image
					src={"/image/other/mirror.png"}
					width={600}
					height={600}
					alt={"404"}
					className="h-32 w-32 animate-spin md:h-48 md:w-48 xl:h-60 xl:w-60"
					priority
				/>
				<h1 className="py-5 text-4xl font-extrabold tracking-widest text-warmGrey md:text-6xl">
					404 ERROR
				</h1>
				<h2
					className="warmGrey text-center text-base font-bold uppercase tracking-wider
text-warmGrey md:text-lg"
				>
					Ninigi's mirror appears to have been left behind in this place.
				</h2>
			</div>
		</div>
	);
}
