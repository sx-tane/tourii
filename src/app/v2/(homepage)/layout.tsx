import { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "@/app/loading";
import HeaderApp from "@/components/header/header-component/header-launch-app";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="">
			<HeaderApp />
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</div>
	);
}
