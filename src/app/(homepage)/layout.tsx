import { Suspense } from "react";
import "@/styles/globals.css";
import Header from "@/components/header/header-white/Header";
import Loading from "../loading";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-6 animate-fadeIn">
			<Header />
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</div>
	);
}
