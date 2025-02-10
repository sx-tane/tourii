import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "@/app/loading";
import Header from "@/components/header/header-component/header";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "Model Route",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<body className="h-full min-h-screen animate-fadeIn  bg-charcoal ">
			<div className="mx-6">
				<Header theme={"black"} />
				<Suspense fallback={<Loading />}>{children} </Suspense>
			</div>
		</body>
	);
}
