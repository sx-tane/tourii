import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "@/app/loading";
import HeaderBlack from "@/components/header/header-black/Header";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "Bonjin Bazaar",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<body className="h-full min-h-screen animate-fadeIn overflow-hidden bg-charcoal ">
			<div className="mx-6">
				<HeaderBlack />
				<Suspense fallback={<Loading />}>{children} </Suspense>
			</div>
		</body>
	);
}
