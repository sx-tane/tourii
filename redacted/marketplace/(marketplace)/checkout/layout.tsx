import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "@/app/loading";
import { CartProvider } from "@/components/context/CartContext";
import Header from "@/components/header/header-white/Header";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "Kinchaku",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="item-center h-full animate-fadeIn overflow-hidden">
			<div className="mx-6">
				<Header />
				<Suspense fallback={<Loading />}>{children}</Suspense>
			</div>
		</div>
	);
}
