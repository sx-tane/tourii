import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "@/app/loading";
import HeaderBlack from "@/components/header/header-black/header-black";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "Profile",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-full min-h-screen overflow-hidden bg-charcoal ">
			<div className="mx-6">
				<HeaderBlack />
				<Suspense fallback={<Loading />}>{children} </Suspense>
			</div>
		</div>
	);
}
