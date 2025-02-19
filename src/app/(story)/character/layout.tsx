import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "@/app/loading";
import Header from "@/components/header/header-component/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Character",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="item-center h-full animate-fadeIn overflow-hidden">
			<div className="mx-6">
				<Header theme={"white"} />
				<Suspense fallback={<Loading />}>{children}</Suspense>
			</div>
		</div>
	);
}
