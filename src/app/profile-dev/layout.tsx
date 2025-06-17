import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "@/app/loading";
import Header from "@/components/header/header-component/header";
import type { Metadata } from "next";


export const metadata: Metadata = {
	title: "Profile",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-full min-h-screen overflow-hidden bg-charcoal ">
			<div className="mx-6">
				<Header theme={"black"} />
				<Suspense fallback={<Loading />}>{children} </Suspense>
			</div>
		</div>
	);
}
