import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "@/app/loading";
import Header from "@/components/header/header-white/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "About",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div id="#top" className="mx-6 h-full animate-fadeIn ">
			<Header />
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</div>
	);
}
